package com.example.backend.Model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchListCoinId implements Serializable {
    private Long watchListId;
    private String coinId;
}
