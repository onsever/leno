package com.onurcansever.leno.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {

    @Value(value = "${cloudinary.cloud-name}")
    private String CLOUD_NAME;

    @Value(value = "${cloudinary.api-key}")
    private String API_KEY;

    @Value(value = "${cloudinary.api-secret}")
    private String API_SECRET;

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> configuration = new HashMap<>();
        configuration.put("cloud_name", CLOUD_NAME);
        configuration.put("api_key", API_KEY);
        configuration.put("api_secret", API_SECRET);

        Cloudinary cloudinary = new Cloudinary(configuration);
        System.out.println("Cloudinary bean created: " + cloudinary.config.cloudName);

        return cloudinary;
    }

}
