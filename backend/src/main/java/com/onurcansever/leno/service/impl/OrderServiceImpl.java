package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.*;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.*;
import com.onurcansever.leno.repository.*;
import com.onurcansever.leno.service.OrderService;
import com.onurcansever.leno.utility.OrderStatus;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final AddressRepository addressRepository;
    private final ShipperRepository shipperRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CustomerRepository customerRepository, AddressRepository addressRepository, ShipperRepository shipperRepository, ModelMapper modelMapper) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.addressRepository = addressRepository;
        this.shipperRepository = shipperRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<OrderDetailDto> getOrdersByCustomerId(Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: ", "customerId", customerId));

        List<Order> orders = this.orderRepository.findByCustomer(customer);
        List<OrderDetailDto> orderList = new ArrayList<>();

        orders.forEach((order) -> {
            OrderDetailDto orderDetailDto = new OrderDetailDto();

            orderDetailDto.setOrderId(order.getOrderId());
            orderDetailDto.setCustomer(this.modelMapper.map(order.getCustomer(), CustomerDto.class));
            orderDetailDto.setShippingAddress(this.modelMapper.map(order.getShippingAddress(), AddressDto.class));
            orderDetailDto.setBillingAddress(this.modelMapper.map(order.getBillingAddress(), AddressDto.class));
            orderDetailDto.setShipper(this.modelMapper.map(order.getShipper(), ShipperDto.class));
            orderDetailDto.setTotalAmount(order.getTotalAmount() + order.getShipper().getCost());
            orderDetailDto.setOrderDate(order.getCreatedAt());
            orderDetailDto.setOrderNumber(order.getOrderNumber());
            orderDetailDto.setStatus(order.getStatus());

            // Get products from order items and set them to order detail dto
            List<OrderItem> orderItems = this.orderItemRepository.findByOrder(order);
            List<ProductDto> products = new ArrayList<>();
            orderItems.forEach((orderItem) -> {
                ProductDto productDto = this.modelMapper.map(orderItem.getProduct(), ProductDto.class);
                products.add(productDto);
            });

            orderDetailDto.setProducts(products);
            orderList.add(orderDetailDto);
        });

        return orderList;
    }

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        List<ProductDto> products = orderRequest.getProducts();
        Order order = new Order();
        AtomicReference<Double> totalAmount = new AtomicReference<>((double) 0);

        Customer customer = this.customerRepository.findById(orderRequest.getCustomerId()).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: ", "customerId", orderRequest.getCustomerId()));
        Address billingAddress = this.addressRepository.findById(orderRequest.getBillingAddressId()).orElseThrow(() -> new ResourceNotFoundException("Address not found with id: ", "addressId", orderRequest.getBillingAddressId()));
        Address shippingAddress = this.addressRepository.findById(orderRequest.getShippingAddressId()).orElseThrow(() -> new ResourceNotFoundException("Address not found with id: ", "addressId", orderRequest.getShippingAddressId()));
        Shipper shipper = this.shipperRepository.findById(orderRequest.getShipperId()).orElseThrow(() -> new ResourceNotFoundException("Shipper not found with id: ", "shipperId", orderRequest.getShipperId()));

        order.setCustomer(customer);
        order.setOrderNumber(this.generateUniqueOrderNumber());
        order.setBillingAddress(billingAddress);
        order.setShippingAddress(shippingAddress);
        order.setShipper(shipper);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = this.orderRepository.save(order);

        products.forEach((product) -> {
            OrderItem orderItem = new OrderItem();
            totalAmount.updateAndGet(v -> v + product.getPrice());

            orderItem.setOrder(savedOrder);
            orderItem.setProduct(this.convertToEntity(product));
            this.orderItemRepository.save(orderItem);
        });

        savedOrder.setTotalAmount(totalAmount.get());
        this.orderRepository.save(savedOrder);

        OrderResponse orderResponse = this.convertToEntity(this.convertToDto(savedOrder));
        orderResponse.setOrderItems(savedOrder.getOrderItems());
        orderResponse.setOrderNumber(savedOrder.getOrderNumber());

        return orderResponse;
    }

    @Override
    public OrderDto updateOrder(OrderDto orderDto) {
        return null;
    }

    private OrderDto convertToDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }

    private OrderResponse convertToEntity(OrderDto orderDto) {
        return modelMapper.map(orderDto, OrderResponse.class);
    }

    private Product convertToEntity(ProductDto productDto) {
        return modelMapper.map(productDto, Product.class);
    }

    private String generateUniqueOrderNumber() {
        UUID uuid = UUID.randomUUID();
        long mostSignificantBits = uuid.getMostSignificantBits();

        // Extract the least significant 6 digits (limited to 999999)
        long orderNumber = Math.abs(mostSignificantBits % 1000000);

        return String.format("#%06d", orderNumber);
    }
}
