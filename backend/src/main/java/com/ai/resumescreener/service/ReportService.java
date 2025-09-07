package com.ai.resumescreener.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ReportService {
    public byte[] buildMatchReport(String candidateName, double score, List<String> matched, List<String> missing) throws IOException {
        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PDPage page = new PDPage(PDRectangle.LETTER);
            doc.addPage(page);
            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                float y = PDRectangle.LETTER.getHeight() - 50;

                cs.setFont(PDType1Font.HELVETICA_BOLD, 18);
                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText("Resume Match Report");
                cs.endText();
                y -= 30;

                cs.setFont(PDType1Font.HELVETICA, 12);
                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText("Candidate: " + (candidateName == null ? "Unknown" : candidateName));
                cs.endText();
                y -= 18;

                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText(String.format("Score: %.1f%%", score));
                cs.endText();
                y -= 24;

                y = writeList(cs, "Matched Skills", matched, y);
                y = writeList(cs, "Missing Skills", missing, y);
            }
            doc.save(out);
            return out.toByteArray();
        }
    }

    private float writeList(PDPageContentStream cs, String title, List<String> items, float y) throws IOException {
        cs.setFont(PDType1Font.HELVETICA_BOLD, 14);
        cs.beginText();
        cs.newLineAtOffset(50, y);
        cs.showText(title + ":");
        cs.endText();
        y -= 18;

        cs.setFont(PDType1Font.HELVETICA, 12);
        if (items == null || items.isEmpty()) {
            cs.beginText();
            cs.newLineAtOffset(60, y);
            cs.showText("- None");
            cs.endText();
            y -= 16;
        } else {
            for (String item : items) {
                cs.beginText();
                cs.newLineAtOffset(60, y);
                cs.showText("- " + item);
                cs.endText();
                y -= 16;
            }
        }
        y -= 10;
        return y;
    }
}


