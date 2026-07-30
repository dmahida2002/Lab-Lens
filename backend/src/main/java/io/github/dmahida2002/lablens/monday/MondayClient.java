package io.github.dmahida2002.lablens.monday;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import io.github.dmahida2002.lablens.work.WorkItemResponse;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Component
public class MondayClient {

    private final ObjectMapper objectMapper;

    private final RestClient restClient;
    private final String apiToken;
    private final String boardId;
    private final String assigneeColumnId;
    private final String sampleNameColumnId;
    private final String analystDueColumnId;
    private final String statusColumnId;
    private final String tatColumnId;
    private final String queueStatusColumnId;

    public MondayClient(
            ObjectMapper objectMapper,
            @Value("${lablens.monday.api-token}") String apiToken,
            @Value("${lablens.monday.board-id}") String boardId,
            @Value("${lablens.monday.assignee-column-id}") String assigneeColumnId,
            @Value("${lablens.monday.sample-name-column-id}") String sampleNameColumnId,
            @Value("${lablens.monday.analyst-due-column-id}") String analystDueColumnId,
            @Value("${lablens.monday.status-column-id}") String statusColumnId,
            @Value("${lablens.monday.tat-column-id}") String tatColumnId,
            @Value("${lablens.monday.queue-status-column-id}") String queueStatusColumnId) {

        this.objectMapper = objectMapper;
        this.restClient = RestClient.create();
        this.apiToken = apiToken;
        this.boardId = boardId;
        this.assigneeColumnId = assigneeColumnId;
        this.sampleNameColumnId = sampleNameColumnId;
        this.analystDueColumnId = analystDueColumnId;
        this.statusColumnId = statusColumnId;
        this.tatColumnId = tatColumnId;
        this.queueStatusColumnId = queueStatusColumnId;
    }

    public String getRawWorkForPerson(String mondayPersonId) {
        String query = """
                query {
                  items_page_by_column_values(
                    board_id: %s
                    columns: [
                      {
                        column_id: "%s"
                        column_values: ["%s"]
                      }
                    ]
                    limit: 500
                  ) {
                    items {
                      id
                      name
                      column_values(
                        ids: ["%s", "%s", "%s", "%s", "%s"]
                      ) {
                        id
                        text
                      }
                    }
                  }
                }
                """.formatted(
                boardId,
                assigneeColumnId,
                mondayPersonId,
                sampleNameColumnId,
                analystDueColumnId,
                statusColumnId,
                tatColumnId,
                queueStatusColumnId
        );

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("query", query);

        String response = restClient.post()
                .uri("https://api.monday.com/v2")
                .header(HttpHeaders.AUTHORIZATION, apiToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(String.class);

        return response;
    }

    /**
     * Get all of the work the person needs to view
     * @param mondayPersonId
     * @return
     */
    public List<WorkItemResponse> getWorkForPerson(String mondayPersonId) {

        String rawResponse = getRawWorkForPerson(mondayPersonId);

        List<WorkItemResponse> workItems = new ArrayList<>();

        try {
            
          JsonNode root = objectMapper.readTree(rawResponse);

            JsonNode items = root
                    .path("data")
                    .path("items_page_by_column_values")
                    .path("items");

            for (JsonNode item : items) {
                
                String testName = item.path("name").asText();

                String sampleName = null;
                String analystDueDate = null;
                String status = null;
                String tat = null;
                String queueStatus = null;

                JsonNode columnValues = item.path("column_values");

                for (JsonNode columnValue : columnValues) {
                    
                  String columnId = columnValue.path("id").asText();

                    JsonNode textNode = columnValue.get("text");
                    
                    String text = null;

                    if (textNode != null && !textNode.isNull()) text = textNode.asText();

                    // TODO:
                    // Compare columnId with each configured column ID.
                    // Assign text to the matching variable.
                    //
                    // Use ordinary if / else-if statements.

                    if (columnId.equals(sampleNameColumnId)) {
                      sampleName = text;
                  } else if (columnId.equals(analystDueColumnId)) {
                      analystDueDate = text;
                  } else if (columnId.equals(statusColumnId)) {
                      status = text;
                  } else if (columnId.equals(tatColumnId)) {
                      tat = text;
                  } else if (columnId.equals(queueStatusColumnId)) {
                      queueStatus = text;
                  }
                }

                // TODO:
                // Create a WorkItemResponse with all six variables.
                // Add it to workItems.

                workItems.add(new WorkItemResponse(testName, sampleName, analystDueDate, status, tat, queueStatus));
            }
        } catch (JacksonException exception) {
            throw new IllegalStateException(
                    "Unable to read the monday response.",
                    exception
            );
        }

        return workItems;
    }
}
