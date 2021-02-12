<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CategoriasGastos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorias_gastos', function (Blueprint $table) {
            $table->id();
            $table->char('Nombre_Categorias', 100);
            $table->enum('Tipo_Categoria', ['Gasto vital', 'Gasto no vital'])->default('Gasto vital');
            $table->enum('Estado_Categoria', ['Activado', 'Desactivado'])->default('Activado');
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
        //
    }
}
