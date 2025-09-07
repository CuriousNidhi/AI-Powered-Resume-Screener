package com.ai.resumescreener.repository;

import com.ai.resumescreener.model.JobDescription;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobDescriptionRepository extends MongoRepository<JobDescription, String> {
}


