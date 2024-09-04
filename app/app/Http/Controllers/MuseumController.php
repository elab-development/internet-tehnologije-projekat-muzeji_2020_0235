<?php

namespace App\Http\Controllers;

use App\Models\Museum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class MuseumController extends Controller
{
    // Prikaz svih muzeja
    public function index()
    {
        $museums = Museum::all();
        return response()->json($museums, 200);
    }

    // Prikaz jednog muzeja
    public function show($id)
    {
        $museum = Museum::findOrFail($id);
        return response()->json($museum, 200);
    }

    // Kreiranje novog muzeja
    public function store(Request $request)
    {
        // Validacija polja
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:umetnost,istorijski,naučni,savremeni,vojni',
            'location' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'three_d_view_url' => 'nullable|url',
            'ticket_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje muzeja sa podacima o korisniku
        $museum = Museum::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'type' => $request->input('type'),
            'location' => $request->input('location'),
            'image_url' => $request->input('image_url'),
            'three_d_view_url' => $request->input('three_d_view_url'),
            'ticket_price' => $request->input('ticket_price'),
            'user_id' => Auth::id(),  // Koristi ID ulogovanog korisnika
        ]);

        return response()->json($museum, 201);
    }

    // Ažuriranje muzeja
    public function update(Request $request, $id)
    {
        // Pronalaženje muzeja
        $museum = Museum::findOrFail($id);

        // Validacija polja
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:umetnost,istorijski,naučni,savremeni,vojni',
            'location' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'three_d_view_url' => 'nullable|url',
            'ticket_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Ažuriranje muzeja
        $museum->update($request->all());

        return response()->json($museum, 200);
    }

    // Brisanje muzeja
    public function destroy($id)
    {
        // Pronalaženje muzeja
        $museum = Museum::findOrFail($id);

        // Brisanje muzeja
        $museum->delete();

        return response()->json(['message' => 'Museum deleted successfully'], 200);
    }
}
