<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLionResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lion_results', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('wallet_id')->nullable();
            $table->string('mint_address')->nullable()->unique();
            $table->integer('starting_pos');
            $table->boolean('active')->default(1);
            $table->integer('result');
            $table->boolean('payoutsuccess')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lion_results');
    }
}
