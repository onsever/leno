package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.entity.Review;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.payload.ProductDto;
import com.onurcansever.leno.payload.ReviewRequest;
import com.onurcansever.leno.payload.ReviewResponse;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.repository.ProductRepository;
import com.onurcansever.leno.repository.ReviewRepository;
import com.onurcansever.leno.service.ReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductRepository productRepository, CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReviewResponse createReviewForProduct(ReviewRequest reviewRequest) {
        Customer customer = this.customerRepository.findById(reviewRequest.getCustomerId()).orElseThrow(() -> new ResourceNotFoundException("Customer with id not found: ", "customerId", reviewRequest.getCustomerId()));

        Product product = this.productRepository.findById(reviewRequest.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product with id not found: ", "productId", reviewRequest.getProductId()));

        Review review = new Review();
        review.setCustomer(customer);
        review.setProduct(product);
        review.setReviewText(reviewRequest.getReviewText());
        review.setRating(reviewRequest.getRating());

        Review savedReview = this.reviewRepository.save(review);

        return this.convertToReviewResponse(savedReview);
    }

    @Override
    public ReviewResponse updateReviewForProduct(ReviewRequest reviewRequest) {
        Review review = this.reviewRepository.findById(reviewRequest.getReviewId()).orElseThrow(() -> new ResourceNotFoundException("Review with id not found: ", "reviewId", reviewRequest.getReviewId()));

        review.setRating(reviewRequest.getRating());
        review.setReviewText(reviewRequest.getReviewText());

        Review savedReview = this.reviewRepository.save(review);

        return this.convertToReviewResponse(savedReview);
    }

    @Override
    public Set<ReviewResponse> getAllReviewsForProduct(Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product with id not found: ", "productId", productId));

        List<Review> reviews = this.reviewRepository.findAllByProduct(product);

        return reviews.stream().map(this::convertToReviewResponse).collect(Collectors.toSet());
    }

    @Override
    public void deleteReviewForProduct(Long reviewId, Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product with id not found: ", "productId", productId));

        Review review = this.reviewRepository.findById(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with id not found: ", "reviewId", reviewId));

        if (!review.getProduct().equals(product)) {
            throw new ResourceNotFoundException("Review with id not found: ", "reviewId", reviewId);
        }

        this.reviewRepository.delete(review);
    }

    private ReviewResponse convertToReviewResponse(Review review) {
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setReviewId(review.getReviewId());
        reviewResponse.setCustomer(this.modelMapper.map(review.getCustomer(), CustomerDto.class));
        reviewResponse.setProduct(this.modelMapper.map(review.getProduct(), ProductDto.class));
        reviewResponse.setRating(review.getRating());
        reviewResponse.setReviewText(review.getReviewText());
        reviewResponse.setReviewDate(review.getCreatedAt());

        return reviewResponse;
    }

}
