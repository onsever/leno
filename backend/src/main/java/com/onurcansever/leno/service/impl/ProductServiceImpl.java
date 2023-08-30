package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.CategoryDto;
import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.payload.ProductDetailDto;
import com.onurcansever.leno.payload.ProductDto;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.repository.ProductRepository;
import com.onurcansever.leno.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = this.productRepository.findAll();

        return products;
    }

    @Override
    public List<ProductDetailDto> getProductsByCustomerId(Long customerId) {
        List<Product> products = this.productRepository.findByCustomer_CustomerId(customerId);

        List<ProductDetailDto> productDetailDtos = products.stream().map(product -> this.getProductDetail(product, product.getCustomer())).collect(Collectors.toList());

        return productDetailDtos;
    }

    @Override
    public ProductDetailDto getProductDetail(Product product, Customer customer) {
        Product existingProduct = this.productRepository.findById(product.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product", "productId", product.getProductId()));

        CustomerDto existingCustomer = this.modelMapper.map(customer, CustomerDto.class);

        Set<CategoryDto> categories = existingProduct.getCategories().stream().map(category -> this.modelMapper.map(category, CategoryDto.class)).collect(Collectors.toSet());

        return new ProductDetailDto(existingProduct, existingCustomer, categories);
    }

    @Override
    public Product getProductById(Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        return product;
    }


    @Override
    @PreAuthorize(value = "#customerId == authentication.principal.customerId")
    public ProductDto updateProductForCustomer(ProductDto productDto, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "customerId", customerId));

        Product product = this.convertToEntity(productDto);
        product.setCustomer(customer);

        Product updatedProduct = this.productRepository.save(product);

        return this.convertToDto(updatedProduct);
    }

    @Override
    @PreAuthorize(value = "#customerId == authentication.principal.customerId")
    public ProductDto createProductForCustomer(ProductDto productDto, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "customerId", customerId));

        Product product = this.convertToEntity(productDto);
        product.setCustomer(customer);

        Product createdProduct = this.productRepository.save(product);

        return this.convertToDto(createdProduct);
    }

    @Override
    @PreAuthorize(value = "#customerId == authentication.principal.customerId")
    public void deleteProductForCustomer(Long productId, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "customerId", customerId));

        Product product = this.productRepository.findByCustomer_CustomerIdAndProductId(customerId, productId).orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        this.productRepository.delete(product);
    }


    private ProductDto convertToDto(Product product) {
        return modelMapper.map(product, ProductDto.class);
    }

    private Product convertToEntity(ProductDto productDto) {
        return modelMapper.map(productDto, Product.class);
    }

}
