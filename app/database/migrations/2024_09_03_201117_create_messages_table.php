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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID korisnika koji je poslao poruku
            $table->unsignedBigInteger('museum_id'); // ID muzeja kojem je poruka upućena
            $table->text('content'); // Sadržaj poruke
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
        Schema::dropIfExists('messages');
    }
};
