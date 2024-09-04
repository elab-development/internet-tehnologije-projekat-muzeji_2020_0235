<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'worker' ili 'admin'  ili user
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relacija: Jedan radnik može imati mnogo muzeja
    public function museums()
    {
        return $this->hasMany(Museum::class);
    }

    // Provera da li je korisnik admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
