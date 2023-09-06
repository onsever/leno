package com.onurcansever.leno.payload;

import com.onurcansever.leno.utility.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class OrderDetailDto {
    private Long orderId;
    private String orderNumber;
    private CustomerDto customer;
    private AddressDto shippingAddress;
    private AddressDto billingAddress;
    private ShipperDto shipper;
    private Double totalAmount;
    private LocalDateTime orderDate;
    private List<ProductDto> products;
    private OrderStatus status;
}
