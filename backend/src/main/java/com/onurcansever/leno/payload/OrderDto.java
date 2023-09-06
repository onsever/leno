package com.onurcansever.leno.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long orderId;
    private Double totalAmount;
    private Long shippingAddressId;
    private Long billingAddressId;
    private Long shipperId;
    private Long customerId;
}
