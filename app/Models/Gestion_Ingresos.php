<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gestion_Ingresos extends Model
{
    use HasFactory;
    protected $table = 'Gestion__Ingresos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Nombre_Tipo_Entradas',
        'Estado',
        'Tipo_Ingreso'
    ]; 

}
