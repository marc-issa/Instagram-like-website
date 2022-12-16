<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function modifyLike(Request $request, $get=0){
        $user = Auth::user();
        $post_id = $request->post_id;

        $likes_val = Like::where("user_id", $user["id"])->where("post_id", $post_id)->first();

        if($get!=0){
            return response()->json([
                "likes_val" => $likes_val
            ]);
        }else{
            $post = Post::where("id", $post_id)->first();

            if($likes_val){
                $likes = Like::where("user_id", $user["id"])->where("post_id", $post_id)->first();

                if($likes->delete()){
                    $likes_count = $post["likes_count"]-1;
                    $post->update(["likes_count"=>$likes_count]);
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
                $like->post_id = $post_id;
                if($like->save()){
                    $likes_count = $post["likes_count"]+1;
                    $post->update(["likes_count"=>$likes_count]);

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
}