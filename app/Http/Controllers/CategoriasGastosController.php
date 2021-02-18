<?php

namespace App\Http\Controllers;
use App\Models\Categorias_Gastos;
use Illuminate\Http\Request;

class CategoriasGastosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $Data = $request->get('DataSend');
        if($Data != ''){
            $categorias = Categorias_Gastos::GetFindData($Data);
        }else{
            $categorias = Categorias_Gastos::orderBy('id', 'DESC')->get();
        }
        return $categorias;
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request) 
    {
        $Fecha      = date("Y-m-d  h:i:s");
        $categorias = new Categorias_Gastos;
        $categorias->Nombre_Categorias  = $request->input('Nombre_Categorias');
        $categorias->Tipo_Categoria     = $request->input('Tipo_Categoria');
        $categorias->Estado_Categoria   = $request->input('Estado_Categoria');
        $categorias->save();

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
        $categorias = Categorias_Gastos::find($id);
        $categorias->Nombre_Categorias  = $request->input('Nombre_Categorias');
        $categorias->Tipo_Categoria     = $request->input('Tipo_Categoria');
        $categorias->Estado_Categoria   = $request->input('Estado_Categoria');
        $categorias->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categorias = Categorias_Gastos::find($id);
        $categorias->delete();

        return;
    }
}
