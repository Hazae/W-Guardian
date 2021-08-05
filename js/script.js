$(function(){
  // $('a.search').click(function(){
  //   $('.searchbox').animate({
  //       width : '20em'
  //   }).css({
  //       border: '2px solid #146992' ,
  //       backgroundColor: 'rgba(255,255,255,0.4)'
  //   });
  // });
  // $('.searchbox').on('keypress', function(e){
  //     if(e.which == 13 && !e.shiftKey){
  //         var key = $(this).val();
  //         $(this).animate({
  //             width: 0
  //         }, 300).css({
  //             border:'none',
  //             backgroundColor:'transparent'
  //         });
  //         getPos('', '', key);
  //     };
  // });

  // $('.searchbox').on('keyup blur', function(e){
  //     var v = $(this).val();
  //     //검색창에 한글 못 쓰게 막는 명령
  //     $(this).val(v.replace(/[^a-zA-A-_0-9]/g,''));
  // });

  var myLat = 0, myLng = 0;
  //현재 위치추적 동의하는지 물어보고 차단하면 if문 실행되지 않음.
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
          myLat = position.coords.latitude;
          myLng = position.coords.longitude;
          //console.log(myLat, myLng);
          getPos(myLat, myLng, '');
      },function(err){
        if(err.code==1){
            console.log('에러');
        }
      });
  }

  function getPos(lat, lon, city){
    var apiurl = "http://api.openweathermap.org/data/2.5/forecast";
    var apikey = '';
    var apidata;
    //city값이 담겼으면 지역을 검색해서 날씨 제공
    if(city){
      apidata = {
          q: city,
          appid:apikey,
          units: 'metric',
          lang: 'kr'
      }
      //city값이 없으면 위도 경도값을 검색해서 날씨 제공
    }else{
      apidata = {
          lat: lat,
          lon: lon,
          appid:apikey,
          units: 'metric',
          lang: 'kr'     
      }
    }
    console.log(apidata);
    var weeks = ['일', '월', '화', '수', '목', '금', '토'];
    var $opt = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    }
  }
  //console.log(new Date(1621922400*1000));
  //console.log(parseInt(new Date()/1000));
  $.ajax({
      url: apiurl,
      dataType: "json",
      type: "GET",
      async: "false",
      data: apidata,
      success: function(rs){
          console.log(rs);
          var fdays='';
          var cityname = rs.city.name;
          $('.city').html(cityname);

          var nDate = new Date(rs.list[0].dt*1000);
          // var nyear = nDate.getFullYear();
          var nmonth = nDate.getMonth()+1;
          var ndt = nDate.getDate();
          var nweeks = weeks[nDate.getDay()]; 
          var ntimes = nDate.getHours();
          var nowDate = nmonth+"."+ndt+"("+nweeks+") "+ntimes+"시";
          $('.now-date').html(nowDate);
          var icon = '<img src="images/'+rs.list[0].weather[0].icon+'.png" alt="'+rs.list[0].weather[0].main+'">'; 
          var temp = Number(rs.list[0].main.temp);
          var temp = temp.toFixed(1)+"ºc";
          var temp_min = Number(rs.list[0].main.temp_min);
          var temp_min = temp_min.toFixed(1)+"ºc";
          var temp_max = Number(rs.list[0].main.temp_max);
          var temp_max = temp_max.toFixed(1)+"ºc";

          var text = rs.list[0].weather[0].description;
          var text = text.replace('튼', '뜬');
          
          $('.w-icon').html(icon);
          $('.temp').html(temp);
          $('.text').html(text);

          $('.temp_min').html(temp_min);
          $('.temp_max').html(temp_max);
          var srise = new Date(rs.city.sunrise*1000);
          var sunrise = srise.getHours()+"시"+srise.getMonth()+"분";
          var sset = new Date(rs.city.sunset*1000); 
          var sunset = sset.getHours()+"시"+sset.getMonth()+"분";
          $('.sunrise').html(sunrise);
          $(".sunset").html(sunset);
          //바람 rs.list[0].wind.speed;
          //습도 rs.list[0].main.humidity; 
          $('.speed').html(rs.list[0].wind.speed+"m/s");
          $('.humidity').html(rs.list[0].main.humidity+"%");

          var mxlength = rs.list.length;       
          for(var i=0; i<mxlength; i++){
          //    var mdt = eval(nowdt - rs.list[i].dt);
          //    if(mdt<0){
          //        mdt = -mdt;
          //    }
          //    ndt.push(mdt);

            var myDate = new Date(rs.list[i].dt*1000);
              //  console.log(myDate);
              //  console.log(rs.list[i].dt_txt);
              //  console.log(rs.list[i].main.temp);
            var myyear = myDate.getFullYear();
            var mymonth = myDate.getMonth()+1;
            var mydt = myDate.getDate();
            var myweeks = weeks[myDate.getDay()]; 
            var mytimes = myDate.getHours();
            var temps = Number(rs.list[i].main.temp).toFixed(1)+"ºc";
            var icons = wethericon(rs.list[i].weather[0].icon);
            fdays += '<div class="weathers">';
            fdays += '<div>';
            fdays += '<p class="f-days">'+mydt+'일('+myweeks+')'+mytimes+'시</p>';
            fdays += '<p class="f-temps">'+temps+'</p>';
            fdays += icons;
            fdays += '<p class="f-texts">'+rs.list[i].weather[0].main+'</p>';
            fdays += '</div>';    
            fdays += '</div>';
        }
        //console.log(ndt);
        $('.slider').slick('unslick');
        $('.slider').html(fdays);            
        $('.slider').not('.slick-initialized').slick(getSliderSetting());
          //console.log(fdays);

    },
    beforeSend:function(){
        $('.loading').removeClass('display-none');
    },
    complete:function(){
        $('.loading').addClass('display-none');
    } 
});

  function getSliderSetting(){
  let $opt = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: false,
    autoplay:true,
    autoplaySpeed: 3000,
    infinite: true,
    centerMode: true
  }
  return $opt; 
  }

  // $('.slider').slick(getSliderSetting());
  // }
});

function wethericon(icon){
  var wicon;
  switch(icon){
      case '01d':
         wicon = '<i class="wi wi-day-sunny" style="color:yellow"></i>';
      break;
      case '02d':
          wicon = '<i class="wi wi-day-cloudy"></i>';
      break;
      case '03d':
          wicon = '<i class="wi wi-cloud"></i>';
      break;
      case '04d':
          wicon = '<i class="wi wi-cloudy"></i>';
      break;       
      case '09d':
          wicon = '<i class="wi wi-rain"></i>';
      break;
      case '10d':
          wicon = '<i class="wi wi-day-rain"></i>';
      break;
      case '11d':
          wicon = '<i class="wi wi-thunderstorm style="color:gray"></i>';
      break;
      case '13d':
          wicon = '<i class="wi wi-snow"></i>';
      break;
      case '50d':
          wicon = '<i class="wi wi-windy" style="color:#ddd;"></i>';
      break;
      case '01n':
          wicon = '<i class="wi wi-night-clear" style="color:#666"></i>';
      break;
      case '02n':
          wicon = '<i class="wi wi-night-alt-cloudy" style="color:#666"></i>';
      break;
      case '03n':
          wicon = '<i class="wi wi-cloud"></i>';
      break;
      case '04n':
          wicon = '<i class="wi wi-cloudy"></i>';
      break;
      case '09n':
          wicon = '<i class="wi wi-rain"></i>';
      break;
      case '10n':
          wicon = '<i class="wi wi-night-alt-rain"></i>';
      break;
      case '11n':
          wicon = '<i class="wi wi-thunderstorm" style="color:#666"></i>';
      break;
      case '13n':
          wicon = '<i class="wi wi-snow"></i>';
      break;
      case '50n':
          wicon = '<i class="wi wi-windy" style="color:#555"></i>';
      break;
  }
  return wicon;
}
