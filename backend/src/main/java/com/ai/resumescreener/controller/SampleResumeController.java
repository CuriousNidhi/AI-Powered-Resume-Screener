package com.ai.resumescreener.controller;

import com.ai.resumescreener.service.SampleResumeService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/api/resumes/sample")
public class SampleResumeController {
    private final SampleResumeService service;

    public SampleResumeController(SampleResumeService service) {
        this.service = service;
    }

    @GetMapping
    public List<String> list() throws IOException {
        return service.listSamples();
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> download(@PathVariable String filename) throws IOException {
        Resource res = service.getSample(filename);
        if (res == null || !res.exists()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = Files.probeContentType(res.getFile().toPath());
        if (contentType == null) contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + res.getFilename())
                .contentType(MediaType.parseMediaType(contentType))
                .body(res);
    }
}


