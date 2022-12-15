<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request){

        if($request->username!=null){
            $username_val = User::where("username", $request->username)->first();

            if($username_val!=null){
                $credentials = $request->only('username', 'password');
    
                $token = Auth::attempt($credentials);
                if (!$token) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Unauthorized',
                    ], 401);
                }
    
                $user = Auth::user();
                return response()->json([
                        'status' => 'success',
                        'user' => $user,
                        'authorisation' => [
                            'token' => $token,
                            'type' => 'bearer',
                        ]
                    ]);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }
        }else{
            $email = User::where("email", $request->email)->first();

            if($email!=null){
                $credentials = $request->only('email', 'password');
    
                $token = Auth::attempt($credentials);
                if (!$token) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Unauthorized',
                    ], 401);
                }
    
                $user = Auth::user();
                return response()->json([
                        'status' => 'success',
                        'user' => $user,
                        'authorisation' => [
                            'token' => $token,
                            'type' => 'bearer',
                        ]
                    ]);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }
        }
        

    }

    public function register(Request $request){
        $username_val = User::where("username", $request->username)->first();
        $email_val = User::where("email", $request->email)->first();

        if($username_val!=null){
            return response()->json([
                'status' => 'error',
                'message' => 'username-exists',
            ], 401);
        }else if($email_val!=null){
            return response()->json([
                'status' => 'error',
                'message' => 'email-exists',
            ], 401);
        }else{
            $user = User::create([
                'username' => $request->username,
                'full_name' => $request->full_name,
                'name' => $request->name,
                'bio' => $request->bio,
                'email' => $request->email,
                'gender' => $request->gender,
                'profile_img'=>$request->profile_img,
                'password' => Hash::make($request->password),
            ]);

            $token = Auth::login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => "hello world",
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}