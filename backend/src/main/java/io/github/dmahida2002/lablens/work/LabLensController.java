package io.github.dmahida2002.lablens.work;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.dmahida2002.lablens.appuser.ApprovedUserResponse;

@RestController
@RequestMapping("/api")
public class LabLensController {

    private final LabLensService labLensService;

    /**
     * Constructor to recieve injected services dependencies
     * @param labLensService
     */
    public LabLensController(LabLensService labLensService) {
        this.labLensService = labLensService;
    }

    /**
     * Endpoint to retrieve all active uses. Service by getApprovedUsers
     * @return
     */
    @GetMapping("/users")
    public List<ApprovedUserResponse> getApprovedUsers() {
        return labLensService.getApprovedUsers();
    }

    /**
     * Get a list of all work for a inputted ID
     * @param appUserId
     * @return
     */
    @GetMapping("/work/{appUserId}")
    public List<WorkItemResponse> getWorkForUser(
            @PathVariable Long appUserId) {

        return labLensService.getWorkForUser(appUserId);
    }
}
