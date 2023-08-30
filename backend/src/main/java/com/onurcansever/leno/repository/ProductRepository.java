package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCustomer_CustomerId(Long customerId);

    Optional<Product> findByCustomer_CustomerIdAndProductId(Long customerId, Long productId);
}
