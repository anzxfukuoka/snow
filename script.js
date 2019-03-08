window.onload = function(){

  //gen pref
  var size = 2;
  var g = 9.81;
  var imgsrc = './snow.png';
  var count = 200;
  var parallax = 0.04;
  //--------

  var canv = document.getElementById('snowcanv')
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
    console.log(event.movementX + " " + event.movementY);
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

    //Размер снежинки 5 - 7 мм и весит она 0,004 грамма
    this.size = Math.round(Math.random() * (7 - 5) + 5) * size ;
    this.m = Math.round(Math.random() * (0.006 * 0.001 - 0.002 * 0.001) + 0.002 * 0.001);

    var snowimg = new Image(128, 128);
    snowimg.src = imgsrc;
    this.image = snowimg;
  }

  var snowflakes = [];
  for(var i = 0; i < count; i++){
    snowflakes.push(new snowflake())
  }

  console.log(snowflakes);

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
    //console.log(snowflakes);
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
