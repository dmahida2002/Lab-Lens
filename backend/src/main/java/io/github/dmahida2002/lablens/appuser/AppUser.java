package io.github.dmahida2002.lablens.appuser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "display_name", length = 100, nullable = false)
    private String displayName;

    
    @Column(name = "monday_person_id", length = 30, nullable = false)
    private String mondayPersonId;

    
    @Column(nullable = false)
    private boolean active;

    /**
     * Empty Constructor
     */
    protected AppUser() {
    }

    /**
     * Constructor to be filled with table column details.
     * @param displayName
     * @param mondayPersonId
     * @param active
     */
    public AppUser(String displayName, String mondayPersonId, boolean active) {
        this.displayName = displayName;
        this.mondayPersonId = mondayPersonId;
        this.active = active;
    }

    /**
     * Getter to return row id
     * @return
     */
    public Long getId() {
        return id;
    }

    /**
     * Getter to return display name
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * Gettter to return monday.com id of the given user
     * @return
     */
    public String getMondayPersonId() {
        return mondayPersonId;
    }

    /**
     * Verify is the user is active.
     * @return
     */
    public boolean isActive() {
        return active;
    }
}