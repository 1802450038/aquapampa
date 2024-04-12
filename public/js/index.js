// --primary-l : #73a3fa;
// --primary : #6095f7;
// --primary-d : #3377f7;
// --primary-l : #fa73d8;
// --primary : #f760e3;
// --primary-d : #f733e7;
// --primary-l : #7efa73;
// --primary : #60f760;
// --primary-d : #5af733;
// --primary-l : #fa7373;
// --primary : #f76060;
// --primary-d : #f73333;

function loadDate() {
  let dateForm = document.getElementById("date-log");
  let hourStartForm = document.getElementById("hour-log-start");
  let hourEndForm = document.getElementById("hour-log-end");

  let DateLocale = new Date().toLocaleString("pt-BR").split(" ");

  let DateDay = DateLocale[0].split("/").reverse();
  let DateTime = DateLocale[1].split(":");

  dateForm.value = DateDay[0] + "-" + DateDay[1] + "-" + DateDay[2];

  if (DateTime[0] < 3) {
    hourStartForm.value = "00" + ":" + "00";
  } else if (DateTime[0] < 13) {
    hourStartForm.value = "0" + (DateTime[0] - 3) + ":" + DateTime[1];
  } else {
    hourStartForm.value = DateTime[0] - 3 + ":" + DateTime[1];
  }

  hourEndForm.value = DateTime[0] + ":" + DateTime[1];
  return DateTime + " " + DateDay;
}
loadDate();

// DOM VARIABLES
let last_response;
let last_sensor;
let form_sensor = $("#sensor").val();
let form_date_log = $("#date-log").val();
let form_hour_start = $("#hour-log-start").val();
let form_hour_end = $("#hour-log-end").val();
let form_quantity = calcTimeDiffMin(form_hour_start, form_hour_end);
let liveUpdate = true;

// CHART
const ctx = document.getElementById("myChart");
chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temp",
        data: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// SLIDER
$("#slider-level").roundSlider({
  sliderType: "min-range",
  circleShape: "pie",
  startAngle: "315",
  lineCap: "round",
  radius: 80,
  width: 20,

  min: 0,
  max: 250,

  svgMode: true,
  pathColor: "#a1a1a1",
  borderWidth: 0,

  startValue: 0,

  valueChange: function (e) {
    var color = e.value > e.options["max"] / 2 ? "#e65744" : "#3377f7";
    $("#slider-level").roundSlider({ rangeColor: color, tooltipColor: color });
  },
});

$("#slider-ph").roundSlider({
  sliderType: "min-range",
  circleShape: "pie",
  startAngle: "315",
  lineCap: "round",
  radius: 80,
  width: 20,

  min: 0,
  max: 14,

  svgMode: true,
  pathColor: "#a1a1a1",
  borderWidth: 0,

  startValue: 0,

  valueChange: function (e) {
    var color = e.value > e.options["max"] / 2 ? "#e65744" : "#3377f7";
    $("#slider-ph").roundSlider({ rangeColor: color, tooltipColor: color });
  },
});

$("#slider-relay").roundSlider({
  sliderType: "min-range",
  circleShape: "pie",
  startAngle: "315",
  lineCap: "round",
  radius: 80,
  width: 20,

  min: 0,
  max: 1,

  svgMode: true,
  pathColor: "#a1a1a1",
  borderWidth: 0,
  startValue: 0,
  rangeColor: "#e65744",
  tooltipColor: "#a1a1a1",
});

$("#slider-temp").roundSlider({
  sliderType: "min-range",
  circleShape: "pie",
  startAngle: "315",
  lineCap: "round",
  radius: 80,
  width: 20,
  min: 0,
  max: 100,
  svgMode: true,
  pathColor: "#a1a1a1",
  borderWidth: 0,
  startValue: 0,
  rangeColor: "#e65744",
  tooltipColor: "#a1a1a1",
  // valueChange: function (e) {
  //   var color = e.value > e.options["max"] / 2 ? "#e65744" : "#3377f7";
  //   $("#slider-temp").roundSlider({ rangeColor: color, tooltipColor: color });
  // },
});
var sliderPh = $("#slider-ph").data("roundSlider");
var sliderLevel = $("#slider-level").data("roundSlider");
var sliderRelay = $("#slider-relay").data("roundSlider");
var sliderTemp = $("#slider-temp").data("roundSlider");

function toggleFloating(elem) {
  if (elem.parentElement.parentElement.classList.contains("active")) {
    elem.parentElement.parentElement.classList.remove("active");
  } else {
    elem.parentElement.parentElement.classList.add("active");
  }
}

function getSubField(value, icon) {
  return "<span class='log-value'><i>" + icon + "</i> " + value + "</span>";
}

function dateParse(date) {
  var date = new Date(date).toLocaleString("pt-BR");
  return date.split(" ");
}

function appendResult(data, sensor) {
  let resultsHtml = document.getElementById("last-logs");
  resultsHtml.innerHTML = "";
  chart.data.datasets[0].data = [];
  chart.data.labels = [];
  last_response = data[0].id;
  sliderPh.setValue(data[0].ph_value);
  sliderLevel.setValue(data[0].level_value);
  sliderRelay.setValue(data[0].relay_value);
  sliderTemp.setValue(data[0].temp_value);

  data.reverse();
  
  data.forEach((element) => {
    resultsHtml.innerHTML +=
      "<li class='log-content'>" +
      getSubField(element.id, "ID") +
      getSubField(element.ph_value, "PH") +
      getSubField(element.temp_value, "Temp") +
      getSubField(element.level_value, "Level") +
      getSubField(element.relay_value, "Relay") +
      getSubField(
        dateParse(element.created_at)[0] +
          " " +
          dateParse(element.created_at)[1],
        "Date"
      );
    ("</li>");
    chart.data.datasets[0].data.push(element[sensor + "_value"]);
    chart.data.labels.push(dateParse(element.created_at)[1]);
  });
  chart.data.datasets[0].label = getLabelAndColor(sensor)[0];
  chart.data.datasets[0].backgroundColor = getLabelAndColor(sensor)[1];
  chart.data.datasets[0].borderColor = getLabelAndColor(sensor)[2];
}

function appendResultHistory(data,sensor){
  let resultsHtml = document.getElementById("last-logs");
  resultsHtml.innerHTML = "";
  chart.data.datasets[0].data = [];
  chart.data.labels = [];

  data.reverse();
  
  data.forEach((element) => {
    resultsHtml.innerHTML +=
      "<li class='log-content'>" +
      getSubField(element.id, "ID") +
      getSubField(element[sensor + "_value"], getLabelAndColor(sensor)[0]) +
      getSubField(
        dateParse(element.created_at)[0] +
          " " +
          dateParse(element.created_at)[1],
        "Date"
      );
    ("</li>");
    chart.data.datasets[0].data.push(element[sensor + "_value"]);
    chart.data.labels.push(dateParse(element.created_at)[1]);
  });
  chart.data.datasets[0].label = getLabelAndColor(sensor)[0];
  chart.data.datasets[0].backgroundColor = getLabelAndColor(sensor)[1];
  chart.data.datasets[0].borderColor = getLabelAndColor(sensor)[2];
}

function getData(board_id, key, sensor) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8000/getlog/" + board_id + "/" + key,
    async: true,
    success: function (data) {
      if (data.reverse()[0].id != last_response || sensor != last_sensor) {
        appendResult(data, sensor);
        last_sensor = sensor;
      }
    },
    beforeSend: function () {},
    complete: function () {
      chart.update();
    },
    fail: function () {
      console.log("Falha");
    },
  });
}

function getDataByParams(
  board_id,
  key,
  sensor,
  date_log,
  hour_start,
  hour_end,
  quantity
) {
  $.ajax({
    type: "GET",
    url:
      "http://localhost:8000/getlog/" +
      board_id +
      "/" +
      key +
      "/" +
      sensor +
      "/" +
      encodeURIComponent(date_log) +
      "/" +
      encodeURIComponent(hour_start) +
      "/" +
      encodeURIComponent(hour_end) +
      "/" +
      quantity,
    async: true,
    success: function (data) {
      console.log(data);
      appendResultHistory(data.reverse(),sensor)
    },
    beforeSend: function () {},
    complete: function () {
      chart.update();
    },
    fail: function () {
      console.log("Falha");
    },
  });
}


function sendFake() {
  $.ajax({
    type: "GET",
    url:
      "http://localhost:8000/sendlog/1" ,
    async: true,
    success: function (data) {
    },
    beforeSend: function () {},
    complete: function () {
    },
    fail: function () {
      console.log("Falha");
    },
  });
}



function hourToMinutes(hour) {
  return parseInt(hour.split(":")[0] * 60) + parseInt(hour.split(":")[1]);
}

function calcTimeDiffMin(timeStart, timeEnd) {
  return parseInt(hourToMinutes(timeEnd) - hourToMinutes(timeStart));
}

function calcTimeDiffHour(timeStart, timeEnd) {
  return parseInt((hourToMinutes(timeEnd) - hourToMinutes(timeStart)) / 60);
}

function getLabelAndColor(sensor) {
  switch (sensor) {
    case "ph":
      return ["PH", "#7efa73", "#5af733"];
      break;
    case "level":
      return ["NIVEL", "#73a3fa", "#3377f7"];
      break;
    case "temp":
      return ["TEMPERATURA", "#fa7373", "#f73333"];
      break;
    case "relay":
      return ["RELÉ", "#fa73d8", "#f733e7"];
      break;
    default:
      return ["NENHUM", "#646464", "#222222"];
      break;
  }
}

function loadValuesFromForm() {
  form_sensor = $("#sensor").val();
  form_date_log = $("#date-log").val();
  form_hour_start = $("#hour-log-start").val();
  form_hour_end = $("#hour-log-end").val();
  form_quantity = calcTimeDiffMin(form_hour_start, form_hour_end);
}

function toggleLiveUpdate() {
  $("#auto-update").toggleClass("inactive");
  liveUpdate = !liveUpdate;
}

function disableLiveUpdate() {
  $("#auto-update").addClass("inactive");
  console.log("disable");
  liveUpdate = false;
}

$(document).ready(function () {
  $("#send-log").click(function () {
    loadValuesFromForm();
    if (calcTimeDiffHour(form_hour_start, form_hour_end) > 6) {
      alert("O intervalo de horas não pode ser maior que 6 Horas");
      return false;
    } else {
      getDataByParams(
        1,
        "teste",
        form_sensor,
        form_date_log,
        form_hour_start,
        form_hour_end,
        form_quantity
      );
      disableLiveUpdate();
    }
  });

});

$(document).ready(function () {
  $("#hour-log-start").click(function () {
    disableLiveUpdate();
  });
  $("#hour-log-end").click(function () {
    disableLiveUpdate();
  });
  $("#date-log").click(function () {
    disableLiveUpdate();
  });
});

$(document).ready(function () {
  $("#auto-update").click(function () {
    toggleLiveUpdate();
  });
});

setInterval(function () {
  if (liveUpdate == true) {
    loadDate();
    loadValuesFromForm();
    getData(1,'teste',form_sensor);
    sendFake();
  } else {
    // loadValuesFromForm();
  }
}, 5000);

// window.onload = sendRequest("getLogParam");

getData(1, "teste", "temp");
