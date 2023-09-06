package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Order;
import com.onurcansever.leno.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);

}
