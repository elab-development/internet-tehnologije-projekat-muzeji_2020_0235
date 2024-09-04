<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Pokreće seedovanje baze podataka.
     *
     * @return void
     */
    public function run()
    {
        // Dodavanje korisnika
        $user1_id = DB::table('users')->insertGetId([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'worker',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user2_id = DB::table('users')->insertGetId([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Dodavanje muzeja
        $museum1_id = DB::table('museums')->insertGetId([
            'name' => 'Modern Art Museum',
            'description' => 'A museum dedicated to contemporary art.',
            'type' => 'Art',
            'location' => 'New York, NY',
            'image_url' => 'https://example.com/image1.jpg',
            'three_d_view_url' => 'https://example.com/3d1',
            'ticket_price' => 20.00,
            'user_id' => $user1_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $museum2_id = DB::table('museums')->insertGetId([
            'name' => 'History Museum',
            'description' => 'A museum showcasing historical artifacts.',
            'type' => 'History',
            'location' => 'Boston, MA',
            'image_url' => 'https://example.com/image2.jpg',
            'three_d_view_url' => 'https://example.com/3d2',
            'ticket_price' => 15.00,
            'user_id' => $user1_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Dodavanje rezervacija
        DB::table('reservations')->insert([
            'user_id' => $user2_id,
            'museum_id' => $museum1_id,
            'reservation_date' => '2024-09-05',
            'num_tickets' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('reservations')->insert([
            'user_id' => $user2_id,
            'museum_id' => $museum2_id,
            'reservation_date' => '2024-09-10',
            'num_tickets' => 4,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Dodavanje poruka
        DB::table('messages')->insert([
            'user_id' => $user2_id,
            'museum_id' => $museum1_id,
            'content' => 'Can you provide more information about the upcoming exhibition?',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('messages')->insert([
            'user_id' => $user2_id,
            'museum_id' => $museum2_id,
            'content' => 'Is there a discount for group tickets?',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
