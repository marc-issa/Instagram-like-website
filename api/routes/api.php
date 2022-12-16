<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoomController;
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
        route::get("search/{username}",[UserController::class,"getByUsername"]);

        route::group(["prefix"=>"edit"], function(){
            route::post("profile", [UserController::class, "editProfile"]);
            route::post("password", [UserController::class, "editPassword"]);
        }); 
    });
    route::group(["prefix"=>"post"], function(){
        route::get("/following", [PostController::class, "followingsPosts"]);
        route::get("/", [PostController::class, "getAll"]);
        route::post("share", [PostController::class, "sharePost"]);
        route::get("user/{id}", [PostController::class, "getUserPosts"]);
        route::post("delete", [PostController::class, "deletePosts"]);
        route::get("comment/{id}", [PostController::class, "addComment"]);
        route::get("likes/{id}", [PostController::class, "addComment"]);
        route::get("/{id}", [PostController::class, "getPost"]);
    });

    route::group(["prefix"=>"comment"], function(){
        route::post("share", [CommentController::class, "shareComment"]);
        route::get("/{id}", [CommentController::class, "getAll"]);
    });

    route::group(["prefix"=>"like"], function(){
        route::post("/{get?}", [LikeController::class, "modifyLike"]);
    });
    
    route::post("/follow", [FollowController::class, "modifyFollow"]);
    route::get("/follow/{id}", [FollowController::class, "countFollow"]);

    route::post("/block", [BlockController::class, "modifyBlock"]);

    route::group(["prefix"=>"chat"], function(){
        route::post("/create",[RoomController::class, "createRoom"]);
        route::get("/",[RoomController::class, "getAllRooms"]);
        route::post("/getRoom",[RoomController::class, "getRoom"]);
        route::post("/messages/add", [ChatController::class, "sendMessages"]);
        route::get("/messages/get/{id}", [ChatController::class, "getMessages"]);
    });
});