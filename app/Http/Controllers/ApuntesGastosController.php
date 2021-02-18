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
    public function index(Request $request)
    {   
        $Data = $request->get('DataSend');
        if($Data != ''){
            $Apuntes = Apuntes_Gastos::GetFindData($Data);
        }else{
            $Apuntes = Apuntes_Gastos::GetAll();
        }
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
        $ApuntesGastos = new Apuntes_Gastos;
        $ApuntesGastos->Categoría_Gasto    = $request->input('Categoría_Gasto');
        $ApuntesGastos->Subcategoría_Gasto = $request->input('Subcategoría_Gasto');
        $ApuntesGastos->Importe            = $request->input('Importe');
        $ApuntesGastos->Concepto           = $request->input('Concepto'); 
        $ApuntesGastos->save();

        return [ 'message' => "Guardo exitosamente",
      			 'success' => 'true' ];

    }

    public function store(Request $request)
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
        $Fecha         = date("Y-m-d  h:i:s");

        $ApuntesGastos = Apuntes_Gastos::find($id);
        $ApuntesGastos->Categoría_Gasto    = strval($request->input('Categoría_Gasto'));
        $ApuntesGastos->Subcategoría_Gasto = strval($request->input('Subcategoría_Gasto'));
        $ApuntesGastos->Importe            = strval($request->input('Importe'));
        $ApuntesGastos->Concepto           = strval($request->input('Concepto')); 
        $ApuntesGastos->save();

        return;
    }

    public function destroy($id)
    {
        $Apunte = Apuntes_Gastos::find($id);
        $Apunte->delete();

        return;
    }
}
