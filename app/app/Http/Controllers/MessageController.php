<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // Prikaz svih poruka (index)
    public function index()
    {
        $messages = Message::all();
        return response()->json($messages, 200);
    }

    // Prikaz jedne poruke (show)
    public function show($id)
    {
        $message = Message::findOrFail($id);
        return response()->json($message, 200);
    }

    // Kreiranje nove poruke (store)
    public function store(Request $request)
    {
        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'museum_id' => 'required|exists:museums,id',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje nove poruke
        $message = Message::create([
            'user_id' => Auth::id(),  // Koristi ID ulogovanog korisnika
            'museum_id' => $request->input('museum_id'),
            'content' => $request->input('content'),
        ]);

        return response()->json($message, 201);
    }

    // Ažuriranje postojeće poruke (update)
    public function update(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'museum_id' => 'required|exists:museums,id',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Ažuriranje poruke
        $message->update($request->all());

        return response()->json($message, 200);
    }

    // Brisanje poruke (destroy)
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
}
