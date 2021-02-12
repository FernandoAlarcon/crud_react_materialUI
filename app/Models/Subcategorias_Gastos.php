<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategorias_Gastos extends Model
{
    use HasFactory;
    protected $table = 'Subcategorias__Gastos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Nombre_Subcategorias',
        'Tipo_Gasto_Mensual'
    ];
} 
