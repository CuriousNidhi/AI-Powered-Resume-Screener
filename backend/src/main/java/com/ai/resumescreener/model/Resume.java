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
@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;

    private String candidateName;
    private String email;
    private String phone;

    private List<String> skills; // normalized lowercase
    private List<String> education;
    private List<String> experience;

    private String sourceFileName;
    private String parserProvider; // affinda|rchilli|sovren|dummy
    private Instant createdAt;
}


