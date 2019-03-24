
// preferences
var size = 3;
var g = 9.81;
var imgsrc = 'https://cdn.iconscout.com/icon/free/png-256/cherry-blossom-flower-smell-33913.png';  // ./snow.png
var count = 100;
var parallax = 0.04;
var rainbowborder = true;
// --------

window.onload = function(){

  var canv = document.createElement("CANVAS");
  canv.id = 'snowcanv';
  canv.style.backgroundColor = "#00000000";
  canv.style.position = "fixed";
  canv.style.left = 0;
  canv.style.top = 0;
  canv.style.width = "100%";
  canv.style.zIndex = 10000;

  if(rainbowborder){
    canv.style.borderTop = "4px solid #fff";
    Rainbow(canv);
  }

  document.body.appendChild(canv);
  var ctx = canv.getContext('2d');

  var width, height;

  window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canv.width = width;
      canv.height = height;
    }
    resizeCanvas();

  window.addEventListener("mousemove", function(event) {
    for (var i = 0; i < snowflakes.length; i++) {
      snowflakes[i].x -= event.movementX * parallax;
      snowflakes[i].y -= event.movementY * parallax;
    }
  });




  var snowflake = function () {
    this.x = Math.round(Math.random() * width);
    this.y = Math.round(Math.random() * -height);
    this.dx = 1; //speed x
    this.dy = 1;  //speed y

    //Размер снежинки 5 - 7 мм и весит она  грамма
    this.size = (Math.random() * (7 - 5) + 5) * size ;
    this.m = Math.random() * 0.004 * 0.001;

    var snowimg = new Image(128, 128);
    snowimg.src = imgsrc;
    this.image = snowimg;
  }

  var snowflakes = [];
  for(var i = 0; i < count; i++){
    snowflakes.push(new snowflake())
  }


  var update = function(){
    for (var i = 0; i < snowflakes.length; i++) {

      snowflakes[i].x += snowflakes[i].dx;
      snowflakes[i].dx = Math.sin(180/Math.PI * snowflakes[i].y * 0.001);

      snowflakes[i].y += snowflakes[i].dy;
      snowflakes[i].dy += snowflakes[i].m * g; //F = mg

      if (snowflakes[i].y > height){
        snowflakes.splice(i, 1);
        snowflakes.push(new snowflake())
      }

    }
    draw();
  }

  var draw = function(){
    ctx.clearRect(0,0, width, height);
    for (var i = 0; i < snowflakes.length; i++) {
      ctx.drawImage(snowflakes[i].image,
                    snowflakes[i].x, snowflakes[i].y,
                    snowflakes[i].size, snowflakes[i].size);
    }
  }

  var loop = setInterval(update, 1000/60);

}

var Rainbow = function(el){
  var i = 0;
  var r = function(){
  	if (i < 360) {
  		var step = i % 360;
  		i++;
  	}else i = 0;
  	return "hsl(" + step + ", 100%, 50% )";
  }
  setInterval(function(){
  	el.style.borderColor = r();
  }, 20);

}
