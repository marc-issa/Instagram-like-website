<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
}
