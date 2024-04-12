@section('title','Ajustes')
@extends('site.layouts.mainframe')
   @section('content')
        <div class="body">
            <div class="body-content">
                <div class="row inputs">
                    <div class="col-100 ">
                        <div class="card">
                            <div class="card-title">
                                <h4>Parametros ajuste</h4>
                            </div>
                            <div class="row">
                                <form action="{{route('settings')}}" class="form-settins" method="POST">
                                    @csrf
                                    <div class="row">
                                        <div class="row-title">Ajustes Wifi</div>
                                        <div class="col-50">
                                            <div class="input-group">
                                                <label for="value">Nome da rede</label>
                                                <input name="ssid_wifi" type="text" value="{{$ssid_wifi}}">
                                            </div>
                                        </div>
                                        <div class="col-50">

                                            <div class="input-group">
                                                <label for="value">Senha</label>
                                                <input name="pass_wifi" type="text" value="{{$pass_wifi}}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-title">Ajustes PH</div>
                                        <div class="col-30">
                                            <div class="input-group">
                                                <label for="value">Ph minimo</label>
                                                <input name="ph_min" type="text" value="{{$ph_min}}">
                                            </div>
                                        </div>
                                        <div class="col-30">

                                            <div class="input-group">
                                                <label for="value">Ph maximo</label>
                                                <input name="ph_max" type="text" value="{{$ph_max}}">
                                            </div>
                                        </div>
                                        <div class="col-30">

                                            <div class="input-group">
                                                <label for="value">Fator ajuste ph</label>
                                                <input name="ph_calibration" type="text" value="{{$ph_calibration}}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-title">Ajustes Temperatura</div>
                                        <div class="col-30">
                                            <div class="input-group">
                                                <label for="value">Temperatura minima</label>
                                                <input name="temp_min" type="text" value="{{$temp_min}}">
                                            </div>
                                        </div>
                                        <div class="col-30">

                                            <div class="input-group">
                                                <label for="value">Temperatura maxima</label>
                                                <input name="temp_max" type="text" value="{{$temp_max}}">
                                            </div>
                                        </div>
                                        <div class="col-30">

                                            <div class="input-group">
                                                <label for="value">Fator ajuste temperatura</label>
                                                <input name="temp_calibration" type="text" value="{{$temp_calibration}}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-title">Ajustes nivel</div>
                                        <div class="col-30">
                                            <div class="input-group">
                                                <label for="value">Nivel minimo</label>
                                                <input name="level_min" type="text" value="{{$level_min}}">
                                            </div>
                                        </div>
                                        <div class="col-30">

                                            <div class="input-group">
                                                <label for="value">Nivel maximo</label>
                                                <input name="level_max" type="text" value="{{$level_max}}">
                                            </div>
                                        </div>
                                        <div class="col-30">
                                            <div class="input-group">
                                                <label for="value">Fator de ajuste nivel</label>
                                                <input name="level_calibration" type="text" value="{{$level_calibration}}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-title">Ajustes relé</div>
                                        <div class="col-25">
                                            <div class="input-group">
                                                <label for="value">Hora acionamento</label>
                                                <input name="relay_time_on" type="time" value="{{$relay_time_on}}">
                                            </div>
                                        </div>
                                        <div class="col-25">

                                            <div class="input-group">
                                                <label for="value">Hora desligamento</label>
                                                <input name="relay_time_off" type="time" value="{{$relay_time_off}}">
                                            </div>
                                        </div>
                                        <div class="col-25">
                                            <div class="input-group">
                                                <div class="custom-select">
                                                    <label for="relay_default_state">Estado padrão</label>
                                                    <select name="relay_default_state" id="relay_default_state">
                                                        <option value="{{$relay_default_state}}" selected>
                                                        @if ($relay_default_state)
                                                            Ligado
                                                        @else
                                                            Desligado
                                                        @endif
                                                        
                                                        </option>
                                                        <option value="0">Desligado</option>
                                                        <option value="1">Ligado</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-25">
                                            <div class="input-group">
                                                <div class="custom-select">
                                                    <label for="relay_ph_trigger">Ph de acionamento</label>
                                                    <select name="relay_ph_trigger" id="relay_ph_trigger">
                                                        <option value="{{$relay_ph_trigger}}" selected>Ph {{$relay_ph_trigger}}</option>
                                                        <option value="1">Ph 1</option>
                                                        <option value="2">Ph 2</option>
                                                        <option value="3">Ph 3</option>
                                                        <option value="4">Ph 4</option>
                                                        <option value="5">Ph 5</option>
                                                        <option value="6">Ph 6</option>
                                                        <option value="7">Ph 7</option>
                                                        <option value="8">Ph 8</option>
                                                        <option value="9">Ph 9</option>
                                                        <option value="10">Ph 10</option>
                                                        <option value="11">Ph 11</option>
                                                        <option value="12">Ph 12</option>
                                                        <option value="13">Ph 13</option>
                                                        <option value="14">Ph 14</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-title">Ações</div>
                                        <div class="col-50">
                                            <div class="input-group">
                                                <button class="secondary">Valores padrões <i
                                                        class="fas fa-arrow-rotate-left"></i></button>
                                            </div>
                                        </div>
                                        <div class="col-50">

                                            <div class="input-group">
                                                <button type="submit">Salvar <i class="fas fa-save"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endsection
