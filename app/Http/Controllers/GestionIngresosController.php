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
    public function index(Request $request)
    {   
        $Data = $request->get('DataSend');
        if($Data != ''){
            $gestiones = Gestion_Ingresos::GetFindData($Data);
        }else{
            $gestiones = Gestion_Ingresos::orderBy('id', 'DESC')->get();
        }
        return $gestiones;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
		$Fecha         = date("Y-m-d  h:i:s");
        
        $gestion = new Gestion_Ingresos;
        $gestion->Nombre_Tipo_Entradas = strval($request->input('Nombre_Tipo_Entradas'));
        $gestion->Estado               = strval($request->input('Estado'));
        $gestion->Tipo_Ingreso         = strval($request->input('Tipo_Ingreso'));
        $gestion->created_at           = $Fecha;
        $gestion->save();

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
        $Fecha         = date("Y-m-d  h:i:s");

        $gestion = Gestion_Ingresos::find($id);
        $gestion->Nombre_Tipo_Entradas = strval($request->input('Nombre_Tipo_Entradas'));
        $gestion->Estado               = strval($request->input('Estado'));
        $gestion->Tipo_Ingreso         = strval($request->input('Tipo_Ingreso'));
        $gestion->updated_at           = $Fecha;
        $gestion->save();

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $gestion = Gestion_Ingresos::find($id);
        $gestion->delete();

        return;
    }
}
