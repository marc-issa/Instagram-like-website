<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function editProfile(Request $request){
        $user_token = Auth::user();

        if($request->username){
            $username_val = User::where("username", $request->username)->first();
            if($username_val!=null){
                return response()->json([
                    'status' => 'error',
                    'message' => 'username-exists',
                ], 401);
            }else{
                $user = User::where("username",$user_token["username"]);
                $user->update(["username"=>$request->username]);
            }
        }

        if($request->email){
            $email_val = User::where("email", $request->email)->first();
            if($email_val!=null){
                return response()->json([
                    'status' => 'error',
                    'message' => 'email-exists',
                ], 401);
            }else{
                $user = User::where("email",$user_token["email"]);
                $user->update(["email"=>$request->email]);
            }
        }

        if($request->name){
            $user = User::where("id",$user_token["id"]);
            $user->update(["name"=>$request->name]);
        }

        if($request->bio){
            $user = User::where("id",$user_token["id"]);
            $user->update(["bio"=>$request->bio]);
        }

        if($request->gender){
            $user = User::where("id",$user_token["id"]);
            $user->update(["gender"=>$request->gender]);
        }

        if($request->gender){
            $user = User::where("id",$user_token["id"]);
            $user->update(["gender"=>$request->gender]);
        }

        if($request->profile_img){
            $user = User::where("id",$user_token["id"]);
            $user->update(["profile_img"=>$request->profile_img]);
        }
        
    }

    function getUser(){
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }
}