<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeThreeDViewUrlNullableInMuseumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('museums', function (Blueprint $table) {
            // Postavljanje 'three_d_view_url' kao nullable
            $table->string('three_d_view_url')->nullable()->change();
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
            // Vraćanje 'three_d_view_url' nazad u non-nullable stanje
            $table->string('three_d_view_url')->nullable(false)->change();
        });
    }
}
