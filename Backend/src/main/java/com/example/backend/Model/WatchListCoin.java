package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "watch_list_coins")
@Data
@NoArgsConstructor
public class WatchListCoin {

    @EmbeddedId
    private WatchListCoinId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("watchListId")
    @JoinColumn(name = "watch_list_id")
    @JsonIgnore
    private WatchList watchList;

    @ManyToOne
    @MapsId("coinId")
    @JoinColumn(name = "coins_id")
    private Coin coin;

    public WatchListCoin(WatchList watchList, Coin coin) {
        this.watchList = watchList;
        this.coin = coin;
        this.id = new WatchListCoinId(watchList.getId(), coin.getId());
    }
}
