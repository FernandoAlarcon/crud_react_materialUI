<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGestionIngresosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gestion__ingresos', function (Blueprint $table) {
            $table->id();
            $table->char('Nombre_Tipo_Entradas', 100);
            $table->enum('Estado', ['Positivo', 'Negativo'])->default('Positivo');
            $table->enum('Tipo_Ingreso', ['Unico', 'Multiple Mensual'])->default('Unico');
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
        Schema::dropIfExists('gestion__ingresos');
    }
}
