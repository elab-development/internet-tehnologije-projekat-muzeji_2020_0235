<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index()
    {
        // Dohvatanje svih rezervacija za ulogovanog korisnika, zajedno sa podacima o muzeju
        $reservations = Reservation::where('user_id', Auth::id())
                        ->with('museum') // Učitaj sve podatke o muzeju
                        ->get();
    
        // Prolazimo kroz sve rezervacije i dodajemo ukupan iznos u odgovor
        $reservationsWithTotalPrice = $reservations->map(function ($reservation) {
            $totalPrice = $reservation->num_tickets * $reservation->museum->ticket_price;
    
            return [
                'id' => $reservation->id,
                'museum' => $reservation->museum,
                'reservation_date' => $reservation->reservation_date,
                'num_tickets' => $reservation->num_tickets,
                'total_price' => $totalPrice,  // Dodajemo ukupnu cenu
            ];
        });
    
        return response()->json($reservationsWithTotalPrice, 200);
    }
    

    // Prikaz jedne rezervacije
    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return response()->json($reservation, 200);
    }

    // Kreiranje nove rezervacije
    public function store(Request $request)
    {
        // Validacija polja
        $validator = Validator::make($request->all(), [
            'museum_id' => 'required|exists:museums,id',
            'reservation_date' => 'required|date',
            'num_tickets' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje nove rezervacije
        $reservation = Reservation::create([
            'user_id' => Auth::id(),  // Koristi ID ulogovanog korisnika
            'museum_id' => $request->input('museum_id'),
            'reservation_date' => $request->input('reservation_date'),
            'num_tickets' => $request->input('num_tickets'),
        ]);

        return response()->json($reservation, 201);
    }

    // Ažuriranje postojeće rezervacije
    public function update(Request $request, $id)
    {
        // Pronalaženje rezervacije
        $reservation = Reservation::findOrFail($id);

        // Validacija polja
        $validator = Validator::make($request->all(), [
            'museum_id' => 'required|exists:museums,id',
            'reservation_date' => 'required|date',
            'num_tickets' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Ažuriranje rezervacije
        $reservation->update($request->all());

        return response()->json($reservation, 200);
    }

    // Brisanje rezervacije
    public function destroy($id)
    {
        // Pronalaženje rezervacije
        $reservation = Reservation::findOrFail($id);

        // Brisanje rezervacije
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully'], 200);
    }
}
