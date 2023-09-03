package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.ProductDto;

import java.util.Set;

public interface WishlistService {

    void addProductToWishlist(Long customerId, Long productId);

    Set<ProductDto> getWishlistByCustomerId(Long customerId);

    void removeProductFromWishlist(Long customerId, Long productId);

}
