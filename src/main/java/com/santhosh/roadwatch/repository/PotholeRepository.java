package com.santhosh.roadwatch.repository;

import com.santhosh.roadwatch.entity.Pothole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PotholeRepository extends JpaRepository<Pothole, Long> {

    List<Pothole> findByStatus(String status);

    List<Pothole> findAllByOrderByVotesDesc();

}