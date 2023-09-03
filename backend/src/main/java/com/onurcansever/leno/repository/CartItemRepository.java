package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.CartItem;
import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCustomerAndProduct(Customer customer, Product product);

    List<CartItem> findByCustomer(Customer customer);

}
