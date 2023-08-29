package com.onurcansever.leno.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Base class for entities with common auditing fields.
 * <p>
 * This class provides common auditing fields such as creation and modification timestamps,
 * as well as information about who created and last modified the entity.
 * It is intended to be extended by other entity classes.
 *
 * @since 1.0
 * @see AuditingEntityListener
 */
@Getter
@Setter
@MappedSuperclass
@EntityListeners(value = { AuditingEntityListener.class })
public abstract class BaseEntity {

    /**
     * Date and time when the entity was created.
     * <p>
     * This field represents the timestamp when the entity was initially created.
     *
     * @since 1.0
     */
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /**
     * Username of the user who created the entity.
     * <p>
     * This field holds the username of the user who created the entity.
     *
     * @since 1.0
     */
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    /**
     * Date and time when the entity was last modified.
     * <p>
     * This field represents the timestamp when the entity was last modified.
     *
     * @since 1.0
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    /**
     * Username of the user who last modified the entity.
     * <p>
     * This field holds the username of the user who last modified the entity.
     *
     * @since 1.0
     */
    @LastModifiedBy
    @Column(insertable = false)
    private String updatedBy;

}
