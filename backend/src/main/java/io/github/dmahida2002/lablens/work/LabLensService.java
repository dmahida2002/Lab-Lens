package io.github.dmahida2002.lablens.work;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.github.dmahida2002.lablens.appuser.AppUser;
import io.github.dmahida2002.lablens.appuser.AppUserRepository;
import io.github.dmahida2002.lablens.appuser.ApprovedUserResponse;
import io.github.dmahida2002.lablens.monday.MondayClient;

/**
 * This class is the service layer used to get details and information for the application.
 *
 * Current working services:
 * - getWorkForUser, which returns all work for the selected user
 * - getApprovedUsers, which returns the list of active users pulled from AppUserRepository
 */
@Service
public class LabLensService {

    /**
     * AppUserRepository object used to access and hold active users.
     */
    private final AppUserRepository appUserRepository;

    private final MondayClient mondayClient;

    /**
     * Constructor that receives the injected class dependencies.
     *
     * @param appUserRepository repository used to retrieve application users
     * @param mondayClient client used to retrieve configured monday.com assignments
     */
    public LabLensService(AppUserRepository appUserRepository, MondayClient mondayClient) {

        this.appUserRepository = appUserRepository;
        this.mondayClient = mondayClient;
    }

    public List<WorkItemResponse> getWorkForUser(Long appUserId) {

        Optional<AppUser> optionalAppUser = appUserRepository.findById(appUserId);

        if (optionalAppUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Approved user not found."
            );
        }

        AppUser appUser = optionalAppUser.get();

        if (!appUser.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Approved user not found."
            );
        }

        String mondayPersonId = appUser.getMondayPersonId();

        return mondayClient.getWorkForPerson(mondayPersonId);
    }

    /**
     * Declare an appUsers list assigned to all active users.
     *
     * Declare a response list of ApprovedUserResponse records that holds the
     * extracted ID and display name.
     *
     * Iterate through the entire appUsers list.
     *
     * Fill the response list with the extracted values.
     *
     * @return active users formatted for the API response
     */
    public List<ApprovedUserResponse> getApprovedUsers() {

        List<AppUser> appUsers = appUserRepository.findByActiveTrue();
        List<ApprovedUserResponse> responses = new ArrayList<>();

        for (int i = 0; i < appUsers.size(); i++) {

            responses.add(new ApprovedUserResponse(appUsers.get(i).getId(), appUsers.get(i).getDisplayName()));
        }

        return responses;
    }
}
