package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.ReviewRequest;
import com.onurcansever.leno.payload.ReviewResponse;
import com.onurcansever.leno.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping(value = "/{productId}")
    public ResponseEntity<Set<ReviewResponse>> getAllReviewsForProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(this.reviewService.getAllReviewsForProduct(productId));
    }

    @PostMapping(value = "/create")
    public ResponseEntity<ReviewResponse> createReviewForProduct(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(this.reviewService.createReviewForProduct(reviewRequest));
    }

    @DeleteMapping(value = "/delete/{reviewId}/{productId}")
    public ResponseEntity<String> deleteReviewForProduct(@PathVariable Long reviewId, @PathVariable Long productId) {
        this.reviewService.deleteReviewForProduct(reviewId, productId);
        return ResponseEntity.ok("Review deleted successfully");
    }

    @PutMapping(value = "/update")
    public ResponseEntity<ReviewResponse> updateReviewForProduct(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(this.reviewService.updateReviewForProduct(reviewRequest));
    }

}
