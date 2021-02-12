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

Route::prefix('/SubCategoriasGastosData')->group( function (){
    
    $controlador = 'App\Http\Controllers\SubCategoriaGastosController';
    Route::prefix('Admin')->group( function() use($controlador) {
        Route::get('/',$controlador.'@index');
        Route::get('/NewSub',$controlador.'@create');
    });
});
Route::prefix('/ApuntesGastosData')->group( function (){
    
    $controlador = 'App\Http\Controllers\ApuntesGastosController'; 
    Route::prefix('/')->group( function() use($controlador) {
        Route::get('/',$controlador.'@index');
        Route::get('/Create',$controlador.'@create');
    });
});
Route::prefix('/ApuntesGestionIngresoData')->group( function (){
    
    $controlador = 'App\Http\Controllers\GestionIngresosController'; 
    Route::prefix('/')->group( function() use($controlador) {
        Route::get('/',$controlador.'@index');
        Route::get('/Create',$controlador.'@create');
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
Route::get('/ApuntesGestionIngreso', function(){
    return view('layouts/app');
});