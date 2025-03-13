package com.example.backend.Service;

import com.example.backend.Model.Coin;
import com.example.backend.Model.User;
import com.example.backend.Model.WatchList;

public interface WatchListService {

    WatchList findUserWatchList(Long userId) throws Exception;

    WatchList createWatchList(User user);

    WatchList findById(Long id) throws Exception;

    Coin addItemToWatchList(User user, Coin coin) throws Exception;
}
