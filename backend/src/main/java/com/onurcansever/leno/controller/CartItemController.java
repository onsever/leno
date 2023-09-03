package com.onurcansever.leno.controller;

import com.onurcansever.leno.entity.CartItem;
import com.onurcansever.leno.payload.CartItemDto;
import com.onurcansever.leno.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/cart")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PostMapping("/product/{productId}/customer/{customerId}")
    public ResponseEntity<String> addToCart(@PathVariable Long productId, @PathVariable Long customerId) {
        this.cartItemService.addToCart(productId, customerId);
        return ResponseEntity.ok("Product added to cart successfully");
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Set<CartItemDto>> getCartItems(@PathVariable Long customerId) {
        Set<CartItemDto> cartItems = this.cartItemService.getCartItems(customerId);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long cartItemId) {
        this.cartItemService.deleteCartItem(cartItemId);
        return ResponseEntity.ok("Cart item deleted successfully");
    }

}
