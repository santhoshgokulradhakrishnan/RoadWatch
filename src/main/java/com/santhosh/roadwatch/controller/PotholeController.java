package com.santhosh.roadwatch.controller;

import com.santhosh.roadwatch.entity.Pothole;
import com.santhosh.roadwatch.repository.PotholeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/potholes")
public class PotholeController {

    @Autowired
    private PotholeRepository potholeRepository;

    @PostMapping
    public Pothole createPothole(@RequestBody Pothole pothole) {

        pothole.setStatus("REPORTED");

        return potholeRepository.save(pothole);
    }

    @GetMapping
    public List<Pothole> getAllPotholes() {
        return potholeRepository.findAll();
    }

}