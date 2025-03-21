package com.example.backend.Controller;


import com.example.backend.Model.Coin;
import com.example.backend.Model.User;
import com.example.backend.Model.WatchList;
import com.example.backend.Service.CoinService;
import com.example.backend.Service.UserService;
import com.example.backend.Service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;
    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<WatchList> getUserWatchList(@RequestHeader("Authorization") String jwt
    ) throws Exception{
        User user=userService.findUserProfileByJWT(jwt);
        WatchList watchList=watchListService.findUserWatchList(user.getId());
        return ResponseEntity.ok(watchList);
    }

//    @PostMapping("/create")
//    public ResponseEntity<WatchList> createWatchList(
//            @RequestHeader("Authorization")String jwt)throws Exception{
//        User user=userService.findUserByJWT(jwt);
//        WatchList createdWatchList=watchListService.createWatchList(user);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdWatchList);
//    }

    @GetMapping("{watchListId}")
    public ResponseEntity<WatchList> getWatchListById(
            @PathVariable Long watchListId
    ) throws Exception{ 
        WatchList watchList=watchListService.findById(watchListId);
        return ResponseEntity.ok(watchList);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchList(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {
        System.out.println(coinId);
        User user = userService.findUserProfileByJWT(jwt);
        String res= coinService.getCoinDetails(coinId);
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchListService.addItemToWatchList(user,coin);
        return ResponseEntity.ok(addedCoin);
    }
}
