<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('museums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('museum_type'); // Pogrešno nazvana kolona, umesto 'type'
            $table->string('location');
            $table->string('image_url');
            $table->string('three_d_view_url');
            $table->decimal('ticket_price', 8, 2);
            $table->unsignedBigInteger('user_id'); // Ispravna kolona, ali bez spoljnog ključa
            $table->string('notes'); // Kolona viška
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('museums');
    }
};
