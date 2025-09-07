package com.ai.resumescreener.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
public class ResumeParserService {

    private final SkillExtractionService skillExtractionService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${parser.provider:dummy}")
    private String provider;

    @Value("${parser.affinda.apiKey:}")
    private String affindaApiKey;

    public ResumeParserService(SkillExtractionService skillExtractionService) {
        this.skillExtractionService = skillExtractionService;
    }

    public ParsedResume parseResume(MultipartFile file) throws IOException {
        if ("affinda".equalsIgnoreCase(provider) && affindaApiKey != null && !affindaApiKey.isBlank()) {
            try {
                return parseWithAffinda(file);
            } catch (Exception ignored) {
                // Fallback to dummy parsing if external API fails
            }
        }

        String name = file.getOriginalFilename();
        String text;
        try {
            text = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            text = name != null ? name : "";
        }

        List<String> skills = skillExtractionService.extractSkillsFromText(text);
        return new ParsedResume(guessNameFromFilename(name), null, null, skills,
                List.of(), List.of());
    }

    private ParsedResume parseWithAffinda(MultipartFile file) throws IOException {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(affindaApiKey);

        ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        String response = rest.postForObject("https://api.affinda.com/v3/resumes", request, String.class);

        if (response == null) {
            throw new IOException("Empty response from Affinda");
        }

        JsonNode root = objectMapper.readTree(response);
        JsonNode data = root.path("data");

        String candidate = valueOrNull(data.path("name").path("raw"));
        if (candidate == null) candidate = guessNameFromFilename(file.getOriginalFilename());
        String email = firstArrayValue(data.path("emails"));
        String phone = firstArrayValue(data.path("phoneNumbers"));

        List<String> skills = new ArrayList<>();
        for (JsonNode n : data.path("skills")) {
            String s = valueOrNull(n.path("name"));
            if (s != null) skills.add(s.toLowerCase(Locale.ROOT));
        }

        List<String> education = new ArrayList<>();
        for (JsonNode n : data.path("education")) {
            String s = valueOrNull(n.path("organization"));
            if (s != null) education.add(s);
        }

        List<String> experience = new ArrayList<>();
        for (JsonNode n : data.path("workExperience")) {
            String s = valueOrNull(n.path("jobTitle"));
            if (s != null) experience.add(s);
        }

        if (skills.isEmpty()) {
            // If Affinda returns no skills, attempt basic extraction from text fallback
            skills = skillExtractionService.extractSkillsFromText(valueOrNull(data.path("rawText")));
        }

        return new ParsedResume(candidate, email, phone, skills, education, experience);
    }

    private String firstArrayValue(JsonNode node) {
        if (node.isArray() && node.size() > 0) {
            return valueOrNull(node.get(0));
        }
        return null;
    }

    private String valueOrNull(JsonNode node) {
        if (node == null || node.isMissingNode() || node.isNull()) return null;
        String val = node.asText(null);
        if (val == null || val.isBlank()) return null;
        return val;
    }

    private String guessNameFromFilename(String filename) {
        if (filename == null) return "Unknown";
        String base = filename.toLowerCase(Locale.ROOT).replaceAll("\\.(pdf|docx|doc|txt)$", "");
        base = base.replaceAll("[_-]+", " ").trim();
        String[] parts = Arrays.stream(base.split(" "))
                .filter(p -> p.length() > 0)
                .toArray(String[]::new);
        if (parts.length >= 2) {
            return capitalize(parts[0]) + " " + capitalize(parts[1]);
        }
        return capitalize(base);
    }

    private String capitalize(String s) {
        if (s == null || s.isBlank()) return s;
        return s.substring(0, 1).toUpperCase(Locale.ROOT) + s.substring(1);
    }

    public record ParsedResume(String candidateName,
                               String email,
                               String phone,
                               List<String> skills,
                               List<String> education,
                               List<String> experience) {}
}


