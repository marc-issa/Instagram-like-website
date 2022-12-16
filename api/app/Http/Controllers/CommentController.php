<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CommentController extends Controller
{   
    public function __construct(){
        $this->middleware('auth:api');
    }

    function shareComment(Request $request){
        $comment = new Comment();
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->comment = $request->comment;

        if($comment->save()){
            return response()->json([
                "status"=>"success"
            ]);
        }else{
            return response()->json([
                "status"=>"error"
            ]);
        }
    }

    function getAll($id){
        $comments = DB::table("users")
                    ->join("comments", "user_id", "=", "users.id")
                    ->where("post_id", $id)
                    ->select("users.*", "comments.comment")
                    ->get();
                    
        return response()->json([
            "comments"=>$comments
        ]);  
    }
}