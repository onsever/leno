package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.CartItemDto;

import java.util.Set;

public interface CartItemService {

    void addToCart(Long productId, Long customerId);

    Set<CartItemDto> getCartItems(Long customerId);

    void deleteCartItem(Long cartItemId);

}
