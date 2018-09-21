SlideShow = function(target){
	this.slide = document.getElementById(target);
	this.slide.style.zIndex = 1;
	
	this.blankTB = 30;
	this.blankRL = 30;
	this.rowSpan = 5;
	
	this.context = this.slide.getContext("2d");
	this.bgImg = new Image();
	this.datas = [];
	this.dataIndex = 0;
	this.colorDic = {
		black:"rgb(0,0,0)",
		blue:"rgb(0,0,255)",
		red:"rgb(255,0,0)",
		green:"rgb(0,255,0)",
		glay:"rgb(128,128,128)",
		white:"rgb(255,255,255)",
	};
}

SlideShow.prototype.DrawPage = function(){
	this.context.clearRect(0,0,this.slide.width,this.slide.height);
	this.drawBackGround();
	
	var images = []
	for(var i= 0,obj;obj = this.datas[this.dataIndex][i];i++){
		if(obj.type == 0){
			if(obj.bold == true){
				this.context.font = "bold " + obj.style;
			} else {
				this.context.font = obj.style;
			}
			if(!obj.color){
				this.context.fillStyle = "rgb(0,0,0)";
			} else {
				if(this.colorDic[obj.color]){
					this.context.fillStyle = this.colorDic[obj.color];
				} else {
					this.context.fillStyle = obj.color;
				}
			}
			this.context.fillText(obj.str, obj.x , obj.y);
		} else if(obj.type == 1){
			var _this = this;
			var _obj = obj;
			var wx= obj.x;
			var wy = obj.y;
			
			images.push(new Image());
			images[images.length-1].alt = wx + "," +wy;
			images[images.length-1].onload = function() {
				var x = this.alt.split(",")[0];
				var y = this.alt.split(",")[1];
				
				if(x =="center") x = (_this.slide.width - this.width * _obj.scale) / 2;
				else if (x =="left") x = _this.blankLR;
				else if (x =="right") x = (_this.slide.width - this.width * _obj.scale) + _this.blankLR;
				if(y =="center") y = (_this.slide.height - this.height * _obj.scale) / 2;
				else if (y =="top") y = _this.blankTB;
				else if (y =="bottom") y = (_this.slide.height - this.height * _obj.scale) +_this.blankTB;
				
				if(_obj.scale > -1){
					_this.context.drawImage(this, x , y , this.width * _obj.scale, this.height * _obj.scale);
				} else {
					_this.context.drawImage(this,x, y);
				}
			};
			
			images[images.length-1].src = _obj.source;
		}
	}
	this.drawPageNum();
}

SlideShow.prototype.next = function(){
	if(!this.datas[this.dataIndex+1]){
		alert("ページが存在しません");
		return;
	}
	this.dataIndex +=1;
	this.DrawPage();
}
SlideShow.prototype.prev = function(){
	if(!this.datas[this.dataIndex-1]){
		alert("ページが存在しません");
		return;
	}
	this.dataIndex -=1;
	this.DrawPage();
}

SlideShow.prototype.setBackGround = function(source){
	this.bgImg.src = source;
}

SlideShow.prototype.jumppage = function(page){
	if(!this.datas[page-1]){
		alert("ページが存在しません");
		return;
	}
	this.dataIndex = page;
	this.DrawPage();
}


SlideShow.prototype.drawBackGround = function(){
	this.context.drawImage(this.bgImg, 0 , 0, this.slide.width,this.slide.height);
}

SlideShow.prototype.drawPageNum = function(){
	var tmpFont = this.context.font;
	var tmpColor = this.context.fillStyle;
	this.context.font = "40px 'ＭＳ Ｐゴシック'";
	this.context.fillStyle = "white";
	this.context.fillText(this.dataIndex + "/" + (this.datas.length - 1) +" p", this.slide.width - 150 , this.slide.height - 20);
	this.context.font = tmpFont;
	this.context.fillStyle = tmpColor;
}

SlideShow.prototype.addTextData = function(page,x,y,str,size,color,bold){
	if(!this.datas[page-1]){
		this.datas[page-1] = [];
	}
    var page1 = this.datas[page-1];
    var obj;
    obj = {
    	str:str,
    	type:0,
    	x:x,
    	y:y,
    	style:size + "px 'ＭＳ Ｐゴシック'",
    	bold: bold,
    	color:color
	}
    page1.push(obj);
}

SlideShow.prototype.addImageData = function(page,source,x,y,scale){
	if(!this.datas[page-1]){
		this.datas[page-1] = [];
	}
    var page1 = this.datas[page-1];
    var obj;
    obj = {
    	source:source,
    	type:1,
    	x:x,
    	y:y,
    	scale: scale,
	}
    page1.push(obj);
}
