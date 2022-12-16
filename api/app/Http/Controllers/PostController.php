<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function getPost($id){
        $post = Post::where("id", $id)->first();
        return response()->json([
            "post"=>$post
        ]);
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

    function getUserPosts($id){
        $posts = Post::where("user_id", $id)->get();
        return response()->json([
            "posts"=>$posts
        ]);
    }

    function addComment($id){
        $post = Post::where("id", $id)->first();
        $com = $post->comment_count;
        $com++;
        $post->update(["comment_count"=> $com]);
        return response()->json([
            "posts"=>$com
        ]);
    }

    function deletePosts(Request $request){
        Like::where("post_id", $request->post_id)->delete();
        Comment::where("post_id", $request->post_id)->delete();
        Post::where("id", $request->post_id)->delete();
    }
    
    function getAll(){
        $posts = Post::all();
        return response()->json([
            $posts
        ]);
    }

    function followingsPosts(){
        $user = Auth::user();

        $posts = DB::table("posts")
            ->join("follows", "user_followed", "=", "posts.user_id")
            ->where("user_following", $user["id"])
            ->select("posts.*")
            ->get();
        return response()->json([
            "posts"=>$posts
        ]);
    }
}