<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'museum_id',
        'reservation_date', // Datum rezervacije
        'num_tickets', // Broj karata
    ];

    // Relacija: Rezervacija pripada jednom korisniku
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacija: Rezervacija pripada jednom muzeju
    public function museum()
    {
        return $this->belongsTo(Museum::class);
    }
}
