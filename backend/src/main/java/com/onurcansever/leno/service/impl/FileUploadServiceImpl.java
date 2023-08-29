package com.onurcansever.leno.service.impl;

import com.cloudinary.Cloudinary;
import com.onurcansever.leno.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public final class FileUploadServiceImpl implements FileUploadService {

    private final Cloudinary cloudinary;

    @Autowired
    public FileUploadServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadFile(MultipartFile multipartFile, Long customerId) throws IOException {
        return this.cloudinary.uploader().upload(multipartFile.getBytes(), Map.of("public_id", UUID.randomUUID().toString())).get("url").toString();
    }
}
