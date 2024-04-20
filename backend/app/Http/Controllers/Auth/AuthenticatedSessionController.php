<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {

        $user = User::where('email', $request->email)->first();

        if(isset($user) && !$user->hasPassword()) {
            return response()->json([
                "message" => "The email associated with your account is also linked with other login method"
            ],404);
        }

        $request->authenticate();

        $token = $request->user()->createToken('auth');
        $user = $request->user();

        return response()->json([
            "user" => $user,
            'access_token' => $token->plainTextToken
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $user = Auth::user();

        $user->tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }

    public function logout(Request $request)
    {
        $user = $request->user()->tokens()-delete();

        return response()->json([
            "user" => $user
        ]);
    }
}
