<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApuntesGastosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apuntes__gastos', function (Blueprint $table) {
            $table->id();
            $table->dateTime('Fecha');
            $table->char('Categoría_Gasto', 11);
            $table->char('Subcategoría_Gasto', 11);
            $table->integer('Importe')->default(0);
            $table->char('Concepto', 50);
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
        Schema::dropIfExists('apuntes__gastos');
    }
}
