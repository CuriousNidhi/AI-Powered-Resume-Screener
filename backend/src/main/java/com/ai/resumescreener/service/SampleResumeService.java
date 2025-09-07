package com.ai.resumescreener.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import jakarta.annotation.PostConstruct;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SampleResumeService {
    private final Path repoResourcesDir = Paths.get("backend", "src", "main", "resources", "sample-resumes");
    private final Path runtimeDir = Paths.get("sample-resumes");

    @PostConstruct
    public void ensureSamples() {
        try {
            // Prefer repo resources dir for visibility in the project tree
            Path base = Files.exists(repoResourcesDir.getParent()) ? repoResourcesDir : runtimeDir;
            Files.createDirectories(base);
            createIfMissing(base.resolve("sample-text.pdf"), this::buildSimplePdf);
            createIfMissing(base.resolve("sample-modern.pdf"), this::buildModernPdf);
            createIfMissing(base.resolve("classic-ats.docx"), this::buildClassicDocx);
            createIfMissing(base.resolve("creative.docx"), this::buildCreativeDocx);
            createIfMissing(base.resolve("json-resume.json"), this::writeJsonResume);
        } catch (IOException e) {
            // Best-effort generation; keep app running
        }
    }

    public Path getBaseDir() {
        if (Files.exists(repoResourcesDir)) {
            return repoResourcesDir;
        }
        return runtimeDir;
    }

    public List<String> listSamples() throws IOException {
        Path base = getBaseDir();
        if (!Files.exists(base)) return List.of();
        try (var s = Files.list(base)) {
            return s.filter(Files::isRegularFile)
                    .sorted(Comparator.comparing(Path::getFileName))
                    .map(p -> p.getFileName().toString())
                    .collect(Collectors.toList());
        }
    }

    public Resource getSample(String filename) {
        if (!StringUtils.hasText(filename)) return null;
        Path file = getBaseDir().resolve(filename);
        if (Files.exists(file)) {
            return new FileSystemResource(file.toFile());
        }
        return null;
    }

    private interface FileBuilder { void build(Path target) throws IOException; }

    private void createIfMissing(Path path, FileBuilder builder) throws IOException {
        if (Files.exists(path)) return;
        Files.createDirectories(path.getParent());
        builder.build(path);
    }

    private void buildSimplePdf(Path target) throws IOException {
        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PDPage page = new PDPage(PDRectangle.LETTER);
            doc.addPage(page);
            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                float y = PDRectangle.LETTER.getHeight() - 60;
                cs.setFont(PDType1Font.HELVETICA_BOLD, 20);
                cs.beginText(); cs.newLineAtOffset(50, y); cs.showText("John Doe"); cs.endText();
                y -= 20;
                cs.setFont(PDType1Font.HELVETICA, 12);
                writeLine(cs, 50, y, "Software Engineer | johndoe@example.com | (555) 123-4567"); y -= 20;
                writeLine(cs, 50, y, "Skills: Java, Spring Boot, React, MongoDB, Docker"); y -= 20;
                writeLine(cs, 50, y, "Experience:"); y -= 16;
                writeLine(cs, 60, y, "- ACME Corp — Senior Engineer (2022–Now): Built APIs, improved latency by 35%."); y -= 16;
                writeLine(cs, 50, y, "Education: B.Sc. in Computer Science");
            }
            doc.save(out);
            try (FileOutputStream fos = new FileOutputStream(target.toFile())) { fos.write(out.toByteArray()); }
        }
    }

    private void buildModernPdf(Path target) throws IOException {
        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PDPage page = new PDPage(PDRectangle.LETTER);
            doc.addPage(page);
            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                // Header bar
                cs.setNonStrokingColor(46, 204, 113); // emerald
                cs.addRect(0, PDRectangle.LETTER.getHeight() - 90, PDRectangle.LETTER.getWidth(), 90);
                cs.fill();

                // Name
                cs.setNonStrokingColor(255, 255, 255);
                cs.setFont(PDType1Font.HELVETICA_BOLD, 26);
                cs.beginText(); cs.newLineAtOffset(40, PDRectangle.LETTER.getHeight() - 55); cs.showText("Alex Morgan"); cs.endText();

                float y = PDRectangle.LETTER.getHeight() - 120;
                cs.setNonStrokingColor(0,0,0);
                cs.setFont(PDType1Font.HELVETICA, 12);
                // Fake icon bullets as circles
                drawCircle(cs, 40, y + 3, 3); writeLine(cs, 50, y, "UX Designer with 6+ years in SaaS."); y -= 18;
                drawCircle(cs, 40, y + 3, 3); writeLine(cs, 50, y, "Skills: Figma, Prototyping, Accessibility, React, HTML/CSS"); y -= 18;
                drawCircle(cs, 40, y + 3, 3); writeLine(cs, 50, y, "Experience: BrightApps — Lead Designer (2021–Now)"); y -= 18;
            }
            doc.save(out);
            try (FileOutputStream fos = new FileOutputStream(target.toFile())) { fos.write(out.toByteArray()); }
        }
    }

    private void buildClassicDocx(Path target) throws IOException {
        try (XWPFDocument doc = new XWPFDocument(); FileOutputStream fos = new FileOutputStream(target.toFile())) {
            XWPFParagraph h = doc.createParagraph(); h.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun rh = h.createRun(); rh.setBold(true); rh.setFontSize(20); rh.setText("Classic ATS Resume — Richard Sanchez");

            XWPFParagraph p = doc.createParagraph();
            XWPFRun r = p.createRun(); r.setText("Contact: richard@sample.com | (555) 555-2222");

            p = doc.createParagraph(); r = p.createRun(); r.setBold(true); r.setText("Skills:");
            p = doc.createParagraph(); r = p.createRun(); r.setText("Java, Spring, SQL, Git, REST APIs");

            p = doc.createParagraph(); r = p.createRun(); r.setBold(true); r.setText("Experience:");
            p = doc.createParagraph(); r = p.createRun(); r.setText("Company A — Backend Engineer (2021–Now)");

            doc.write(fos);
        }
    }

    private void buildCreativeDocx(Path target) throws IOException {
        try (XWPFDocument doc = new XWPFDocument(); FileOutputStream fos = new FileOutputStream(target.toFile())) {
            XWPFParagraph h = doc.createParagraph(); h.setAlignment(ParagraphAlignment.LEFT);
            XWPFRun rh = h.createRun(); rh.setColor("2ecc71"); rh.setBold(true); rh.setFontSize(22); rh.setText("Creative Resume — Olivia Wilson");

            XWPFParagraph p = doc.createParagraph();
            XWPFRun r = p.createRun(); r.setItalic(true); r.setText("Portfolio: https://example.com/olivia");

            p = doc.createParagraph(); r = p.createRun(); r.setBold(true); r.setText("Highlights:");
            p = doc.createParagraph(); r = p.createRun(); r.setText("• Led redesign that increased conversion by 18%\n• Mentored 3 designers");

            doc.write(fos);
        }
    }

    private void writeJsonResume(Path target) throws IOException {
        String json = """
        {
          "basics": {"name": "Isabel Mercado", "email": "isabel@example.com"},
          "skills": [{"name": "Frontend", "keywords": ["React","TypeScript","CSS"]}],
          "work": [{"name": "Tech Co", "position": "Frontend Engineer", "startDate": "2022-01-01"}],
          "education": [{"institution": "State University", "area": "CS", "studyType": "BSc"}]
        }
        """;
        Files.writeString(target, json, StandardCharsets.UTF_8);
    }

    private void writeLine(PDPageContentStream cs, float x, float y, String text) throws IOException {
        cs.beginText(); cs.newLineAtOffset(x, y); cs.showText(text); cs.endText();
    }

    private void drawCircle(PDPageContentStream cs, float cx, float cy, float r) throws IOException {
        // Approximate a circle using a filled rectangle with rounded corners not available; draw small square as dot
        cs.addRect(cx - r, cy - r, r * 2, r * 2); cs.fill();
    }
}


