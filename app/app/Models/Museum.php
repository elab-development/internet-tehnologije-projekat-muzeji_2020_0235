<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Museum extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type', // umetnost, istorijski, naučni, savremeni, vojni
        'location',
        'image_url',
        'three_d_view_url',
        'ticket_price',
        'user_id',
    ];

    // Relacija: Muzej pripada jednom radniku (korisniku)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacija: Muzej može imati mnogo rezervacija
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
