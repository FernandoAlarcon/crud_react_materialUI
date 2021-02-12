<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apuntes_Gastos extends Model
{
    use HasFactory;
    protected $table = 'Apuntes__Gastos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Categoría_Gasto',
        'Subcategoría_Gasto',
        'Importe',
        'Concepto'
    ]; 

    public static function GetAll(){
        $apuntes = Apuntes_Gastos::select('*')->from("Apuntes__Gastos as AG")
                   ->join('Categorias_Gastos     AS CG', 'CG.id','=','AG.Categoría_Gasto')
                   ->join('Subcategorias__Gastos AS SG', 'SG.id','=','AG.Subcategoría_Gasto')
                   ->get();
        return $apuntes;
    }
}
