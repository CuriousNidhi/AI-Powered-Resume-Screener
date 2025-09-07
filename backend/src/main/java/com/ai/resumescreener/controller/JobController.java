package com.ai.resumescreener.controller;

import com.ai.resumescreener.dto.JobDescriptionRequest;
import com.ai.resumescreener.dto.JobDescriptionResponse;
import com.ai.resumescreener.model.JobDescription;
import com.ai.resumescreener.repository.JobDescriptionRepository;
import com.ai.resumescreener.service.InMemoryStore;
import com.ai.resumescreener.service.SkillExtractionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/job")
public class JobController {
    private final SkillExtractionService skillExtractionService;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final InMemoryStore inMemoryStore;

    public JobController(SkillExtractionService skillExtractionService, JobDescriptionRepository jobDescriptionRepository, InMemoryStore inMemoryStore) {
        this.skillExtractionService = skillExtractionService;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.inMemoryStore = inMemoryStore;
    }

    @PostMapping("/description")
    public ResponseEntity<JobDescriptionResponse> create(@Valid @RequestBody JobDescriptionRequest request) {
        var skills = skillExtractionService.extractSkillsFromText(request.getText());
        JobDescription jd = JobDescription.builder()
                .title(request.getTitle())
                .rawText(request.getText())
                .skills(skills)
                .createdAt(Instant.now())
                .build();
        try {
            jd = jobDescriptionRepository.save(jd);
        } catch (Exception e) {
            jd = inMemoryStore.saveJob(jd);
        }

        return ResponseEntity.ok(JobDescriptionResponse.builder()
                .jobId(jd.getId())
                .title(jd.getTitle())
                .skills(jd.getSkills())
                .build());
    }
}


