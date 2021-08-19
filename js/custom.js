$(function(){
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
    
      //console.log(new Date(1621922400*1000));
      //console.log(parseInt(new Date()/1000));
        $.ajax({
            url: apiurl,
            dataType: "json",
            type: "GET",
            async: "false",
            data: apidata,
            success: function (rs){
                console.log(rs);
                var fdays = '';
                var cityname = rs.city.name;
                $('.city').html(cityname);

                var nDate = new Date(rs.list[0].dt * 1000);
                // var nyear = nDate.getFullYear();
                var nmonth = nDate.getMonth() + 1;
                var ndt = nDate.getDate();
                var nweeks = weeks[nDate.getDay()];
                var ntimes = nDate.getHours();
                var nowDate = nmonth + "." + ndt + "." + nweeks + ". " + ntimes + "시";
                $('.now-date').html(nowDate);
                var icon = '<img src="images/' + rs
                    .list[0]
                    .weather[0]
                    .icon + '.png" alt="' + rs
                    .list[0]
                    .weather[0]
                    .main + '">';
                var temp = Number(rs.list[0].main.temp);
                var temp = temp.toFixed(1) + "ºc";
                var temp_min = Number(rs.list[0].main.temp_min);
                var temp_min = temp_min.toFixed(1) + "ºc";
                var temp_max = Number(rs.list[0].main.temp_max);
                var temp_max = temp_max.toFixed(1) + "ºc";

                var text = rs.list[0].weather[0].description;
                var text = text.replace('튼', '');
                var text = text.replace('실', '약한');
                var text = text.replace('온', '');
                var text = text.replace('약간의 구름이 낀 하늘', '약간 흐림')

                $('.w-icon').html(icon);
                $('.wicon').html(fdays)
                $('.temp').html(temp);
                $('.text').html(text);
                
                var bgcolor = function bgchange(){
                    if(rs.list[0].weather[0].icon == '01d'|| 
                    rs.list[0].weather[0].icon == '02d'||
                    rs.list[0].weather[0].icon == '50d'||
                    rs.list[0].weather[0].icon == '50n'){
                        $('.container-top').css({
                            'background-color': '#f6e8cf'
                        });
                    }else if(rs.list[0].weather[0].icon == '03d'||
                    rs.list[0].weather[0].icon == '04d'||
                    rs.list[0].weather[0].icon == '10d'){
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

                var bar = function barchange(){
                    if(rs.list[0].weather[0].icon == '01d'){
                        $('.bar').css({
                            'top': '10rem'
                        });
                    }else if(rs.list[0].weather[0].icon == '02d' ||
                    rs.list[0].weather[0].icon == '04d'){
                        $('.bar').css({
                            'top': '17.5rem'
                        });
                    }else if(rs.list[0].weather[0].icon == '01n' ||
                    rs.list[0].weather[0].icon == '04n'){
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
                var srise = new Date(rs.city.sunrise * 1000);
                var sunrise = srise.getHours() + "시" + srise.getMonth() + "분";
                var sset = new Date(rs.city.sunset * 1000);
                var sunset = sset.getHours() + "시" + sset.getMonth() + "분";
                $('.sunrise').html(sunrise);
                $(".sunset").html(sunset);
                //바람 rs.list[0].wind.speed; 습도 rs.list[0].main.humidity;
                $('.speed').html(rs.list[0].wind.speed + "m/s");
                $('.humidity').html(rs.list[0].main.humidity + "%");

                var mxlength = rs.list.length;
                for (var i = 0; i < mxlength; i++) {
                    var myDate = new Date(rs.list[i].dt * 1000);
                    // console.log(myDate);  console.log(rs.list[i].dt_txt);
                    // console.log(rs.list[i].main.temp);
                    var myyear = myDate.getFullYear();
                    var mymonth = myDate.getMonth() + 1;
                    var mydt = myDate.getDate();
                    var myweeks = weeks[myDate.getDay()];
                    var mytimes = myDate.getHours();
                    var temps = Number(rs.list[i].main.temp).toFixed(1) + "ºc";
                    var icons = weathericon(rs.list[i].weather[0].icon);
                    fdays += '<div class="weathers">';
                    fdays += '<div>';
                    fdays += '<p class="f-days">' + mydt + '일(' + myweeks + ')' + mytimes + '시</p>';
                    fdays += '<p class="f-temps">' + temps + '</p>';
                    fdays += icons;
                    fdays += '<p class="f-texts">' + rs
                        .list[i]
                        .weather[0]
                        .main + '</p>';
                    fdays += '</div>';
                    fdays += '</div>';
                }
                //console.log(ndt);
                // $('.slider').slick('unslick');
                // $('.slider').html(fdays);
                // $('.slider')
                //     .not('.slick-initialized')
                //     .slick(getSliderSetting());
                //console.log(fdays);
            },
            beforeSend: function () {
                $('.loading').removeClass('display-none');
            },
            complete: function () {
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
    }

    $('.week-box').click(function(){
        var box = $(this).data('box');
        
        if(box=='a'){
            $('.box2').animate({
                'left': '40%'
            },500);
            $('.box3').animate({
                'left': '60%'
            },500);
            $('.box4').animate({
                'left': '80%'
            },500);
        }else if(box=='b'){
            $('.box2').animate({
                'left': '20%'
            },500);
            $('.box3').animate({
                'left': '60%'
            },500);
            $('.box4').animate({
                'left': '80%'
            },500);
        }else if(box=='c'){
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

function weathericon(icon){
    var wicon;
    switch (icon) {
        case '01d':
            wicon = '<img src="images/thumb/01d" alt="sunny">';
            break;
        case '02d':
            wicon = '<img src="images/thumb/02d" alt="cloudy">';
            break;
        case '03d':
            wicon = '<img src="images/thumb/03d" alt="cloud">';
            break;
        case '04d':
            wicon = '<img src="images/thumb/04d" alt="cloudy">';
            break;
        case '09d':
            wicon = '<img src="images/thumb/09d" alt="rain">';
            break;
        case '10d':
            wicon = '<img src="images/thumb/10d" alt="rain">';
            break;
        case '11d':
            wicon = '<img src="images/thumb/11d" alt="thunderstorm">';
            break;
        case '13d':
            wicon = '<img src="images/thumb/13d" alt="snow">';
            break;
        case '50d':
            wicon = '<img src="images/thumb/50d" alt="windy">';
            break;
        case '01n':
            wicon = '<img src="images/thumb/01n" alt="night-clear">';
            break;
        case '02n':
            wicon = '<img src="images/thumb/02n" alt="cloudy">';
            break;
        case '03n':
            wicon = '<img src="images/thumb/03n" alt="cloud">';
            break;
        case '04n':
            wicon = '<img src="images/thumb/04n" alt="cloudy">';
            break;
        case '09n':
            wicon = '<img src="images/thumb/09n" alt="rain">';
            break;
        case '10n':
            wicon = '<img src="images/thumb/10n" alt="rain">';
            break;
        case '11n':
            wicon = '<img src="images/thumb/11n" alt="thunderstorm">';
            break;
        case '13n':
            wicon = '<img src="images/thumb/13n" alt="snow">';
            break;
        case '50n':
            wicon = '<img src="images/thumb/50n" alt="windy">';
            break;
    }
    return wicon;
}
