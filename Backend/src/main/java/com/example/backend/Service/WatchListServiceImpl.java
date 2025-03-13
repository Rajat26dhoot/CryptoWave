package com.example.backend.Service;

import com.example.backend.Model.Coin;
import com.example.backend.Model.User;
import com.example.backend.Model.WatchList;
import com.example.backend.Repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList watchList = watchListRepository.findByUserId(userId);
        if (watchList == null) {

            throw new Exception("WatchList Not Found");
        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList = new WatchList();
        watchList.setUser(user);

        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> watchListOptional = watchListRepository.findById(id);
        if(watchListOptional.isEmpty()) {
            throw new Exception("WatchList not FOund");
        }
        return watchListOptional.get();
    }

    @Override
    public Coin addItemToWatchList(User user, Coin coin) throws Exception {
        WatchList watchList=findUserWatchList(user.getId());
        if(watchList.getCoins().contains(coin)) {
            watchList.getCoins().remove(coin);
        }else{
            watchList.getCoins().add(coin);
        }
        watchListRepository.save(watchList);
        return coin;
    }
}
