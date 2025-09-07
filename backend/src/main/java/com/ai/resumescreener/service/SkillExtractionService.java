package com.ai.resumescreener.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class SkillExtractionService {
    private static final List<String> KNOWN_SKILLS = Arrays.asList(
            "java", "spring", "spring boot", "mongodb", "react", "typescript", "javascript",
            "docker", "kubernetes", "aws", "azure", "gcp", "git", "maven", "gradle",
            "rest", "graphql", "node", "python", "nlp", "ml", "ci/cd", "terraform"
    );

    private static final Pattern SPLIT_PATTERN = Pattern.compile("[^a-zA-Z+#]+");

    public List<String> extractSkillsFromText(String text) {
        if (text == null || text.isBlank()) {
            return List.of();
        }
        String lower = text.toLowerCase(Locale.ROOT);
        Set<String> tokens = Arrays.stream(SPLIT_PATTERN.split(lower))
                .filter(token -> token != null && !token.isBlank())
                .collect(Collectors.toSet());

        // include multi-word skills if present as substring
        Set<String> result = KNOWN_SKILLS.stream()
                .filter(skill -> {
                    if (skill.contains(" ")) {
                        return lower.contains(skill);
                    }
                    return tokens.contains(skill);
                })
                .collect(Collectors.toSet());

        return result.stream().sorted().collect(Collectors.toList());
    }
}


