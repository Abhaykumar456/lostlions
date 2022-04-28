<?php

use App\Http\Controllers\LionResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('result', LionResult::class);

Route::group(['prefix' => 'v1'], function () {
    Route::get('/getRandomResult', 'App\Http\Controllers\LionResult@GetRandomResult');
    Route::get('/getAllResultsForWallet', 'App\Http\Controllers\LionResult@GetAllResultsForWallet');
    Route::get('/seeds', 'App\Http\Controllers\LionResult@seed');
    Route::get('/getplayedgames', 'App\Http\Controllers\LionResult@getPlayedGames');
    Route::put('/updateRecord', 'App\Http\Controllers\LionResult@updateRecord');
});
Route::get('/winningLion/{id}', [LionResult::class, 'winningLion']);
Route::get('/claimPrize/{id}', [LionResult::class, 'claimPrize']);
Route::put('/lionReturned/{id}', [LionResult::class, 'lionReturned']);
