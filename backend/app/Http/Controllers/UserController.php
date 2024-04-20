<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();

        if($user->facebook_id && !$user->email && !$user->firstname && !$user->lastname) {
            $user['is_facebook_registered'] = true;
        }

        return $user;
    }

    public function updateUser(Request $request) {
        $user = $request->user();
        $request->validate([
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,'. $user->id],
        ]);

        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email ;

        $user->save();

        return response()->json(['message' => 'User Updated Successfully']);
    }
}
