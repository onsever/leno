package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomer(Customer customer);

}
