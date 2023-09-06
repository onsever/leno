package com.onurcansever.leno.payload;

import com.onurcansever.leno.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse extends OrderDto {
    private String orderNumber;
    private List<OrderItem> orderItems;
}
