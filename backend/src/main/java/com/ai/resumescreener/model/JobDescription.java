package com.ai.resumescreener.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "job_descriptions")
public class JobDescription {
    @Id
    private String id;

    private String title;
    private String rawText;
    private List<String> skills; // normalized lowercase
    private Instant createdAt;
}


