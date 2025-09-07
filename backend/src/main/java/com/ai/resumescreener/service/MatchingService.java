package com.ai.resumescreener.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MatchingService {
    public Result jaccardMatch(List<String> resumeSkills, List<String> jdSkills) {
        Set<String> a = new HashSet<>();
        if (resumeSkills != null) a.addAll(normalize(resumeSkills));
        Set<String> b = new HashSet<>();
        if (jdSkills != null) b.addAll(normalize(jdSkills));

        Set<String> intersection = new HashSet<>(a);
        intersection.retainAll(b);

        Set<String> union = new HashSet<>(a);
        union.addAll(b);

        double score = union.isEmpty() ? 0 : (100.0 * intersection.size() / union.size());

        List<String> matched = new ArrayList<>(intersection);
        List<String> missing = new ArrayList<>(b);
        missing.removeAll(intersection);

        return new Result(score, matched, missing);
    }

    private List<String> normalize(List<String> skills) {
        return skills.stream()
                .filter(s -> s != null && !s.isBlank())
                .map(s -> s.trim().toLowerCase())
                .toList();
    }

    public record Result(double score, List<String> matchedSkills, List<String> missingSkills) {}
}


