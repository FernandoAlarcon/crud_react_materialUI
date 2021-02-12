<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gestion_Ingresos;

class GestionIngresosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $gestiones = Gestion_Ingresos::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
		$Fecha         = date("Y-m-d  h:i:s");
        
        $SubCategorias = new Gestion_Ingresos;
        $SubCategorias->Nombre_Tipo_Entradas = strval($request->input('Nombre_Tipo_Entradas'));
        $SubCategorias->Estado               = strval($request->input('Estado'));
        $SubCategorias->Tipo_Ingreso         = strval($request->input('Tipo_Ingreso'));
        $SubCategorias->created_at           = $Fecha;
        $SubCategorias->save();

        return;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
