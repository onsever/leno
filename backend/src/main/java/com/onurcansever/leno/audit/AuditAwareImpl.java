package com.onurcansever.leno.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Implementation of the AuditorAware interface for auditing purposes.
 * <p>
 * This class provides the current authenticated user's name to be used as the auditor
 * when tracking auditing information such as creation and modification of entities.
 *
 * @since 1.0
 */
@Component(value = "auditAwareImpl")
public final class AuditAwareImpl implements AuditorAware<String> {

    /**
     * Retrieves the current authenticated user's name as the auditor.
     *
     * @return An optional containing the name of the current auditor, or empty if not authenticated.
     * @since 1.0
     */
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
