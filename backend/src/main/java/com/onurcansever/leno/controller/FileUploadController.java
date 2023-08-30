package com.onurcansever.leno.controller;

import com.onurcansever.leno.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/customer/profile-picture")
    public ResponseEntity<String> uploadCustomerProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("customerId") Long customerId) throws IOException {
        String profilePictureUrl = fileUploadService.uploadCustomerProfilePhoto(file, customerId);

        return ResponseEntity.ok(profilePictureUrl);
    }
}
