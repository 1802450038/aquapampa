<?php

namespace App\Http\Controllers;

use App\DataBoard;
use Illuminate\Http\Request;
use PHPUnit\Util\Json;

class DataBoardController extends Controller
{

    private $api_key = "teste";

    function sendDataLog(int $board_id, float $ph_value, float $temp_value, float $level_value, int $relay_value)
    {
        $values = [
            'board_id' => $board_id,
            'ph_value' => $ph_value,
            'temp_value' => $temp_value,
            'level_value' => $level_value,
            'relay_value' => $relay_value
        ];
        DataBoard::create($values);

        return DataBoard::all();
    }

    function sendDataLogTest(int $board_id){
        $values = [
            'board_id' => $board_id,
            'ph_value' => rand(0,14),
            'temp_value' => rand(0,100),
            'level_value' => rand(0,250),
            'relay_value' => rand(0,1)
        ];
        DataBoard::create($values);


        return DataBoard::all();
    }

    function getDataLog(int $id, string $key)
    {
        if ($key == $this->api_key) {
            $result = DataBoard::where('board_id', 1)->skip(0)->take(20)->orderBy('id','desc')->getModels();
            return $result;
        } else {
            return "";
        }
    }


    function getDataLogDate(
        int $id,
        string $key,
        string $sensor,
        string $date_log,
        string $hour_start,
        string $hour_end,
        int $quantity
    ) {

        $dateBegin = $date_log." ".$hour_start.":00";
        $dateEnd = $date_log." ".$hour_end.":00";
        if ($key == $this->api_key) {
            $result = DataBoard::where('board_id', 1)
            ->whereBetween('created_at',[$dateBegin, $dateEnd])->skip(0)->take(180)
            ->get(['id',$sensor.'_value','created_at']);
           return $result;
        } else {
            return "nothing";
        }
    }
}
