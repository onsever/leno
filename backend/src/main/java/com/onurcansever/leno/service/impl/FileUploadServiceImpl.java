package com.onurcansever.leno.service.impl;

import com.cloudinary.Cloudinary;
import com.onurcansever.leno.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    private final Cloudinary cloudinary;

    @Autowired
    public FileUploadServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadCustomerProfilePhoto(MultipartFile multipartFile, Long customerId) throws IOException {
        String publicId = String.format("customers/%d/profile-picture", customerId);

        Map<String, Object> uploadParams = new HashMap<>();
        uploadParams.put("public_id", publicId);

        Map<?, ?> uploadResult = this.cloudinary.uploader().upload(multipartFile.getBytes(), uploadParams);

        return uploadResult.get("url").toString();
    }
}
