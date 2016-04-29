var tries = 0;
var time_array = [];
var circle_times = [];
var square_times = [];
var diamond_times = [];
var triangle_times = [];

var circle = false;
var square = false;
var diamond = false;
var triangle = false;


start = new Date().getTime();

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isNumeric(a) {
    
    return !isNaN(a);
    
}

function makeShape() {

    var shape = document.getElementById("shape");
    shape.style.transform = "rotate(0deg)";

    var top = Math.random() * 350;
    var left = Math.random() * 1000;
    var shape_size = (Math.random() * 50) + 50;

    var shape_shifter = Math.random();

    if (shape_shifter <= 0.25){

        shape.style.borderLeft= shape.style.borderRight= shape.style.borderBottom= shape.style.borderTop= shape_size + 'px solid';
        shape.style.borderRadius="50%";
        circle = true;

      } else if (shape_shifter > 0.25 && shape_shifter <= 0.5){

        shape.style.borderLeft = shape.style.borderRight = shape.style.borderBottom = shape.style.borderTop = shape_size + 'px solid';
        shape.style.borderRadius="0";
        square = true;

      } else if (shape_shifter > 0.5 && shape_shifter <= 0.75) {


        shape.style.borderLeft = shape.style.borderRight = shape.style.borderBottom = shape.style.borderTop = shape_size + 'px solid';
        shape.style.borderRadius="0";
        shape.style.transform = "rotate(45deg)";
        diamond = true;

      } else {

        shape.style.borderLeft= shape.style.borderRight= shape_size + 'px solid transparent';
        shape.style.borderBottom= 2 * shape_size + 'px solid';
        shape.style.borderTop= '0';
        shape.style.borderRadius="0";
        triangle = true;
      }

    shape.style.marginTop = top + "px";
    shape.style.marginLeft = left + "px";

    shape.style.color = getRandomColor();
    shape.style.display = "block";

    start = new Date().getTime();

}


function DelayedAppearance() {

    document.getElementById("best_time").innerHTML = "Total number of tries: " + tries;
    tries++;

    setTimeout(makeShape, Math.random() * 3000);

}

DelayedAppearance();

document.getElementById("shape").onclick = function() {

    document.getElementById("shape").style.display = "none";

    var end = new Date().getTime();
    var time_taken = (end - start) / 1000;
    time_array.push(time_taken);

    if (circle == true) {

        circle_times.push(time_taken);

    } else if (square == true) {

        square_times.push(time_taken);

    } else if (diamond == true) {

        diamond_times.push(time_taken);

    } else if (triangle == true) {

        triangle_times.push(time_taken);

    }


    document.getElementById("timer").innerHTML = time_taken + "s";



    if (tries < 10) {

        DelayedAppearance();

    } else {

        document.getElementById("current_time").innerHTML = "";

        var min_time = Math.min(...time_array);
        var total_time = 0;
        for (var i = 0; i < time_array.length; i++) {
            total_time += time_array[i];
        }
        var avg_time = total_time/time_array.length;

        if (circle_times.length > 0) {

            var circle_time = 0;
            for (var i = 0; i < circle_times.length; i++) {
                circle_time += circle_times[i];
            }
            var circle_time_avg = circle_time/circle_times.length;
            circle_time_avg = circle_time_avg.toFixed(2);

        } else {

            var circle_time_avg = "No circles..."

        }

        if (square_times.length > 0) {

            var square_time = 0;
            for (var i = 0; i < square_times.length; i++) {
                square_time += square_times[i];
            }
            var square_time_avg = square_time/square_times.length;
            square_time_avg = square_time_avg.toFixed(2);

        } else {

            var square_time_avg = "No squares..."

        }

        if (diamond_times.length > 0) {

            var diamond_time = 0;
            for (var i = 0; i < diamond_times.length; i++) {
                diamond_time += diamond_times[i];
            }
            var diamond_time_avg = diamond_time/diamond_times.length;
            diamond_time_avg = diamond_time_avg.toFixed(2);

        } else {

            var diamond_time_avg = "No diamonds..."

        }

        if (triangle_times.length > 0) {

            var triangle_time = 0;
            for (var i = 0; i < triangle_times.length; i++) {
                triangle_time += triangle_times[i];
            }
            var triangle_time_avg = triangle_time/triangle_times.length;
            triangle_time_avg = triangle_time_avg.toFixed(2);

        } else {

            var triangle_time_avg = "No triangles..."

        }

        var avg_vals = [circle_time_avg, square_time_avg, diamond_time_avg, triangle_time_avg];
        var avg_names = ["circles...", "squares...", "diamonds...", "triangles..."];
        var min_avg = Math.pow(10, 5);
        var min_avg_name = "";
        for (var i = 0; i < avg_vals.length; i++) {
            
            if (isNumeric(avg_vals[i]) == true && avg_vals[i] < min_avg) {
                
                min_avg = avg_vals[i];
                min_avg_name = avg_names[i];
            }
        }
    

        document.getElementById("best_time").innerHTML = "You're done! <br><br>Best overall time: " + min_time.toFixed(2) + "<br>Overall average time: " + avg_time.toFixed(2) + "<br><br>Avg circle time: " + circle_time_avg + "<br>Avg square time: " + square_time_avg + "<br>Avg diamond time: " + diamond_time_avg + "<br>Avg triangle time: " + triangle_time_avg + "<br><br>Looks like you prefer " + min_avg_name;

    }

    circle = false;
    square = false;
    diamond = false;
    triangle = false;

}