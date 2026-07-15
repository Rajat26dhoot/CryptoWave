package com.example.backend.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
public class WatchList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "watchList", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<WatchListCoin> coinEntries = new ArrayList<>();

    @Transient
    public List<Coin> getCoins() {
        return coinEntries.stream()
                .map(WatchListCoin::getCoin)
                .toList();
    }

    public boolean hasCoin(String coinId) {
        return coinEntries.stream()
                .map(WatchListCoin::getCoin)
                .filter(Objects::nonNull)
                .anyMatch(coin -> Objects.equals(coin.getId(), coinId));
    }

    public void addCoin(Coin coin) {
        if (!hasCoin(coin.getId())) {
            coinEntries.add(new WatchListCoin(this, coin));
        }
    }

    public void removeCoin(String coinId) {
        coinEntries.removeIf(entry ->
                entry.getCoin() != null && Objects.equals(entry.getCoin().getId(), coinId));
    }
}


