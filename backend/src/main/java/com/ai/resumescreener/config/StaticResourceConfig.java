package com.ai.resumescreener.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path base = Paths.get("backend", "src", "main", "resources", "sample-resumes");
        String location = base.toFile().exists()
                ? base.toUri().toString()
                : Paths.get("sample-resumes").toUri().toString();

        registry.addResourceHandler("/sample-resumes/**")
                .addResourceLocations(location);
    }
}


