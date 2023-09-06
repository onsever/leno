package com.onurcansever.leno.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class ReviewRequest {
    private Long reviewId;
    private Long customerId;
    private Long productId;
    private int rating;
    private String reviewText;
}
