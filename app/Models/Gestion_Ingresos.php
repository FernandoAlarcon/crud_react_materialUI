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

    public static function GetFindData($Data){
        $GestionIngreso = Gestion_Ingresos::select('*')
                   ->where('Nombre_Tipo_Entradas','LIKE','%'.$Data.'%')
                   ->orWhere('Estado','LIKE','%'.$Data.'%')
                   ->orWhere('Tipo_Ingreso','LIKE','%'.$Data.'%')
                   ->orderBy('id', 'DESC')
                   ->get();

        return $GestionIngreso;
    }

}
