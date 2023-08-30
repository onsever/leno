package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.CategoryDto;

public interface CategoryService {

    CategoryDto getCategoryByName(String name);

    CategoryDto createCategory(CategoryDto categoryDto);

    void deleteCategory(Long categoryId);

    CategoryDto updateCategory(CategoryDto categoryDto);

    void assignCategoryToProduct(Long categoryId, Long productId);

    void deleteCategoryFromProduct(Long categoryId, Long productId);

}
