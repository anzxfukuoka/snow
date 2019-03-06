var i = 0;

var Rainbow = function(){
	if (i < 360) {
		var step = i % 360;
		i++;
	}else i = 0;
	return "hsl(" + step + ", 100%, 50% )";
}
setInterval(function(){
	document.getElementById("snowcanv").style.borderColor = Rainbow();
}, 20);
