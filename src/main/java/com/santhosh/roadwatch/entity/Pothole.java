package com.santhosh.roadwatch.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Pothole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roadName;

    private String description;

    private Double latitude;

    private Double longitude;

    private String severity;

    private String status;
}