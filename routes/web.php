<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::resource('/CategoriasGastosData', 'App\Http\Controllers\CategoriasGastosController');
Route::resource('/ApuntesGastosData', 'App\Http\Controllers\ApuntesGastosController');

//Route::resource('/SubCategoriasGastosData', 'App\Http\Controllers\SubCategoriaGastosController');
Route::prefix('/SubCategoriasGastosData')->group( function (){
    
    $controlador = 'App\Http\Controllers\SubCategoriaGastosController';
    Route::prefix('Admin')->group( function() use($controlador) {
        Route::get('/',$controlador.'@index');
        Route::post('/NewSub',$controlador.'@store');
    });
});

Route::get('/CategoriasGastos', function(){
        return view('layouts/app');
});
Route::get('/SubCategoriasGastos', function(){
    return view('layouts/app');
}); 
Route::get('/ApuntesGastos', function(){
    return view('layouts/app');
}); 