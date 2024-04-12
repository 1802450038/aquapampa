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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', 'BoardController@home')->name('home');

// Route::get('/dataLog', 'DataBoardController@getDataLog');


Route::get('/sendlog/{board_id}/{ph_value}/{temp_value}/{level_value}/{relay_value}', 'DataBoardController@sendDataLog');


Route::get('/sendlog/{board_id}', 'DataBoardController@sendDataLogTest');
// Route::get('/datalog/{board_id}/{ph_value}/{temp_value}/{level_value}/{relay_value}', function(int $board_id, float $ph_value, float $temp_value, float $level_value, int $relay_value){
    
// });

Route::get('/getlog/{id}/{key}', 'DataBoardController@getDataLog');

Route::get('/getlog/{id}/{key}/{sensor}/{date_log}/{hour_start}/{hour_end}/{quantity}', 'DataBoardController@getDataLogDate');

Route::get('/settings', 'BoardController@settings')->name('settings');

Route::post('/settings', 'BoardController@updateSettings')->name('settings');