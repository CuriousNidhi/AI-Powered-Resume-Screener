package com.ai.resumescreener.controller;

import com.ai.resumescreener.dto.ResumeUploadResponse;
import com.ai.resumescreener.model.Resume;
import com.ai.resumescreener.repository.ResumeRepository;
import com.ai.resumescreener.service.InMemoryStore;
import com.ai.resumescreener.service.ResumeParserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeRepository resumeRepository;
    private final InMemoryStore inMemoryStore;
    private final ResumeParserService resumeParserService;

    public ResumeController(ResumeRepository resumeRepository, ResumeParserService resumeParserService, InMemoryStore inMemoryStore) {
        this.resumeRepository = resumeRepository;
        this.resumeParserService = resumeParserService;
        this.inMemoryStore = inMemoryStore;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeUploadResponse> upload(@RequestPart("file") MultipartFile file) throws IOException {
        var parsed = resumeParserService.parseResume(file);

        Resume resume = Resume.builder()
                .candidateName(parsed.candidateName())
                .email(parsed.email())
                .phone(parsed.phone())
                .skills(parsed.skills())
                .education(parsed.education())
                .experience(parsed.experience())
                .sourceFileName(file.getOriginalFilename())
                .parserProvider("dummy")
                .createdAt(Instant.now())
                .build();

        try {
            resume = resumeRepository.save(resume);
        } catch (Exception e) {
            resume = inMemoryStore.saveResume(resume);
        }

        return ResponseEntity.ok(ResumeUploadResponse.builder()
                .resumeId(resume.getId())
                .candidateName(resume.getCandidateName())
                .email(resume.getEmail())
                .phone(resume.getPhone())
                .skills(resume.getSkills())
                .education(resume.getEducation())
                .experience(resume.getExperience())
                .build());
    }
}


