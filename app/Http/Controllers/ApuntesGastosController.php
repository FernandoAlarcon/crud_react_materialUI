<?php

namespace App\Http\Controllers;
use App\Models\Apuntes_Gastos;
use Illuminate\Http\Request;
date_default_timezone_set('America/Bogota');

class ApuntesGastosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Apuntes = Apuntes_Gastos::GetAll();
        return $Apuntes;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {   
		$Fecha         = date("Y-m-d  h:i:s");
        $SubCategorias = new Apuntes_Gastos;
        $SubCategorias->Categoría_Gasto    = $request->input('Categoría_Gasto');
        $SubCategorias->Subcategoría_Gasto = $request->input('Subcategoría_Gasto');
        $SubCategorias->Importe            = $request->input('Importe');
        $SubCategorias->Concepto           = $request->input('Concepto'); 
        $SubCategorias->save();

        return [ 'message' => "Guardo exitosamente",
      			 'success' => 'true' ];

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
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
