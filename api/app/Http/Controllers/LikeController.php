<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    function getLikes(){
        $likes = DB::table("users")
                ->join("likes", "user_id", "=", "users.id")
                ->select("post_id")
                ->get();
                
        return response()->json([
            "likes"=>$likes
        ]);
    }

    function modifyLike(Request $request){
        $user = Auth::user();
        $post = $request->post_id;

        $likes_val = Like::where("user_id", $user["id"])->where("post_id", $post)->first();
        if($likes_val){
            $likes = Like::where("user_id", $user["id"])->where("post_id", $post)->first();
            if($likes->delete()){
                return response()->json([
                    "status"=>"success",
                    "message"=>"like-remove"
                ]);
            }else{
                return response()->json([
                    "status"=>"error1",
                ]);
            }
        }else{
            $like = new Like();
            $like->user_id = $user["id"];
            $like->post_id = $post;
            if($like->save()){
                return response()->json([
                    "status"=>"success",
                ]);
            }else{
                return response()->json([
                    "status"=>"error",
                ]);
            }
        }
    }
}