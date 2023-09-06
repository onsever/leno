package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByProduct(Product product);

}
