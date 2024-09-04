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
        Schema::table('museums', function (Blueprint $table) {
            $table->renameColumn('museum_type', 'type'); // Preimenovanje kolone 'museum_type' u 'type'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('museums', function (Blueprint $table) {
            $table->renameColumn('type', 'museum_type'); // Vraćanje starog imena
        });
    }
};
