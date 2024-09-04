<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pokreće migracije.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('museum_id');
            $table->date('reservation_date'); // Datum rezervacije
            $table->integer('num_tickets'); // Broj karata
            $table->timestamps();

            // Definisanje spoljnog ključa za 'user_id' i 'museum_id'
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('museum_id')->references('id')->on('museums')->onDelete('cascade');
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
