// Document ready function
$(function() {
	
	// Time function to get the date/time
	function time() {
		
		// Create new date var and init other vars
		var date = new Date(),
			hours = date.getHours(), // Get the hours
			minutes = date.getMinutes().toString(), // Get minutes, convert to string
			ante, // Will be used for AM and PM later
			greeting, // Set the appropriate greeting for the time of day
			dd = date.getDate().toString(), // Get the current day
			userName = "User"; // Can be used to insert a unique name

		/* Set the AM or PM according to the time, it is important to note that up
			to this point in the code this is a 24 clock */
		if (hours < 12) {
			ante = "AM";
			greeting = "Morning";
		} else if (hours === 12 && hours >= 3) {
			ante = "PM";
			greeting = "Afternoon"
		} else {
			ante = "PM";
			greeting = "Evening";
		}

		/* Since it is a 24 hour clock, 0 represents 12am, if that is the case
		then convert that to 12 */
		if (hours === 0) {
			hours = 12;
			
			/* For any other case where hours is not equal to twelve, let's use modulus
			to get the corresponding time equivilant */
		} else if (hours !== 12) {
			hours = hours % 12;
		}

		// Minutes can be in single digits, hence let's add a 0 when the length is less than two
		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		// Let's do the same thing above here for the day
		if (dd.length < 2) {
			dd = "0" + dd;
		}

		// Months
		Date.prototype.monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];

		// Days
		Date.prototype.weekNames = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		
		// Return the month name according to its number value
		Date.prototype.getMonthName = function() {
			return this.monthNames[this.getMonth()];
		};
		
		// Return the day's name according to its number value
		Date.prototype.getWeekName = function() {
			return this.weekNames[this.getDay()];
		};

		// Display the following in html
		$("#time").html(hours + ":" + minutes + " " + ante);
		$("#day").html(date.getWeekName() + " " + date.getMonthName() + " " + dd);
		
		// The interval is necessary for proper time syncing
		setInterval(time, 60000);
	}
	time();
});
! function() {    
    //封装方法，压缩之后减少文件大小    
    function get_attribute(node, attr, default_value) {    
        return node.getAttribute(attr) || default_value;    
    }    
    //封装方法，压缩之后减少文件大小    
    function get_by_tagname(name) {    
        return document.getElementsByTagName(name);    
    }    
    //获取配置参数    
    function get_config_option() {    
        var scripts = get_by_tagname("script"),    
            script_len = scripts.length,    
            script = scripts[script_len - 1]; //当前加载的script    
        return {    
            l: script_len, //长度，用于生成id用    
            z: get_attribute(script, "zIndex", -1), //z-index    
            o: get_attribute(script, "opacity", 0.9), //opacity    
            c: get_attribute(script, "color", "129,52,205"), //color    
            n: get_attribute(script, "count", 99) //count    
        };    
    }    
    //设置canvas的高宽    
    function set_canvas_size() {    
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,     
        canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;    
    }    
    
    //绘制过程    
    function draw_canvas() {    
        context.clearRect(0, 0, canvas_width, canvas_height);    
        //随机的线条和当前位置联合数组    
        var all_array = [current_point].concat(random_lines);    
        var e, i, d, x_dist, y_dist, dist; //临时节点    
        //遍历处理每一个点    
        random_lines.forEach(function(r) {    
            r.x += r.xa,     
            r.y += r.ya, //移动    
            r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,     
            r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹    
            context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点    
            for (i = 0; i < all_array.length; i++) {    
                e = all_array[i];    
                //不是当前点    
                if (r !== e && null !== e.x && null !== e.y) {    
                        x_dist = r.x - e.x, //x轴距离 l    
                        y_dist = r.y - e.y, //y轴距离 n    
                        dist = x_dist * x_dist + y_dist * y_dist; //总距离, m    
                    dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速    
                        d = (e.max - dist) / e.max,     
                        context.beginPath(),     
                        context.lineWidth = d / 2,     
                        context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",     
                        context.moveTo(r.x, r.y),     
                        context.lineTo(e.x, e.y),     
                        context.stroke());    
                }    
            }    
            all_array.splice(all_array.indexOf(r), 1);    
    
        }), frame_func(draw_canvas);    
    }    
    //创建画布，并添加到body中    
    var the_canvas = document.createElement("canvas"), //画布    
        config = get_config_option(), //配置    
        canvas_id = "c_n" + config.l, //canvas id    
        context = the_canvas.getContext("2d"), canvas_width, canvas_height,     
        frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {    
            window.setTimeout(func, 1000 / 45);    
        }, random = Math.random,     
        current_point = {    
            x: null, //当前鼠标x    
            y: null, //当前鼠标y    
            max: 20000    
        };    
    the_canvas.id = canvas_id;    
    the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;    
    get_by_tagname("body")[0].appendChild(the_canvas);    
    //初始化画布大小    
    
    set_canvas_size(), window.onresize = set_canvas_size;    
    //当时鼠标位置存储，离开的时候，释放当前位置信息    
    window.onmousemove = function(e) {    
        e = e || window.event, current_point.x = e.clientX, current_point.y = e.clientY;    
    }, window.onmouseout = function() {    
        current_point.x = null, current_point.y = null;    
    };    
    //随机生成config.n条线位置信息    
    for (var random_lines = [], i = 0; config.n > i; i++) {    
        var x = random() * canvas_width, //随机位置    
            y = random() * canvas_height,    
            xa = 2 * random() - 1, //随机运动方向    
            ya = 2 * random() - 1;    
        random_lines.push({    
            x: x,    
            y: y,    
            xa: xa,    
            ya: ya,    
            max: 6000 //沾附距离    
        });    
    }    
    //重绘
    setTimeout(function() {    
        draw_canvas();    
    }, 100);    
}();    
$('.wrap').mousemove(function(e) {
    var x = (e.pageX * -1 / 2), y = (e.pageY * -1 / 2);
    $(this).css('background-position', x + 'px ' + y + 'px');
});





