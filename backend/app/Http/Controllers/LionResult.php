<?php

namespace App\Http\Controllers;

use App\Models\Lion_result;
use Illuminate\Http\Request;

class LionResult extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = Lion_result::all();
        return response()->json($results);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = Lion_result::findOrFail($id);
        return response()->json($result);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $result = Lion_result::findOrFail($id);
        return response()->json($result);
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
        $result = Lion_result::findOrFail($id);

        $request->validate([
            'wallet_id' => 'required|max:255',
            'active' => 'required'
        ]);

        $result->wallet_id = $request->get('wallet_id');
        $result->active = $request->get('active');

        $result->save();

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function GetAllResultsForWallet($id)
    {
        $result = Lion_result::where('wallet_id', '=', $id)->get();
        return response()->json($result);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function GetRandomResult()
    {
        $result = Lion_result::where('active', '=', '1')
            ->inRandomOrder()
            ->limit(1)
            ->get();
        return response()->json($result);
    }
}
