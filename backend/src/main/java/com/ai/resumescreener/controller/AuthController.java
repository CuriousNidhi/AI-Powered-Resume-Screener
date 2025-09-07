package com.ai.resumescreener.controller;

import com.ai.resumescreener.model.User;
import com.ai.resumescreener.repository.UserRepository;
import com.ai.resumescreener.service.InMemoryStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final InMemoryStore inMemoryStore;

    @Autowired
    public AuthController(UserRepository userRepository, InMemoryStore inMemoryStore) {
        this.userRepository = userRepository;
        this.inMemoryStore = inMemoryStore;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> req) {
        String email = req.getOrDefault("email", "").trim().toLowerCase();
        String name = req.getOrDefault("name", "").trim();
        String password = req.getOrDefault("password", "");
        if (email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        // Try Mongo first
        try {
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(409).body(Map.of("error", "Email already registered"));
            }
            User u = new User(null, email, hash(password), name);
            userRepository.save(u);
            String token = inMemoryStore.issueToken(u.getId());
            return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())));
        } catch (Exception ignored) {
            // Fallback to in-memory
            if (inMemoryStore.getUserByEmail(email).isPresent()) {
                return ResponseEntity.status(409).body(Map.of("error", "Email already registered"));
            }
            User u = new User(null, email, hash(password), name);
            inMemoryStore.saveUser(u);
            String token = inMemoryStore.issueToken(u.getId());
            return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())));
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> req) {
        String email = req.getOrDefault("email", "").trim().toLowerCase();
        String password = req.getOrDefault("password", "");
        String hash = hash(password);
        try {
            User u = userRepository.findByEmail(email).orElse(null);
            if (u == null || !hash.equals(u.getPasswordHash())) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }
            String token = inMemoryStore.issueToken(u.getId());
            return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())));
        } catch (Exception ignored) {
            User u = inMemoryStore.getUserByEmail(email).orElse(null);
            if (u == null || !hash.equals(u.getPasswordHash())) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }
            String token = inMemoryStore.issueToken(u.getId());
            return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Missing token"));
        }
        String token = auth.substring("Bearer ".length()).trim();
        return inMemoryStore.getUserByToken(token)
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Invalid token")));
    }

    private static String hash(String value) {
        return DigestUtils.md5DigestAsHex(value.getBytes(StandardCharsets.UTF_8));
    }
}


