package com.ai.resumescreener.repository;

import com.ai.resumescreener.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResumeRepository extends MongoRepository<Resume, String> {
}


