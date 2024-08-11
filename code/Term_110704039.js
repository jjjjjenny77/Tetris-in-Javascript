class tetris{
	constructor(side=35, width=20, height=15, speed=400){
    this.side = side             // 每個方塊邊長
    this.width = width           // 一行包含的方塊數
    this.height = height       	 // 一列包含的方塊數
    this.speed = speed           // 方塊下落移動速度
    this.num_blcok               // 當前方塊類型的數字變量
	this.type_color              // 當前顏色類型的字符串變量
	this.ident                   // setInterval的標認
	this.direction = 1           // 方塊方向,初始化為1，默認狀態    
	this.grade = 0               // 用來計算分數
    this.over = false            // 遊戲是否結束
    this.arr_bX = []           	 // 存放當前方塊的X坐標
    this.arr_bY = []           	 // 存放當前方塊的Y坐標
    this.arr_store_X = []        // 存放到達底部所有方塊的X坐標
    this.arr_store_Y = []        // 存放到達底部所有方塊的Y坐標
    this.arr_store_color = []    // 存放到達底部所有方塊的颜色
    this.paints = document.getElementById('tetris').getContext('2d')  //獲取畫筆
    self = this
}

// 封装paints方法，讓代碼更簡潔
paintfr(x, y, scale=1){
    this.paints.fillRect(x*this.side, y*this.side, scale*this.side, scale*this.side)
}


// 游戲開始
gameStart(){
	this.init()
	this.run()
}

// 初始化工作
init(){
	this.initBackground()
	this.initBlock()
}

// 方塊自動下落
run(){
	this.ident = setInterval("self.down_speed_up()", this.speed)
}

// 初始化地圖
initBackground(){
	this.paints.beginPath()
	this.paints.fillStyle='#000000'    		//地圖填充顏色為黑色
	for(let i = 0; i < this.height; i++){
		for(let j = 0; j < this.width; j++){
			this.paintfr(j, i)
		}
	}
	this.paints.closePath()
}

// 初始化方塊的位置和顏色
initBlock(){
	this.paints.beginPath()
	this.createRandom('rColor')        //生成顏色字符串，
	this.paints.fillStyle = this.type_color
	this.createRandom('rBlock')        //生成方塊類型數字
	this.arr_bX.forEach((item, index) => {
		this.paintfr(item, this.arr_bY[index], 0.9)
	})
	this.paints.closePath()
}

// 利用數组畫方塊
drawBlock(color){
	this.paints.beginPath()
	this.paints.fillStyle = color
	this.arr_bX.forEach((item, index) => {
		this.paintfr(item, this.arr_bY[index], 0.9)
	})
	this.paints.closePath()
}

// 畫已經在定位好的方塊
drawStaticBlock(){
	this.arr_store_X.forEach((item, index) => {
		this.paints.beginPath()
		this.paints.fillStyle = this.arr_store_color[index]
		this.paintfr(item, this.arr_store_Y[index], 0.9)
		this.paints.closePath()
	})
}

// 生成隨機數返回方塊類型或顏色類型
createRandom(type){
	let temp = this.width/2-1

	if (type == 'rBlock'){         //如果是方塊類型

		this.num_blcok = Math.round(Math.random()*4+1)
		
		switch(this.num_blcok){
			case 1:
				this.arr_bX.push(temp,temp-1,temp,temp+1)
				this.arr_bY.push(0,1,1,1)
				break
			case 2:
				this.arr_bX.push(temp,temp-1,temp-1,temp+1)
				this.arr_bY.push(1,0,1,1)
				break
			case 3:
				this.arr_bX.push(temp,temp-1,temp+1,temp+2)
				this.arr_bY.push(0,0,0,0)
				break
			case 4:
				this.arr_bX.push(temp,temp-1,temp,temp+1)
				this.arr_bY.push(0,0,1,1)
				break
			case 5:
				this.arr_bX.push(temp,temp+1,temp,temp+1)
				this.arr_bY.push(0,0,1,1)
				break
		}
	}
	
	if (type == 'rColor'){          //如果是顏色類型
	
		let num_color = Math.round(Math.random()*8+1) 

		switch(num_color){
			case 1:
				this.type_color='#3EF72A'
				break
			case 2:
				this.type_color='yellow'
				break
			case 3:
				this.type_color='#2FE0BF'
				break
			case 4:
				this.type_color='red'
				break
			case 5:
				this.type_color='gray'
				break
			case 6:
				this.type_color='#C932C6'
				break
			case 7:
				this.type_color= '#FC751B'
				break
			case 8:
				this.type_color= '#6E6EDD'
				break
			case 9:
				this.type_color= '#F4E9E1'
				break
		}
	}
}

// 判斷方塊之間是否碰撞(下)，以及變形時是否越過下邊界
judgeCollision_down(){
	
	for(let i = 0; i < this.arr_bX.length; i++){
		
		if (this.arr_bY[i] + 1 == this.height){ //變形時是否越過下邊界
			return false
		} 
		
		if (this.arr_store_X.length != 0) {    //判斷方塊之間是否碰撞(下)
			for(let j = 0; j < this.arr_store_X.length; j++){
				if (this.arr_bX[i] == this.arr_store_X[j]) {
					if (this.arr_bY[i] + 1 == this.arr_store_Y[j]) {
						return false
					}
				}
				
			}
		}    
	}
	return true
}

//判斷方塊之間是否碰撞(左右)，以及變形時是否越過左右邊界
judgeCollision_other(num){
	
	for(let i = 0; i < this.arr_bX.length; i++){
		
		if (num == 1) {            //變形時是否越過右邊界
			if (this.arr_bX[i] == this.width - 1) 
				return false
		}
		if (num == -1) {           //變形時是否越過左邊界
			if (this.arr_bX[i] == 0)
				return false
		}
		if (this.arr_store_X.length != 0) {                    //判斷方塊之間是否碰撞(左右)
			for(let j = 0; j < this.arr_store_X.length; j++){
				if (this.arr_bY[i] == this.arr_store_Y[j]) {
					if (this.arr_bX[i] + num == this.arr_store_X[j]) {
						return false
					}
				}
			}
		}
	}
	return true;
}


//方向鍵為下的加速函數
down_speed_up(){
	
	let flag_all_down = true
	
	flag_all_down = this.judgeCollision_down()
	
	if (flag_all_down) {
		this.initBackground()
		for(let i = 0; i < this.arr_bY.length; i++){
			this.arr_bY[i] = this.arr_bY[i] + 1
		}
	}
	else{
		for(let i=0; i < this.arr_bX.length; i++){
			this.arr_store_X.push(this.arr_bX[i])
			this.arr_store_Y.push(this.arr_bY[i])
			this.arr_store_color.push(this.type_color)
		}
	
		this.arr_bX.splice(0,this.arr_bX.length)
		this.arr_bY.splice(0,this.arr_bY.length)
		this.initBlock()
	}
	this.clearUnderBlock()
	this.drawBlock(this.type_color)
	this.drawStaticBlock()
	this.gameover()
}

//方向鍵為左右的左移動函數
move(dir_temp){
	
	this.initBackground()

	if (dir_temp == 1) {                    //右
		let flag_all_right = true
		flag_all_right = this.judgeCollision_other(1)
		
		if (flag_all_right) {
			for(let i = 0; i < this.arr_bY.length; i++){
				this.arr_bX[i] = this.arr_bX[i]+1
			}
		}
	}
	
	else{
		let flag_all_left = true
		flag_all_left = this.judgeCollision_other(-1)

		if (flag_all_left) {
			for(let i=0; i < this.arr_bY.length; i++){
				this.arr_bX[i] = this.arr_bX[i]-1
			}
		}
	}
	
	this.drawBlock(this.type_color)
	this.drawStaticBlock()
}

//方向鍵為空格的變換方向函數
up_change_direction(num_blcok){ 

	if (num_blcok == 5) {
		return
	}
	
	let arr_tempX = []
	let arr_tempY = []
	
	//因為不知道是否能夠變形成功，所以先儲存起来
	for(let i = 0;i < this.arr_bX.length; i++){    
		arr_tempX.push(this.arr_bX[i])
		arr_tempY.push(this.arr_bY[i])
	}
	
	this.direction++
	//將中心坐標提取出来，變形都以當前中心為準
	let ax_temp = this.arr_bX[0]    
	let ay_temp = this.arr_bY[0]
	
	this.arr_bX.splice(0, this.arr_bX.length)            //將數組清空 
	this.arr_bY.splice(0, this.arr_bY.length)

	if (num_blcok == 1) {
		
		switch(this.direction%4){
			case 1:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp+1,ay_temp+1,ay_temp+1)
				break
			case 2:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp,ax_temp)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp-1,ay_temp+1)
				break
			case 3:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp+1,ay_temp)
				break
			case 0:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp+1,ay_temp)
				break
		}
	}
	if (num_blcok == 2) {
		
		switch(this.direction%4){
			case 1:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp-1,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp-1,ay_temp)
				break
			case 2:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp,ax_temp-1)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp+1,ay_temp+1)
				break
			case 3:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp+1,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp,ay_temp+1)
				break
			case 0:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp+1,ay_temp-1)
				break
		}
	}
	if (num_blcok == 3) {
		
		switch(this.direction%4){
			case 1:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp+1,ax_temp+2)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp,ay_temp)
				break
			case 2:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp,ax_temp)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp+1,ay_temp+2)
				break
			case 3:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp+1,ax_temp+2)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp,ay_temp)
				break
			case 0:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp,ax_temp)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp+1,ay_temp+2)
				break
		}
	}
	if (num_blcok == 4) {
		
		switch(this.direction%4){
			case 1:
				this.arr_bX.push(ax_temp,ax_temp-1,ax_temp,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp,ay_temp+1,ay_temp+1)
				break
			case 2:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp+1,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp+1,ay_temp,ay_temp-1)
				break
			case 3:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp-1,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp,ay_temp-1)
				break
			case 0:
				this.arr_bX.push(ax_temp,ax_temp,ax_temp+1,ax_temp+1)
				this.arr_bY.push(ay_temp,ay_temp-1,ay_temp,ay_temp+1)
				break
		}
	}
	
	if (! (this.judgeCollision_other(-1) && this.judgeCollision_down()
		&& this.judgeCollision_other(1)  )) {      
	
		//如果變形不成功則執行下面代碼
		this.arr_bX.splice(0, this.arr_bX.length)             
		this.arr_bY.splice(0, this.arr_bY.length)
		for(let i=0; i< arr_tempX.length; i++){
			this.arr_bX.push(arr_tempX[i])
			this.arr_bY.push(arr_tempY[i])
		}
	}
	this.drawStaticBlock()
}

//一行滿了清空方塊，上面方塊Y坐標+1
clearUnderBlock(){
	
	//刪除低層方塊
	let arr_row=[]
	let line_num
	if (this.arr_store_X.length != 0) {
		for(let j = this.height-1; j >= 0; j--){
			for(let i = 0; i < this.arr_store_color.length; i++){
				if (this.arr_store_Y[i] == j) {
					arr_row.push(i)
				}
			}
			if (arr_row.length == this.width) {
				line_num = j
				break
			}else{
				arr_row.splice(0, arr_row.length)
			}
		}
	}
		
	if (arr_row.length == this.width) {
		
		//計算成績grade
		this.grade++
		
		document.getElementById('score').innerHTML = this.grade
		for(let i = 0; i < arr_row.length; i++){
			this.arr_store_X.splice(arr_row[i]-i, 1)
			this.arr_store_Y.splice(arr_row[i]-i, 1)
			this.arr_store_color.splice(arr_row[i]-i, 1)
		}
	
		//讓上面的方塊往下掉一格
		for(let i = 0; i < this.arr_store_color.length; i++){
			if (this.arr_store_Y[i] < line_num) {
				this.arr_store_Y[i] = this.arr_store_Y[i]+1
			}
		}
	}
}

//判斷遊戲結束
gameover(){
	
	for(let i=0; i < this.arr_store_X.length; i++){
		if (this.arr_store_Y[i] == 0) {
			clearInterval(this.ident);
			this.over = true;
			alert("Game over!");
			score.innerText = "Game Over！";
		}
	}
	
}
}

let tetrisObj = new tetris()
tetrisObj.gameStart()

//方向鍵功能函數
document.onkeydown = (e) => {   

	if (tetrisObj.over)
		return

	switch(e.keyCode){
		case 40:  // 方向為下
			tetrisObj.down_speed_up()
			break
		case 32:  // 空格換方向
			tetrisObj.initBackground()        //重畫地圖
			tetrisObj.up_change_direction(tetrisObj.num_blcok)
			tetrisObj.drawBlock(tetrisObj.type_color)
			break
		case 37:  // 方向為左
			tetrisObj.initBackground()
			tetrisObj.move(-1)
			tetrisObj.drawBlock(tetrisObj.type_color)
			break
		case 39:  // 方向為右
			tetrisObj.initBackground()
			tetrisObj.move(1)
			tetrisObj.drawBlock(tetrisObj.type_color)
			break
	}    
}