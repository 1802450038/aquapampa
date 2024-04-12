<?php

namespace App\Http\Controllers;

use App\Board;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    function home()
    {
        return view('site.board');
    }

    function settings()
    {
        $board =  Board::find(1)->getAttributes();
        
        return view('site.settings',$board);
    }

    function updateSettings()
    {
        $board = new Board();
        $board->api_key  = "default";
        $board->ssid_wifi  = $_POST["ssid_wifi"];
        $board->pass_wifi  = $_POST["pass_wifi"];
        $board->ph_min  = $_POST["ph_min"];
        $board->ph_max  = $_POST["ph_max"];
        $board->ph_calibration  = $_POST["ph_calibration"];
        $board->temp_min  = $_POST["temp_min"];
        $board->temp_max  = $_POST["temp_max"];
        $board->temp_calibration  = $_POST["temp_calibration"];
        $board->level_min  = $_POST["level_min"];
        $board->level_max  = $_POST["level_max"];
        $board->level_calibration  = $_POST["level_calibration"];
        $board->relay_time_on  = $_POST["relay_time_on"];
        $board->relay_time_off  = $_POST["relay_time_off"];
        $board->relay_default_state  = $_POST["relay_default_state"];
        $board->relay_ph_trigger  = $_POST["relay_ph_trigger"];

        $board->where('id', 1)->update($board->getAttributes());
        return redirect('/settings');
    }
}
