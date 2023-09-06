package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.ReviewRequest;
import com.onurcansever.leno.payload.ReviewResponse;

import java.util.Set;

public interface ReviewService {

    ReviewResponse createReviewForProduct(ReviewRequest reviewRequest);

    ReviewResponse updateReviewForProduct(ReviewRequest reviewRequest);

    Set<ReviewResponse> getAllReviewsForProduct(Long productId);

    void deleteReviewForProduct(Long reviewId, Long productId);

}
