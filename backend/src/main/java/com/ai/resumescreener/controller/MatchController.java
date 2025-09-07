package com.ai.resumescreener.controller;

import com.ai.resumescreener.dto.MatchRequest;
import com.ai.resumescreener.dto.MatchResponse;
import com.ai.resumescreener.model.JobDescription;
import com.ai.resumescreener.model.Resume;
import com.ai.resumescreener.repository.JobDescriptionRepository;
import com.ai.resumescreener.repository.ResumeRepository;
import com.ai.resumescreener.service.InMemoryStore;
import com.ai.resumescreener.service.MatchingService;
import com.ai.resumescreener.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/match")
public class MatchController {
    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final MatchingService matchingService;
    private final ReportService reportService;
    private final InMemoryStore inMemoryStore;

    public MatchController(ResumeRepository resumeRepository, JobDescriptionRepository jobDescriptionRepository, MatchingService matchingService, ReportService reportService, InMemoryStore inMemoryStore) {
        this.resumeRepository = resumeRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.matchingService = matchingService;
        this.reportService = reportService;
        this.inMemoryStore = inMemoryStore;
    }

    @PostMapping
    public ResponseEntity<MatchResponse> match(@RequestBody MatchRequest request) {
        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseGet(() -> inMemoryStore.getResume(request.getResumeId()).orElseThrow());
        JobDescription jd = jobDescriptionRepository.findById(request.getJobId())
                .orElseGet(() -> inMemoryStore.getJob(request.getJobId()).orElseThrow());

        var result = matchingService.jaccardMatch(resume.getSkills(), jd.getSkills());
        return ResponseEntity.ok(MatchResponse.builder()
                .score(result.score())
                .matchedSkills(result.matchedSkills())
                .missingSkills(result.missingSkills())
                .build());
    }

    @PostMapping(value = "/report", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> report(@RequestBody MatchRequest request) throws IOException {
        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseGet(() -> inMemoryStore.getResume(request.getResumeId()).orElseThrow());
        JobDescription jd = jobDescriptionRepository.findById(request.getJobId())
                .orElseGet(() -> inMemoryStore.getJob(request.getJobId()).orElseThrow());
        var result = matchingService.jaccardMatch(resume.getSkills(), jd.getSkills());
        byte[] pdf = reportService.buildMatchReport(resume.getCandidateName(), result.score(), result.matchedSkills(), result.missingSkills());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=match-report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}


