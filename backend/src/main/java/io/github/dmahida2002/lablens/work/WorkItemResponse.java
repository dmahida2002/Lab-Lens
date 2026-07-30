package io.github.dmahida2002.lablens.work;

public record WorkItemResponse(
        String testName,
        String sampleName,
        String analystDueDate,
        String status,
        String tat,
        String queueStatus
) {
}