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
        $ApuntesGastos = Apuntes_Gastos::select('*')->from("Apuntes__Gastos as AG")
                   ->join('Categorias_Gastos     AS CG', 'CG.id','=','AG.Categoría_Gasto')
                   ->join('Subcategorias__Gastos AS SG', 'SG.id','=','AG.Subcategoría_Gasto') 
                   ->addSelect([
                        'AG.id AS IdApuntes'
                   ])
                   ->orderBy('IdApuntes', 'DESC')
                   ->get();
        return $ApuntesGastos;
    }

    public static function GetFindData($Data){
        $ApuntesGastos = Apuntes_Gastos::select('*')->from("Apuntes__Gastos as AG")
                    ->join('Categorias_Gastos     AS CG', 'CG.id','=','AG.Categoría_Gasto')
                    ->join('Subcategorias__Gastos AS SG', 'SG.id','=','AG.Subcategoría_Gasto')                     
                    ->where('AG.Concepto','LIKE','%'.$Data.'%')
                    ->orWhere('AG.Importe','LIKE','%'.$Data.'%')
                    ->orWhere('CG.Nombre_Categorias','LIKE','%'.$Data.'%')
                    ->orWhere('CG.Tipo_Categoria','LIKE','%'.$Data.'%')
                    ->orWhere('SG.Nombre_Subcategorias','LIKE','%'.$Data.'%')
                    ->orWhere('SG.Tipo_Gasto_Mensual','LIKE','%'.$Data.'%')
                    ->addSelect([
                        'AG.id AS IdApuntes'
                    ])
                    ->orderBy('IdApuntes', 'DESC')
                    ->get();

        return $ApuntesGastos;
    }
}
