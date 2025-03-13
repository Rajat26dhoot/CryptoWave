package com.example.backend.Controller;


import com.example.backend.Model.Asset;
import com.example.backend.Model.User;
import com.example.backend.Service.AssetService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;


    @GetMapping("{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception {
        Asset asset=assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }


    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserProfileByJWT(jwt);
        Asset asset=assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
        return ResponseEntity.ok().body(asset);
    }


    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser(@RequestHeader("Authroization") String jwt)throws Exception {
        User user=userService.findUserProfileByJWT(jwt);
        List<Asset> assets=assetService.getUserAssets(user.getId());
        return ResponseEntity.ok().body(assets);

    }

}
