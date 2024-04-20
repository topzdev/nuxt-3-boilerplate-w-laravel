<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function oauthLogin(Request $request):JsonResponse
    {
        $request->validate([
            'provider' => ['required', 'string', 'max:255'],
            'access_token' => ['required', 'string'],
        ]);

        $access_token = $request->access_token;
        $provider = $request->provider;

        $user = [];
        $search = null;

        if($provider === 'google') {
            $googleUser = Socialite::driver('google')->userFromToken($access_token);

            $user = [

                'firstname' => $googleUser->user["given_name"],
                'lastname' => $googleUser->user["family_name"],
                'email' => $googleUser->user["email"],
                'google_id' => $googleUser->id
            ];

            $search = User::where('email', $user['email'])->first();
        }

        if($provider === 'facebook') {
            $facebookUser = Socialite::driver('facebook')->userFromToken($access_token);

            $user = [
                'facebook_id' => $facebookUser->id
            ];

            $search = User::where('facebook_id', $user['facebook_id'])->first();
        }


        if(!isset($search)) {
            $user = User::create($user);
        } else {
            if($provider === 'google') {
                $search->google_id = $user['google_id'];
            }
            if($provider === 'facebook') {
                $search->facebook_id = $user['facebook_id'];
            }

            $search->save();

            $user = $search;
        }

        Auth::login($user);

        return response()->json([
            "user" => $user,
            "access_token" => $user->createToken('auth')->plainTextToken,
            "provider" => $provider
        ]);
    }
}
