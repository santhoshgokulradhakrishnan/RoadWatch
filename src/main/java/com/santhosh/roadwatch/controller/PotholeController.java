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

    @GetMapping("/{id}")
    public Pothole getPotholeById(@PathVariable Long id) {

        return potholeRepository.findById(id).orElse(null);

    }

    @DeleteMapping("/{id}")
    public String deletePothole(@PathVariable Long id) {

        potholeRepository.deleteById(id);

        return "Pothole deleted successfully";

    }

    @PutMapping("/{id}")
    public Pothole updatePothole(
            @PathVariable Long id,
            @RequestBody Pothole updatedPothole) {

        Pothole pothole = potholeRepository.findById(id).orElse(null);

        if (pothole == null) {
            return null;
        }

        pothole.setDescription(updatedPothole.getDescription());
        pothole.setRoadName(updatedPothole.getRoadName());
        pothole.setSeverity(updatedPothole.getSeverity());
        pothole.setStatus(updatedPothole.getStatus());

        return potholeRepository.save(pothole);
    }

    @PutMapping("/{id}/status")
    public Pothole updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Pothole pothole =
                potholeRepository.findById(id).orElse(null);

        if(pothole == null){
            return null;
        }

        pothole.setStatus(status);

        return potholeRepository.save(pothole);
    }

    @GetMapping("/status/{status}")
    public List<Pothole> getPotholesByStatus(
            @PathVariable String status) {

        return potholeRepository.findByStatus(status);
    }

    @PutMapping("/{id}/vote")
    public Pothole votePothole(@PathVariable Long id) {

        Pothole pothole =
                potholeRepository.findById(id).orElseThrow();

        pothole.setVotes(pothole.getVotes() + 1);

        return potholeRepository.save(pothole);
    }

    @GetMapping("/top")
    public List<Pothole> getTopPotholes() {
        return potholeRepository.findAllByOrderByVotesDesc();
    }

}