package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.CategoryDto;
import com.onurcansever.leno.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/{name}")
    public ResponseEntity<CategoryDto> getCategoryByName(@PathVariable String name) {
        return new ResponseEntity<>(this.categoryService.getCategoryByName(name), HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Set<CategoryDto>> getAllCategories() {
        return new ResponseEntity<>(this.categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        return new ResponseEntity<>(this.categoryService.createCategory(categoryDto), HttpStatus.CREATED);
    }

    // Assign category to the product
    @PostMapping(value = "/{categoryId}/product/{productId}")
    public ResponseEntity<String> assignCategoryToProduct(@PathVariable Long categoryId, @PathVariable Long productId) {
        this.categoryService.assignCategoryToProduct(categoryId, productId);

        return new ResponseEntity<>("Category assigned to product successfully", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto) {
        return new ResponseEntity<>(this.categoryService.updateCategory(categoryDto), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        this.categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>("Category deleted successfully", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping(value = "/{categoryId}/product/{productId}")
    public ResponseEntity<String> deleteCategoryFromProduct(@PathVariable Long categoryId, @PathVariable Long productId) {
        this.categoryService.deleteCategoryFromProduct(categoryId, productId);

        return new ResponseEntity<>("Category deleted from product successfully", HttpStatus.NO_CONTENT);
    }

}
