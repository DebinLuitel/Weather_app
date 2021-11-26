<?php
$mysqli = new mysqli("localhost","root","","db2059150");
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
  }
// Select weather data for given parameters
$sql = "SELECT *
FROM weatherdata
WHERE city = 'Islington'
AND weather_when >= DATE_SUB(NOW(), INTERVAL 1 HOUR )
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);
// If 0 record found
if ($result->num_rows == 0) {
$url = 'https://api.openweathermap.org/data/2.5/weather?q='.$_GET['city'].'&appid=8f4e776c457e6e3a1e2d32d73c5eb771&units=metric';
$data = file_get_contents($url);
$json = json_decode($data, true);
$city = $json['name'];
$date=$json['dt'];
$min_temp=$json['main']['temp'];
$min_temp=$json['main']['temp_min'];
$max_temp=$json['main']['temp_max'];
$pressure=$json['main']['pressure'];
$weather_description = $json['weather'][0]['description'];
$weather_temperature = $json['main']['temp'];
$weather_wind = $json['wind']['speed'];
$humidity = $json['main']['humidity'];
$feels_like = $json['main']['feels_like'];
$icon=$json['weather'][0]['icon'];
date_default_timezone_set('Asia/Kathmandu');
$weather_when=date("Y-m-d H:i:s");
$go = mysqli_connect('localhost', 'root', '', 'db2059150');
if ($go->connect_error) {
    die("Connection failed: " . $go->connect_error);
  }
  $cap="insert into weatherdata set weather_temperature='$weather_temperature',city='$city',weather_when='$weather_when',temp_min='$min_temp',icon='$icon',temp_max='$max_temp',weather_description ='$weather_description',humidity='$humidity',pressure='$pressure',weather_wind='$weather_wind',feels_like='$feels_like'";
  mysqli_query($go,$cap);
  
  $go->close();
}
// Select weather data for given parameters
$sql = "SELECT *
FROM weatherdata
WHERE city = 'Islington'
AND weather_when >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);
// Get data, convert to JSON and print
$row = $result -> fetch_assoc();
print json_encode($row);
// Free result set and close connection
$result -> free_result();
$mysqli -> close();
?>
