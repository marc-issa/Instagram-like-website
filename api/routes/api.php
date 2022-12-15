<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

route::group(["prefix"=>"v0.1"], function(){
    route::group(["prefix"=>"user"], function(){
        route::post("login", [AuthController::class, "login"]);
        route::post("register", [AuthController::class, "register"]);
        route::post("logout", [AuthController::class, "logout"]);
        route::post("refresh", [AuthController::class, "logout"]);
    });
});