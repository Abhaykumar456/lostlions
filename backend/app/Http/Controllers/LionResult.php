<?php

namespace App\Http\Controllers;

use App\Models\Lion_result;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;


use function PHPUnit\Framework\isEmpty;

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
        $result = Lion_result::where('wallet_id', '=', $id)
            ->where('active', '=', 1)
            ->orderByDesc('updated_at')
            ->first();
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
    public function update($id)
    {
        $result = Lion_result::findOrFail($id);

        $result->active = 0;

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

    public function store(Request $request)
    {
        $request->validate([
            'starting_pos' => 'required',
            'result' => 'required',
        ]);

        $newresult = new Lion_result([
            'starting_pos' => $request->get('starting_pos'),
            'active' => 1,
            'result' => $request->get('result'),
            'created_at' => time()
        ]);

        $newresult->save();

        return response()->json($newresult);
    }

    public function seed()
    {

        $loss_positions = [275, 325, 350, 400, 500];
        $win_positions = [250, 300, 378, 428, 450];

        foreach ($loss_positions as $losses) {
            for ($a = 0; $a < 202; $a++) {
                $newresult = new Lion_result([
                    'starting_pos' => $losses,
                    'active' => 1,
                    'result' => 0,
                    'created_at' => time()
                ]);

                $newresult->save();
            }
        }

        foreach ($win_positions as $wins) {
            for ($b = 0; $b < 202; $b++) {
                $newresult = new Lion_result([
                    'starting_pos' => $wins,
                    'active' => 1,
                    'result' => 1,
                    'created_at' => time()
                ]);

                $newresult->save();
            }
        }

        for ($b = 0; $b < 101; $b++) {
            $newresult = new Lion_result([
                'starting_pos' => 350,
                'active' => 1,
                'result' => 0,
                'created_at' => time()
            ]);

            $newresult->save();
        }

        for ($b = 0; $b < 101; $b++) {
            $newresult = new Lion_result([
                'starting_pos' => 378,
                'active' => 1,
                'result' => 1,
                'created_at' => time()
            ]);

            $newresult->save();
        }

        return true;
    }

    public function getPlayedGames()
    {
        $result = Lion_result::where('active', '=', '0')->get();
        return response()->json($result);
    }

    public function updateRecord(Request $request)
    {
        $record = Lion_result::where('active', '=', '1')
            ->whereNull('wallet_id')
            ->whereNull('mint_address')
            ->where('result', '=', '1') //devnet
            ->inRandomOrder()
            ->first();

        $request->validate([
            'wallet_id' => 'required|max:255',
            'mint_address' => 'required|max:255'
        ]);

        $repeatLion = Lion_result::where('mint_address', '=', $record->mint_address)
            ->first();

        if (!isEmpty($repeatLion)) {
            return false;
        };

        $record->wallet_id = $request->get('wallet_id');
        $record->mint_address = $request->get('mint_address');

        $record->save();

        return response()->json($record);
    }

    public function winningLion($id)
    {
        $result = Lion_result::where('mint_address', '=', $id)
            ->where('result', '=', '1')
            ->orderByDesc('updated_at')
            ->first();

        return response()->json($result);
    }

    public function claimPrize($id)
    {
        $result = Lion_result::where('wallet_id', '=', $id)
            ->where('result', '=', 1)
            ->where('active', '=', 0)
            ->orderByDesc('updated_at')
            ->first();
        return response()->json($result);
    }

    public function lionReturned($id)
    {
        $result = Lion_result::where('mint_address', '=', $id)
            ->first();

        $result->payoutsuccess = 1;

        $result->save();

        return response()->json($result);
    }
}
