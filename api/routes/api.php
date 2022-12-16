<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
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
        route::get("/{id}",[UserController::class,"getUserById"]);

        route::group(["prefix"=>"edit"], function(){
            route::post("profile", [UserController::class, "editProfile"]);
            route::post("password", [UserController::class, "editPassword"]);
        }); 
    });
    route::group(["prefix"=>"post"], function(){
        route::get("/{id}", [PostController::class, "getPost"]);
        route::post("share", [PostController::class, "sharePost"]);
        route::get("user/{id}", [PostController::class, "getUserPosts"]);
        route::post("delete", [PostController::class, "deletePosts"]);
        route::get("comment/{id}", [PostController::class, "addComment"]);
        route::get("likes/{id}", [PostController::class, "addComment"]);
    });

    route::group(["prefix"=>"comment"], function(){
        route::post("share", [CommentController::class, "shareComment"]);
        route::get("/{id}", [CommentController::class, "getAll"]);
    });

    route::group(["prefix"=>"like"], function(){
        route::get("/", [LikeController::class, "getLikes"]);
        route::post("add", [LikeController::class, "modifyLike"]);
    });
});