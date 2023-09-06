package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.OrderDetailDto;
import com.onurcansever.leno.payload.OrderDto;
import com.onurcansever.leno.payload.OrderRequest;
import com.onurcansever.leno.payload.OrderResponse;

import java.util.List;

public interface OrderService {

    List<OrderDetailDto> getOrdersByCustomerId(Long customerId);

    OrderResponse createOrder(OrderRequest orderRequest);

    OrderDto updateOrder(OrderDto orderDto);

}
