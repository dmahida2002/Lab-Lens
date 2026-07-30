package io.github.dmahida2002.lablens.appuser;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This repo will be used to help access and perform operations on the table.
 * AppUserRepository
 */
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    /**
     * Given that we have an interface, we can use findByACtiveTrue() to help  filter by active memebers.
     * @return
     */
    List<AppUser> findByActiveTrue();
}