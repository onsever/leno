package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.OrderDetailDto;
import com.onurcansever.leno.payload.OrderRequest;
import com.onurcansever.leno.payload.OrderResponse;
import com.onurcansever.leno.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "/{customerId}")
    public ResponseEntity<List<OrderDetailDto>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<OrderDetailDto> orderDetailDtoList = this.orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orderDetailDtoList);
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse orderResponse = this.orderService.createOrder(orderRequest);
        return ResponseEntity.ok(orderResponse);
    }

}
