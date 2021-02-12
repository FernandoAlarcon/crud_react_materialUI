<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;


class Categorias_Gastos extends Model
{
    use HasFactory;
    protected $table = 'Categorias_Gastos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Nombre_Categorias',
        'Tipo_Categoria',
        'Estado_Categoria'
    ];

}
