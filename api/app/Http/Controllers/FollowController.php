<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function modifyFollow(Request $request){
        $user = Auth::user();
        $followed = $request->user_followed;

        $follows = Follow::where("user_following", $user["id"])->where("user_followed", $followed)->first();

        if($follows!=null){
            if($request->get){
                return response()->json([
                    "resp"=>true
                ]);
            }
            
            Follow::where("user_following", $user["id"])->where("user_followed", $followed)->delete();
            return response()->json([
                "resp"=>"follow-removed"
            ]);
        }else{
            if($request->get){
                return response()->json([
                    "resp"=>false
                ]);
            }
            
            $follow = new Follow();
            $follow->user_following = $user["id"];
            $follow->user_followed = $followed;

            if($follow->save()){
                return response()->json([
                    "resp"=>"follow-added"
                ]);
            }
        }
    }

    function countFollow($id){
        $count_following = Follow::where("user_following", $id)->count();
        $count_followers = Follow::where("user_followed", $id)->count();
        return response()->json([
            "following"=>$count_following,
            "followers"=>$count_followers
        ]);
    }
}