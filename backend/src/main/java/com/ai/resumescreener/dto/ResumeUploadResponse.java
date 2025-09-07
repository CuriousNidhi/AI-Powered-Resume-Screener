package com.ai.resumescreener.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeUploadResponse {
    private String resumeId;
    private String candidateName;
    private String email;
    private String phone;
    private List<String> skills;
    private List<String> education;
    private List<String> experience;
}


