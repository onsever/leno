package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.ProductDto;
import com.onurcansever.leno.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping(value = "/{customerId}")
    public ResponseEntity<Set<ProductDto>> getWishlistByCustomerId(@PathVariable Long customerId) {
        Set<ProductDto> wishlist = this.wishlistService.getWishlistByCustomerId(customerId);

        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }

    @PostMapping(value = "/{customerId}/add/{productId}")
    public ResponseEntity<String> addProductToWishlist(@PathVariable Long customerId, @PathVariable Long productId) {
        this.wishlistService.addProductToWishlist(customerId, productId);

        return new ResponseEntity<>("Product added to wishlist successfully", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{customerId}/remove/{productId}")
    public ResponseEntity<String> removeProductFromWishlist(@PathVariable Long customerId, @PathVariable Long productId) {
        this.wishlistService.removeProductFromWishlist(customerId, productId);

        return new ResponseEntity<>("Product removed from wishlist successfully", HttpStatus.OK);
    }

}
