package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.CartItem;
import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.CartItemDto;
import com.onurcansever.leno.repository.CartItemRepository;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.repository.ProductRepository;
import com.onurcansever.leno.service.CartItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CartItemServiceImpl(CartItemRepository cartItemRepository, CustomerRepository customerRepository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.cartItemRepository = cartItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void addToCart(Long productId, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: ", "customerId", customerId));

        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with id: ", "productId", productId));

        Optional<CartItem> existingCartItem = this.cartItemRepository.findByCustomerAndProduct(customer, product);

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            this.cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCustomer(customer);
            cartItem.setProduct(product);
            this.cartItemRepository.save(cartItem);
        }
    }

    @Override
    public Set<CartItemDto> getCartItems(Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: ", "customerId", customerId));

        return this.cartItemRepository.findByCustomer(customer).stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = this.cartItemRepository.findById(cartItemId).orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: ", "cartItemId", cartItemId));

        this.cartItemRepository.delete(cartItem);
    }

    private CartItemDto convertToDto(CartItem cartItem) {
        CartItemDto cartItemDto = modelMapper.map(cartItem, CartItemDto.class);
        return cartItemDto;
    }

}
