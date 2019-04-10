function set_date_1(num, dbl) {
    var num1 = $("#num_1");
    var num1s = $("#num_shadow_s_1");
    var num1l = $("#num_shadow_l_1");

    num1.removeClass().addClass("num n" + num);
    num1s.removeClass().addClass("shadow_s n" + num);
    num1l.removeClass().addClass("shadow_l n" + num);

    if (dbl) {
        num1.addClass("double");
        num1s.addClass("double");
        num1l.addClass("double");
    }
}

function set_date_2(num) {
    var num2 = $("#num_2");
    var num2s = $("#num_shadow_s_2");
    var num2l = $("#num_shadow_l_2");

    num2.removeClass().addClass("num n" + num);
    num2s.removeClass().addClass("shadow_s n" + num);
    num2l.removeClass().addClass("shadow_l n" + num);
}

function toggle_date_2(show) {
    $("#num_shadow_l_2").toggle(show);
    $("#num_shadow_s_2").toggle(show);
    $("#num_2").toggle(show);
}

function update_time() {
    var now = moment();
    var month = now.format("MMM").toLowerCase();
    var date = now.date();
    var datedig = date.toString().split('');
    var hour = now.hour();
    var dayofweek = now.format("dddd").toLowerCase();
    var tod = "morning";

    // modify month
    var calendar = $("#cal");
    calendar.removeClass().addClass(month);

    var isdbldigit = datedig.length > 1

    set_date_1(datedig[0], isdbldigit);

    if (isdbldigit) {
        set_date_2(datedig[1]);
        toggle_date_2(true);
    } else {
        toggle_date_2(false);
    }

    var day = $("#day");
    day.removeClass().addClass(dayofweek);

    if (hour < 5) {
        tod = "midnight";
    } else if (hour < 10) {
        tod = "morning";
    } else if (hour < 12) {
        tod = "bnoon";
    } else if (hour < 18) {
        tod = "anoon";
    } else {
        tod = "night";
    }

    $("#time").removeClass().addClass(tod);
}

function update_weather() {
    if (weatherKey && weatherUrl && weatherCity) {
        var wurl = weatherUrl + "?q=" + weatherCity + "&appid=" + weatherKey;

        $.ajax({
            url: wurl,
            dataType: "json",
            success: function (data) {
                var weather = "";
                var group = data["weather"][0]["main"];

                if (group == "Clouds" || group == "Atmosphere") {
                    weather = "cloud";
                } else if (group == "Clear") {
                    weather = "sun";
                } else if (group == "Rain" || group == "Thunderstorm" || group == "Drizzle" || group == "Extreme" || group == "Additional") {
                    weather = "rain";
                } else if (group == "Snow") {
                    weather = "snow";
                }

                if (weather) {
                    $("#weather").removeClass().addClass(weather);
                }
            }
        });
    }
}

$(function () {
    update_time();
    update_weather();

    setInterval(update_time, 60000);
    setInterval(update_weather, 900000);
});
