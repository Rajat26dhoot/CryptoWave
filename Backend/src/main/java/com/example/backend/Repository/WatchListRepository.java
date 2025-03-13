package com.example.backend.Repository;

import com.example.backend.Model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    WatchList findByUserId(Long userId);
}
