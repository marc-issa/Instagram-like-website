<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    function createRoom(Request $request){
        $user = Auth::user();
        $user2 = $request->user2;

        $room_val1 = Room::where("user1_id", $user["id"])->where("user2_id", $user2)->first();
        $room_val2 = Room::where("user2_id", $user["id"])->where("user1_id", $user2)->first();

        if($room_val1){
            return response()->json([
                "room"=>$room_val1
            ]);
        }
        if($room_val2){
            return response()->json([
                "room"=>$room_val1
            ]);
        }

        $room = new Room();
        $room->user1_id = $user["id"];
        $room->user2_id = $user2;

        if($room->save()){
            return response()->json([
                "room"=>$room
            ]);
        }
    }

    function getAllRooms(){
        $user = Auth::user();
        $room_val = Room::where("user1_id", $user["id"])->orWhere("user2_id", $user["id"])->get();
        return response()->json([
            "room"=>$room_val
        ]);
    }

    function getRoom(Request $request){
        $room = Room::where("id", $request->room_id)->first();
        return response()->json([
            "room"=>$room
        ]);
    }
}