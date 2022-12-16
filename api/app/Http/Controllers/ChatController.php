<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function getMessages($id){
        $messages = Chat::where("room_id", $id)->get();
        return response()->json([
            "messages"=> $messages
        ]);
    }

    function sendMessages(Request $request){
        $user = Auth::user();

        $chat = new Chat();
        $chat->room_id = $request->room_id;
        $chat->sender_id = $user["id"];
        $chat->message = $request->message;

        $chat->save();
    }
}