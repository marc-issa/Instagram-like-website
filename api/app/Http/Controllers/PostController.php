<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function sharePost(Request $request){
        $curr_user = Auth::user();
        $post = new Post();

        $post->user_id = $curr_user["id"];
        $post->img_url = $request->img_url;
        
        if($request->caption){
            $post->caption = $request->caption;
        }else{
            $post->caption = "empty";
        }

        $post->likes_count = 0;
        $post->comment_count = 0;

        if($post->save()){
            return response()->json([
                "status"=>"success"
            ]);
        }else{
            return response()->json([
                "status"=>"error"
            ], 401);
        }
    }
}