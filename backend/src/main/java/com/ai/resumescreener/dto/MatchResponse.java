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
public class MatchResponse {
    private double score; // 0-100
    private List<String> matchedSkills;
    private List<String> missingSkills;
}


