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
        $email_val = User::where("email", $request->email)->first();
    }

    function getUser(){
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }
}