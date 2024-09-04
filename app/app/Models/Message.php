<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // Korisnik koji je poslao poruku
        'museum_id', // Muzej kome je poruka upućena
        'content', // Sadržaj poruke
    ];

    /**
     * Relacija: Poruka pripada jednom korisniku (pošiljaocu).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacija: Poruka je upućena jednom muzeju.
     */
    public function museum()
    {
        return $this->belongsTo(Museum::class);
    }
}
