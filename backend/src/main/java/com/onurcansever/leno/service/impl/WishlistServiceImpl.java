package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.ProductDto;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.repository.ProductRepository;
import com.onurcansever.leno.service.WishlistService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public WishlistServiceImpl(CustomerRepository customerRepository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public void addProductToWishlist(Long customerId, Long productId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        customer.getWishlist().add(product);

        this.customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Set<ProductDto> getWishlistByCustomerId(Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        return customer.getWishlist().stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    @Override
    @Transactional
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public void removeProductFromWishlist(Long customerId, Long productId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        customer.getWishlist().remove(product);

        this.customerRepository.save(customer);
    }

    private ProductDto convertToDto(Product product) {
        return this.modelMapper.map(product, ProductDto.class);
    }

}
