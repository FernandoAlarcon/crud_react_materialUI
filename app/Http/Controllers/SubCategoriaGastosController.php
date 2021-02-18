<?php

namespace App\Http\Controllers;
use App\Models\Subcategorias_Gastos;
use Illuminate\Http\Request;

class SubCategoriaGastosController extends Controller
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
            $SubCategorias = Subcategorias_Gastos::GetFindData($Data);
        }else{
            $SubCategorias = Subcategorias_Gastos::orderBy('id', 'DESC')->get();      
        }
        return $SubCategorias;
    }
 
    public function create(Request $request)
    {
        $SubCategorias = new Subcategorias_Gastos;
        $SubCategorias->Nombre_Subcategorias = $request->get('Nombre_Subcategorias');
        $SubCategorias->Tipo_Gasto_Mensual   = $request->get('Tipo_Gasto_Mensual');
        $SubCategorias->save();

        return;
    }

     
    public function store()
    { 
    }

    
    public function show($id)
    {
        //
    }

     
    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $SubCategorias =  Subcategorias_Gastos::find($id);
        $SubCategorias->Nombre_Subcategorias = $request->get('Nombre_Subcategorias');
        $SubCategorias->Tipo_Gasto_Mensual   = $request->get('Tipo_Gasto_Mensual');
        $SubCategorias->save();
        return;
    }

    public function destroy($id)
    {
        $SubCategorias = Subcategorias_Gastos::find($id);
        $SubCategorias->delete();

        return;
    }
}

