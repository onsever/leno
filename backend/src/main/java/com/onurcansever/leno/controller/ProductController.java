package com.onurcansever.leno.controller;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.payload.ProductDetailDto;
import com.onurcansever.leno.payload.ProductDto;
import com.onurcansever.leno.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDetailDto>> getAllProducts() {
        List<Product> products = this.productService.getAllProducts();

        List<ProductDetailDto> productDetailDtos = products.stream().map(product -> this.productService.getProductDetail(product, product.getCustomer())).toList();

        return new ResponseEntity<>(productDetailDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{productId}")
    public ResponseEntity<ProductDetailDto> getProductById(@PathVariable Long productId) {
        Product product = this.productService.getProductById(productId);

        Customer customer = product.getCustomer();

        ProductDetailDto productDetailDto = this.productService.getProductDetail(product, customer);

        return new ResponseEntity<>(productDetailDto, HttpStatus.OK);
    }

    @GetMapping(value = "/customer/{customerId}")
    public ResponseEntity<List<ProductDetailDto>> getProductsByCustomerId(@PathVariable Long customerId) {
        List<ProductDetailDto> productDetailDtos = this.productService.getProductsByCustomerId(customerId);

        return new ResponseEntity<>(productDetailDtos, HttpStatus.OK);
    }

    @PostMapping(value = "/customer/{customerId}")
    public ResponseEntity<ProductDto> createProductForCustomer(@RequestBody ProductDto productDto, @PathVariable Long customerId) {
        ProductDto createdProduct = this.productService.createProductForCustomer(productDto, customerId);

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping(value = "/customer/{customerId}")
    public ResponseEntity<ProductDto> updateProductForCustomer(@RequestBody ProductDto productDto, @PathVariable Long customerId) {
        ProductDto updatedProduct = this.productService.updateProductForCustomer(productDto, customerId);

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{productId}/customer/{customerId}")
    public ResponseEntity<?> deleteProductForCustomer(@PathVariable Long productId, @PathVariable Long customerId) {
        this.productService.deleteProductForCustomer(productId, customerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
