$(function(){
  let myLat = 0, myLng = 0;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      //console.log(myLat, myLng);
      getPos(myLat, myLng, '');
    },function(err){
      if(err.code === 1){
        console.log('에러가 발생했습니다.');
      }
    });
  }

  function getPos(lat, lon, city){
    const apiUrl = "http://api.openweathermap.org/data/2.5/forecast";
    const apiKey = '3dc104dcf1e00fef483278d26089177e';
    let apiData;
    if(city){
      apiData = {
        q: city,
        appid:apiKey,
        units: 'metric',
        lang: 'kr'
      }
    }else{
      apiData = {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: 'metric',
        lang: 'kr'
      }
    }
    console.log(apiData);

    const weeks = ['일', '월', '화', '수', '목', '금', '토'];

    $.ajax({
      url: apiUrl,
      dataType: "json",
      type: "GET",
      async: "false",
      data: apiData,
      success: function (rs){
        console.log(rs);
        let fDays = '';
        let cityName = rs.city.name;
        $('.city').html(cityName);

        let nDate = new Date(rs.list[0].dt * 1000);
        let nMonth = nDate.getMonth() + 1;
        let nDt = nDate.getDate();
        let nWeeks = weeks[nDate.getDay()];
        let nTimes = nDate.getHours();
        let nowDate = nMonth + "." + nDt + "." + nWeeks + ". " + nTimes + "시";
        $('.now-date').html(nowDate);
        let icon = '<img src="images/' + rs
          .list[0]
          .weather[0]
          .icon + '.png" alt="' + rs
          .list[0]
          .weather[0]
          .main + '">';
        let temp = Number(rs.list[0].main.temp);
        temp = temp.toFixed(1) + "ºc";
        let temp_min = Number(rs.list[0].main.temp_min);
        temp_min = temp_min.toFixed(1) + "ºc";
        let temp_max = Number(rs.list[0].main.temp_max);
        temp_max = temp_max.toFixed(1) + "ºc";

        let text = rs.list[0].weather[0].description;
        text = text.replace('튼', '');
        text = text.replace('실', '약한');
        text = text.replace('온', '');
        text = text.replace('약간의 구름이 낀 하늘', '약간 흐림')

        $('.w-icon').html(icon);
        $('.wicon').html(fDays)
        $('.temp').html(temp);
        $('.text').html(text);

        let bgcolor = function bgchange(){
          if(rs.list[0].weather[0].icon === '01d'||
            rs.list[0].weather[0].icon === '02d'||
            rs.list[0].weather[0].icon === '50d'||
            rs.list[0].weather[0].icon === '50n'){
            $('.container-top').css({
              'background-color': '#f6e8cf'
            });
          }else if(rs.list[0].weather[0].icon === '03d'||
            rs.list[0].weather[0].icon === '04d'||
            rs.list[0].weather[0].icon === '10d'){
            $('.container-top').css({
              'background-color': '#dbe1da'
            });
          }else{
            $('.container-top').css({
              'background-color': '#233947'
            })
            $('.nav-text a').css({
              'color': '#fff'
            });
            $('.text').css({
              'color': '#fff'
            });
            $('.temp').css({
              'color': '#fff'
            });
            $('.search').css({
              'color': '#fff'
            });
          }
        }
        bgcolor();

        let bar = function barchange(){
          if(rs.list[0].weather[0].icon === '01d'){
            $('.bar').css({
              'top': '10rem'
            });
          }else if(rs.list[0].weather[0].icon === '02d' ||
            rs.list[0].weather[0].icon === '04d'){
            $('.bar').css({
              'top': '17.5rem'
            });
          }else if(rs.list[0].weather[0].icon === '01n' ||
            rs.list[0].weather[0].icon === '04n'){
            $('.bar').css({
              'top': '17.5rem',
              'background-color': '#a2d6ea'
            });
          }else{
            $('.bar').hide();
          }
        }
        bar();


        $('.temp_min').html(temp_min);
        $('.temp_max').html(temp_max);
        let srise = new Date(rs.city.sunrise * 1000);
        let sunrise = srise.getHours() + "시" + srise.getMonth() + "분";
        let sset = new Date(rs.city.sunset * 1000);
        let sunset = sset.getHours() + "시" + sset.getMonth() + "분";
        $('.sunrise').html(sunrise);
        $(".sunset").html(sunset);
        //바람 rs.list[0].wind.speed; 습도 rs.list[0].main.humidity;
        $('.speed').html(rs.list[0].wind.speed + "m/s");
        $('.humidity').html(rs.list[0].main.humidity + "%");

        const mxlength = rs.list.length;
        for (let i = 0; i < mxlength; i++) {
          let myDate = new Date(rs.list[i].dt * 1000);
          // let myYear = myDate.getFullYear();
          // let myMonth = myDate.getMonth() + 1;
          let myDt = myDate.getDate();
          let myWeeks = weeks[myDt];
          let myTimes = myDate.getHours();
          let temps = Number(rs.list[i].main.temp).toFixed(1) + "ºc";
          let icons = weatherIcon(rs.list[i].weather[0].icon);
          fDays += '<div class="weathers">';
          fDays += '<div>';
          fDays += '<p class="f-days">' + myDt + '일(' + myWeeks + ')' + myTimes + '시</p>';
          fDays += '<p class="f-temps">' + temps + '</p>';
          fDays += icons;
          fDays += '<p class="f-texts">' + rs
            .list[i]
            .weather[0]
            .main + '</p>';
          fDays += '</div>';
          fDays += '</div>';
        }
      },
      beforeSend: function () {
        $('.loading').removeClass('display-none');
      },
      complete: function () {
        $('.loading').addClass('display-none');
      }
    });
  }

  $('.week-box').click(function(){
    const box = $(this).data('box');

    if(box==='a'){
      $('.box2').animate({
        'left': '40%'
      },500);
      $('.box3').animate({
        'left': '60%'
      },500);
      $('.box4').animate({
        'left': '80%'
      },500);
    }else if(box==='b'){
      $('.box2').animate({
        'left': '20%'
      },500);
      $('.box3').animate({
        'left': '60%'
      },500);
      $('.box4').animate({
        'left': '80%'
      },500);
    }else if(box==='c'){
      $('.box2').animate({
        'left': '20%'
      },500);
      $('.box3').animate({
        'left': '40%'
      },500);
      $('.box4').animate({
        'left': '80%'
      },500);
    }else{
      $('.box4').animate({
        'left': '60%'
      },500)
    }
  });

});

function weatherIcon(icon){
  let wicon;
  switch (icon) {
    case '01d':
      wicon = '<img src="images/thumb/01d.png" alt="sunny">';
      break;
    case '02d':
      wicon = '<img src="images/thumb/02d.png" alt="cloudy">';
      break;
    case '03d':
      wicon = '<img src="images/thumb/03d.png" alt="cloud">';
      break;
    case '04d':
      wicon = '<img src="images/thumb/04d.png" alt="cloudy">';
      break;
    case '09d':
      wicon = '<img src="images/thumb/09d.png" alt="rain">';
      break;
    case '10d':
      wicon = '<img src="images/thumb/10d.png" alt="rain">';
      break;
    case '11d':
      wicon = '<img src="images/thumb/11d.png" alt="thunderstorm">';
      break;
    case '13d':
      wicon = '<img src="images/thumb/13d.png" alt="snow">';
      break;
    case '50d':
      wicon = '<img src="images/thumb/50d.png" alt="windy">';
      break;
    case '01n':
      wicon = '<img src="images/thumb/01n.png" alt="night-clear">';
      break;
    case '02n':
      wicon = '<img src="images/thumb/02n.png" alt="cloudy">';
      break;
    case '03n':
      wicon = '<img src="images/thumb/03n.png" alt="cloud">';
      break;
    case '04n':
      wicon = '<img src="images/thumb/04n.png" alt="cloudy">';
      break;
    case '09n':
      wicon = '<img src="images/thumb/09n.png" alt="rain">';
      break;
    case '10n':
      wicon = '<img src="images/thumb/10n.png" alt="rain">';
      break;
    case '11n':
      wicon = '<img src="images/thumb/11n.png" alt="thunderstorm">';
      break;
    case '13n':
      wicon = '<img src="images/thumb/13n.png" alt="snow">';
      break;
    case '50n':
      wicon = '<img src="images/thumb/50n.png" alt="windy">';
      break;
  }
  return wicon;
}
