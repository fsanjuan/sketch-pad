/*
  Student: Félix Miguel Sanjuán Segovia
  Assignment 1.
*/

var blackboard = (function(){
	var mycanvas;
	var mycanvas2;
	var context;
	var context2;
	var x;
	var y;
	var drawsth;
	var backset;

	function handler (e) {

	// windows stores the event in the window.event variable
	// so we check for that first
	if (!e) var e = window.event;

	var posx = 0;
	var posy = 0;
	// check if the browser supports the pageX and pageY properties. 
	
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	
	 /* .. if not use clientX and clientY which are relative to the 
	 viewport (adding the amount the page may have scrolled */
	 	else if (e.clientX || e.clientY) 	{
	 		posx = e.clientX + document.body.scrollLeft
	 		+ document.documentElement.scrollLeft;
	 		posy = e.clientY + document.body.scrollTop
	 		+ document.documentElement.scrollTop;
	 	}	

	//Your code goes here.
	
	
	
	var coor = findPos(mycanvas);
	
	var offsetx = coor[0];
	var offsety = coor[1];
	
	x = posx-offsetx; 
	y = posy-offsety;
	
	
	//Changing the cursor
	//There is an easier way to do it just changing the cursor in the css
	/*
	if( x>0 && x<mycanvas.width && y>0 && y<mycanvas.height ){
		document.body.style.cursor='crosshair';
	}else{
		document.body.style.cursor='auto';
	}
	*/	

	mycanvas.onmousedown = startdrawing;
	mycanvas.onmouseup = finishdrawing;
	mycanvas.onmouseout = finishdrawing;
	
}

function draw(e){
	
	var thickness = document.getElementById('thickness').value;
	var colourstroke = document.getElementById('colour').value;
	var colourfill = document.getElementById('fillproperty').value;
	
	
	
	
	if( drawsth == true ){
		context.lineTo(x,y);
		context2.lineTo(x,y);
		if( thickness == 'Normal' ){
			context.lineWidth = 2;
			context2.lineWidth = 2;
		}else if( thickness == 'Thick' ){
			context.lineWidth = 3;
			context2.lineWidth = 3;
		}else if( thickness == 'Thin' ){
			context.lineWidth = 1;
			context2.lineWidth = 1;
		}
		context.strokeStyle = colourstroke;
		context2.strokeStyle = colourstroke;
		if( e.shiftKey == true ){
			context.fillStyle = colourfill;
			context.fill();
			context2.fillStyle = colourfill;
			context2.fill();
		}
		context.stroke();
		context2.stroke();
		
	}else{
		context.closePath();
		context2.closePath();
	}
}

function startdrawing(e){
	drawsth = true;
	context.beginPath();
	context2.beginPath();
	context.moveTo(x,y);
	context2.moveTo(x, y);
	
	mycanvas.onmousemove = draw;
}

function finishdrawing(){
	drawsth = false;
}

function clearblackboard(e){
	context.fillStyle = 'white';
	context.fillRect(0,0,mycanvas2.width,mycanvas2.height);
	context2.fillStyle = 'white';
	context2.fillRect(0,0,mycanvas2.width,mycanvas2.height);
	preparebackground();
}



function preparebackground(){
	//Set background image.

	var backpic = new Image();
	backpic.src = 'picture.jpg';
	
	backpic.onload = function(){
		
		mycanvas.width = backpic.width;
		mycanvas.height = backpic.height;
		mycanvas2.width = backpic.width;
		mycanvas2.height = backpic.height;
		context.drawImage(backpic,0,0);
	}
}

function prepareimagedownload(){
	var divdownload = document.getElementById('divdownload');
	divdownload.style.display = 'block';
	
	var picturedownload = document.getElementById('canvasimg');
	var imagelink = document.getElementById('imagelink');
	var imageURL = mycanvas2.toDataURL()
	picturedownload.src = imageURL;
	imagelink.setAttribute('href', imageURL);
}

function closeimagedownload(){
	var divdownload = document.getElementById('divdownload');
	divdownload.style.display = 'none';
}

//from quirksmode.org
//returns added offset of all containing elements
function findPos(obj) {
	var curleft = curtop = 0;

	if (obj.offsetParent) {


		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;


		} while (obj = obj.offsetParent);

		return [curleft,curtop];
	}

}


function start(){
	/*
	Do this at the begining because otherwise it wipes everything about the canvas.
	*/
	var htmltoadd = '<div id="divdownload">';
	htmltoadd += 		'<div id="divframe">';
	htmltoadd +=			'<img id="canvasimg" />';
	htmltoadd +=			'<div id="divoptionsdownload">';
	htmltoadd +=				'<a id="imagelink"><button>Download</button></a>';
	htmltoadd +=				'<button id="buttonclose">Close</button>';
	htmltoadd +=			'</div>'
	htmltoadd +=		'</div>';
	htmltoadd +=	'</div>';
	
	document.body.innerHTML += htmltoadd;
	
	
	mycanvas = document.getElementById('mycanvas');
	mycanvas2 = document.getElementById('mycanvas2');
	
	if(mycanvas.getContext && mycanvas2.getContext){
		
		context = mycanvas.getContext('2d');
		context2 = mycanvas2.getContext('2d');
		
		var clearbutton = document.getElementById('buttonclear');
		var closebutton = document.getElementById('buttonclose');
		closebutton.onclick = closeimagedownload;
		clearbutton.onclick = clearblackboard;
		
		preparebackground();

		window.onmousemove = handler;
		buttondownload.onclick = prepareimagedownload;

	}
}

window.onload = start;
})()