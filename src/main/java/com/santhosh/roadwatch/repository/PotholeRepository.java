package com.santhosh.roadwatch.repository;

import com.santhosh.roadwatch.entity.Pothole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PotholeRepository
        extends JpaRepository<Pothole, Long> {
}