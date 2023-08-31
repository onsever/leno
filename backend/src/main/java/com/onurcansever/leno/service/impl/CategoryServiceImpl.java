package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Category;
import com.onurcansever.leno.entity.Product;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.CategoryDto;
import com.onurcansever.leno.repository.CategoryRepository;
import com.onurcansever.leno.repository.ProductRepository;
import com.onurcansever.leno.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryDto getCategoryByName(String name) {
        Category category = this.categoryRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Category", "name"));

        return this.convertToDto(category);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = this.convertToEntity(categoryDto);

        this.categoryRepository.save(category);

        return this.convertToDto(category);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public void deleteCategory(Long categoryId) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        this.categoryRepository.delete(category);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        Category updatedCategory = this.categoryRepository.findById(categoryDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryDto.getCategoryId()));

        updatedCategory.setName(categoryDto.getName());

        this.categoryRepository.save(updatedCategory);

        return this.convertToDto(updatedCategory);
    }

    @Override
    public void assignCategoryToProduct(Long categoryId, Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        product.getCategories().add(category);

        this.productRepository.save(product);
    }

    @Override
    public void deleteCategoryFromProduct(Long categoryId, Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        product.getCategories().remove(category);

        this.productRepository.save(product);
    }

    @Override
    public Set<CategoryDto> getAllCategories() {
        List<Category> categories = this.categoryRepository.findAll();

        return categories.stream().map(this::convertToDto).collect(Collectors.toSet());
    }

    private CategoryDto convertToDto(Category category) {
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        return categoryDto;
    }

    private Category convertToEntity(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        return category;
    }

}
