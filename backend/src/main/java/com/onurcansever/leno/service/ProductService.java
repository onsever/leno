package com.onurcansever.leno.service;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.payload.ProductDetailDto;
import com.onurcansever.leno.payload.ProductDto;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    List<ProductDetailDto> getProductsByCustomerId(Long customerId);

    ProductDetailDto getProductDetail(Product product, Customer customer);

    Product getProductById(Long productId);

    ProductDto updateProductForCustomer(ProductDto productDto, Long customerId);

    ProductDto createProductForCustomer(ProductDto productDto, Long customerId);

    void deleteProductForCustomer(Long productId, Long customerId);

}
