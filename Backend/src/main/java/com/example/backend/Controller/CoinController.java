package com.example.backend.Controller;


import com.example.backend.Model.Coin;
import com.example.backend.Service.CoinService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper mapper;

    @GetMapping
    public ResponseEntity<List<Coin>> getCoinList(@RequestParam(required = false, name = "page") Integer page) throws Exception {
        List<Coin> coins = coinService.getCoinList(page != null ? page : 0);
        return new ResponseEntity<>(coins, HttpStatus.OK);
    }



    @GetMapping("{coinId}/chart")
    ResponseEntity<JsonNode> getMarketChart(@PathVariable String coinId,
                                              @RequestParam("days") int days) throws Exception {
        String res=coinService.getMarketChart(coinId,days);
        JsonNode node=mapper.readTree(res);
        return new ResponseEntity<>(node, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws Exception {
        String coin=coinService.searchCoin(keyword);
        JsonNode node=mapper.readTree(coin);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/top50")
    ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception {
        String coin=coinService.getTop50CoinByMarketCapRank();
        JsonNode node=mapper.readTree(coin);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/trending")
    ResponseEntity<JsonNode> getTradingCoin() throws Exception {
        String coin=coinService.getTrendingCoins();
        JsonNode node=mapper.readTree(coin);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception {
        String coin=coinService.getCoinDetails(coinId);
        JsonNode node=mapper.readTree(coin);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }


}
