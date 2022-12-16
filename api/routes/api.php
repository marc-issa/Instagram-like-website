<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

route::group(["prefix"=>"v0.1"], function(){
    route::group(["prefix"=>"user"], function(){
        route::post("login", [AuthController::class, "login"]);
        route::post("register", [AuthController::class, "register"]);
        route::get("logout", [AuthController::class, "logout"]);
        route::get("refresh", [AuthController::class, "logout"]);

        route::get("/",[UserController::class,"getUser"]);

        route::group(["prefix"=>"edit"], function(){
            route::post("profile", [UserController::class, "editProfile"]);
            route::post("password", [UserController::class, "editPassword"]);
        }); 
    });
    route::group(["prefix"=>"post"], function(){
        route::post("share", [PostController::class, "sharePost"]);
    });
});