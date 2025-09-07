package com.ai.resumescreener.service;

import com.ai.resumescreener.model.JobDescription;
import com.ai.resumescreener.model.Resume;
import org.springframework.stereotype.Service;
import com.ai.resumescreener.model.User;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryStore {
    private final Map<String, Resume> resumeStore = new ConcurrentHashMap<>();
    private final Map<String, JobDescription> jobStore = new ConcurrentHashMap<>();
    private final Map<String, User> userStore = new ConcurrentHashMap<>();
    private final Map<String, String> tokenToUserId = new ConcurrentHashMap<>();

    public Resume saveResume(Resume resume) {
        String id = resume.getId() != null ? resume.getId() : UUID.randomUUID().toString();
        resume.setId(id);
        resumeStore.put(id, resume);
        return resume;
    }

    public Optional<Resume> getResume(String id) {
        return Optional.ofNullable(resumeStore.get(id));
    }

    public JobDescription saveJob(JobDescription jd) {
        String id = jd.getId() != null ? jd.getId() : UUID.randomUUID().toString();
        jd.setId(id);
        jobStore.put(id, jd);
        return jd;
    }

    public Optional<JobDescription> getJob(String id) {
        return Optional.ofNullable(jobStore.get(id));
    }

    public User saveUser(User user) {
        String id = user.getId() != null ? user.getId() : UUID.randomUUID().toString();
        user.setId(id);
        userStore.put(id, user);
        return user;
    }

    public Optional<User> getUserByEmail(String email) {
        return userStore.values().stream().filter(u -> email.equalsIgnoreCase(u.getEmail())).findFirst();
    }

    public String issueToken(String userId) {
        String token = UUID.randomUUID().toString();
        tokenToUserId.put(token, userId);
        return token;
    }

    public Optional<User> getUserByToken(String token) {
        String uid = tokenToUserId.get(token);
        return uid == null ? Optional.empty() : Optional.ofNullable(userStore.get(uid));
    }
}


