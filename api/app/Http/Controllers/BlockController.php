<?php

namespace App\Http\Controllers;

use App\Models\Block;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function modifyBlock(Request $request){
        $user = Auth::user();
        $blocked = $request->user_blocked;

        $blocks = Block::where("user_blocking", $user["id"])->where("user_blocked", $blocked)->first();

        if($blocks!=null){
            if($request->get){
                return response()->json([
                    "resp"=>true
                ]);
            }
            
            Block::where("user_blocking", $user["id"])->where("user_blocked", $blocked)->delete();
            return response()->json([
                "resp"=>"block-removed"
            ]);
        }else{
            if($request->get){
                return response()->json([
                    "resp"=>false
                ]);
            }
            
            $block = new Block();
            $block->user_blocking = $user["id"];
            $block->user_blocked = $blocked;

            if($block->save()){
                return response()->json([
                    "resp"=>"block-added"
                ]);
            }
        }
    }
}