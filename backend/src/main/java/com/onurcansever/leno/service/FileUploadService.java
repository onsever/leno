package com.onurcansever.leno.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {

    String uploadFile(MultipartFile multipartFile, Long customerId) throws IOException;
}
