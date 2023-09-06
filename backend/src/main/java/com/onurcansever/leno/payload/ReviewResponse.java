package com.onurcansever.leno.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public final class ReviewResponse {
    private Long reviewId;
    private CustomerDto customer;
    private ProductDto product;
    private int rating;
    private String reviewText;
    private LocalDateTime reviewDate;
}
