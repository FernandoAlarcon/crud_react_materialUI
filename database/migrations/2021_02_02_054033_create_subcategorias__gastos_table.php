<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubcategoriasGastosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subcategorias__gastos', function (Blueprint $table) {
            $table->id();
            $table->char('Nombre_Subcategorias', 100);
            $table->enum('Tipo_Gasto_Mensual', ['Fijo', 'Multiple'])->default('Fijo');
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
        Schema::dropIfExists('subcategorias__gastos');
    }
}
