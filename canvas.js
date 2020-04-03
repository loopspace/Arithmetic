var dup;
var canvas; 
var form;
var aField;
var dField;
var nField;
var ctx;
var strokeWidth = 1;
var bg;
var fg;
var txtColour;
var lh = 30;
var border;
var width;
var height;
var fwidth;
var fheight;
var bwidth;
var bheight;
var gwidth;
var gheight;
var txtWidth;
var bw;
var inTouch;
var drawn;
var colourList;
var n,a,d;

function clear() {
    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, fwidth, fheight);
    // also fill bg (not necessary but looks nice when resizing)
    document.querySelector("body").style.backgroundColor = ctx.fillStyle;
    document.querySelector("form").style.color = txtColour;
    ctx.restore();
}


// drawing routine
function draw() {
    // clear background
    clear();
    ctx.save();
    ctx.fillStyle = fg;
    ctx.translate(border,border);
    ctx.font = '20px serif';
    var lw,rw;
    tm = ctx.measureText(a + ' + (' + n + '-1)' + d);
    rw = tm.width;
    tm = ctx.measureText(a);
    lw = tm.width;
    ctx.translate(lw,0);
    var i,m;
    m = 2 * a + (n-1)*d;
    ctx.fillStyle = fg;
    ctx.strokeStyle = txtColour;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    var w = Math.min(50,(gwidth - (lw + rw))/n);
    var h = Math.min(50,gheight/m);
    var btop = gheight - m*h;
    for (i=0;i<n;i++) {
	ctx.rect(i*w,gheight-(a + d*i)*h,w,(a + d*i)*h);
    }
    ctx.fill();
    if (w > 2*strokeWidth)
	ctx.stroke();

    ctx.strokeStyle = txtColour;
    ctx.lineWidth = 2;
    ctx.fillStyle = txtColour;

    ctx.beginPath();
    ctx.moveTo(0,gheight+10);
    ctx.lineTo(n*w,gheight+10);
    ctx.moveTo(5,gheight+5);
    ctx.lineTo(0,gheight+10);
    ctx.lineTo(5,gheight+15);
    ctx.moveTo(n*w-5,gheight+5);
    ctx.lineTo(n*w,gheight+10);
    ctx.lineTo(n*w-5,gheight+15);
    ctx.stroke();
    ctx.fillText(n,n*w/2,gheight+30);

    ctx.beginPath();
    ctx.moveTo(n*w+10,gheight);
    ctx.lineTo(n*w+10,gheight - (a + d*(n-1))*h);
    ctx.moveTo(n*w+10-5,gheight-5);
    ctx.lineTo(n*w+10,gheight);
    ctx.lineTo(n*w+10+5,gheight-5);
    ctx.moveTo(n*w+10-5,gheight - (a + d*(n-1))*h+5);
    ctx.lineTo(n*w+10,gheight - (a + d*(n-1))*h);
    ctx.lineTo(n*w+10+5,gheight - (a + d*(n-1))*h+5);
    ctx.stroke();
    ctx.fillText(a + ' + (' + n + '-1)' + d,n*w+20,gheight - (a + d*(n-1))*h/2);

    if (a*h > 10) {
	ctx.beginPath();
	ctx.moveTo(-10,gheight);
	ctx.lineTo(-10,gheight - a*h);
	ctx.moveTo(-10-5,gheight-5);
	ctx.lineTo(-10,gheight);
	ctx.lineTo(-10+5,gheight-5);
	ctx.moveTo(-10-5,gheight - a*h+5);
	ctx.lineTo(-10,gheight - a*h);
	ctx.lineTo(-10+5,gheight - a*h+5);
	ctx.stroke();
    }
    ctx.fillText(a,-15-lw,gheight - a*h/2);

    if (dup) {
	ctx.fillStyle = fg;
	ctx.strokeStyle = txtColour;
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();
	var w = Math.min(50,(gwidth - (lw + rw))/n);
	var h = Math.min(50,gheight/m);
	for (i=0;i<n;i++) {
	    ctx.rect((n-i-1)*w,btop,w,(a + d*i)*h);
	}
	ctx.fill();
	if (w > 2*strokeWidth)
	    ctx.stroke();


	ctx.strokeStyle = txtColour;
	ctx.lineWidth = 2;
	ctx.fillStyle = txtColour;
	if (a*h > 10) {
	    ctx.beginPath();
	    ctx.moveTo(n*w+10,btop);
	    ctx.lineTo(n*w+10,btop+ a*h);
	    ctx.moveTo(n*w+10-5,btop+5);
	    ctx.lineTo(n*w+10,btop);
	    ctx.lineTo(n*w+10+5,btop+5);
	    ctx.moveTo(n*w+10-5, btop+a*h-5);
	    ctx.lineTo(n*w+10, btop+a*h);
	    ctx.lineTo(n*w+10+5, btop+a*h-5);
	    ctx.stroke();
	}
	ctx.fillText(a,n*w+20,btop+a*h/2);
    }
    ctx.restore();
}


function resetSeries() {
    n = parseInt(nField.value,10);
    a = parseInt(aField.value,10);
    d = parseInt(dField.value,10);
    bw = gwidth/(n+1.5);
    draw();
}

function processForm() {
    switch (this.value) {
	case 'inca':
	aField.value = a + 5;
	break;
	case 'deca':
	aField.value = a - 5;
	break;
	case 'incaa':
	aField.value = a + 1;
	break;
	case 'decaa':
	aField.value = a - 1;
	break;
	case 'incd':
	dField.value = d + 5;
	break;
	case 'decd':
	dField.value = d - 5;
	break;
	case 'incdd':
	dField.value = d + 1;
	break;
	case 'decdd':
	dField.value = d - 1;
	break;
	case 'incn':
	nField.value = n + 10;
	break;
	case 'decn':
	nField.value = n - 10;
	break;
	case 'incnn':
	nField.value = n + 1;
	break;
	case 'decnn':
	nField.value = n - 1;
	break;
    }
    aField.value = Math.max(aField.value,0);
    dField.value = Math.max(dField.value,0);
    nField.value = Math.max(nField.value,1);
    resetSeries();
    return false;
}

function setSize() {
    var form = document.getElementById('values');
    fheight=window.innerHeight - form.offsetHeight;
    fwidth=window.innerWidth;
    canvas.height=fheight;
    canvas.width=fwidth;
    border = 20;
    width = fwidth - 2*border;
    height = fheight - 2*border;
    gwidth = width - bwidth;
    gheight = height - bheight;
}

function resize() {
    setSize();
    resetSeries();
}

window.addEventListener('resize', resize, false);
// init
function init() {
    // get context
    canvas=document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "12px \"Trebuchet MS\"";
    var tm = ctx.measureText(".00");
    txtWidth = tm.width;
    bwidth = tm.width + 10;
    bheight = 30;
    theight = 20;
    setSize();

    nField = document.getElementById("nValue");
    aField = document.getElementById("aValue");
    dField = document.getElementById("dValue");
    var form = document.getElementById('values');
    var elts = form.elements;
    for (var i = 0, element; element = elts[i++];) {
	if (element.type === "button")
		element.onclick = processForm;
    }
    document.getElementById("dup").onchange = function(e) {
	dup = e.target.checked;
	draw();
    }
    dup = document.getElementById("dup").checked;
    document.getElementById("bgcolor").onchange = function(e) {
	bg = e.target.value;
	var l = RGBtoHsl(bg)[2];
	if (l > .5) {
	    txtColour = 'black';
	} else {
	    txtColour = 'white';
	}

	if (window.localStorage)
	    localStorage.setItem('bg',bg);
	draw();
    }
    document.getElementById("fgcolor").onchange = function(e) {
	fg = e.target.value;
	if (window.localStorage)
	    localStorage.setItem('fg',fg);
	draw();
    }
    // init some values
    bg = '#ffffff';
    fg = '#330033';
    bg = document.getElementById("bgcolor").value;
    fg = document.getElementById("fgcolor").value;

    var h;
    if (window.localStorage) 
	h = localStorage.bg;
    if (h) {bg = h};
    var h;
    if (window.localStorage) 
	h = localStorage.fg;
    if (h) {fg = h};
    var l = RGBtoHsl(bg)[2];
    console.log(l);
    if (l > .5) {
	txtColour = 'black';
    } else {
	txtColour = 'white';
    }
    resetSeries();
}

// From http://stackoverflow.com/a/9493060/315213

// From http://stackoverflow.com/a/9493060/315213
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function RGBtoHsl(c) {
    var r = parseInt(c.substring(1,3),16);
    var g = parseInt(c.substring(3,5),16);
    var b = parseInt(c.substring(5,7),16);
    return rgbToHsl(r,g,b);
}
