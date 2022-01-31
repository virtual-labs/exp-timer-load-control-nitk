let canvas = document.getElementById("canvas1");
let ctx = canvas1.getContext('2d');
let bridgeConnected = false;
let trip = false;
let trip1G = false;
let trip2G = false;
let trip12G = false;
let load1Timer = {value: 0, status: false}
let load2Timer = {value: 0, status: false};
let load3Timer = {value: 0, status: false};
let load4Timer = {value: 0, status: false};
let timer1 = 0, timer2 = 0, timer3 = 0, timer4 = 0;
function draw() {
	let c = document.getElementById('canvas').getContext('2d');
	let img = new Image();
	img.onload = function() {
		c.drawImage(img, 0, 0, img.width*0.7, img.height*0.6); 
	};
	img.src = './images/main.png';
}

let incomer1 = {
	acb: {id: 'u1',acbSwitch: false, acbOn: [108,220], acbOff:[135,220],  acbTrip: [158,220]},
	load1Status: {id: 'd1',loadMCCBSwitch: false, loadOn: [77,306], loadOff:[107,306],mainLoad: false, mainLoadOn: [41,482], mainLoadOff:[70,482], triangle: 52},
	load2Status: {id: 'd2',loadMCCBSwitch: false, loadOn: [193,306], loadOff:[217,306],mainLoad: false, mainLoadOn: [157,482], mainLoadOff:[182,482], triangle: 165},
}
let incomer2 = { 
	acb: {id: 'u2',acbSwitch: false, acbOn: [370,220], acbOff:[398,220],  acbTrip: [422,220]},
	load3Status: {id: 'd3',loadMCCBSwitch: false, loadOn:[306,306], loadOff:[332,306],mainLoad: false, mainLoadOn: [276,482], mainLoadOff:[302,482], triangle: 278},
	load4Status: {id: 'd4',loadMCCBSwitch: false,loadOn: [421,306], loadOff:[447,306],mainLoad: false, mainLoadOn: [388,482], mainLoadOff:[414,482],triangle: 392},
}
let incomerDG = {
	acb: {id: 'u3',acbSwitch: false, acbOn: [741,220], acbOff:[768,220],  acbTrip: [792,220]},
	load5Status: {id: 'd5',loadMCCBSwitch: false,loadOn: [623,306], loadOff:[648,306],mainLoad: false, mainLoadOn: [596,482], mainLoadOff:[622,482], triangle: 598},
	load6Status: {id: 'd6',loadMCCBSwitch: false, loadOn: [734,306], loadOff:[762,306],mainLoad: false, mainLoadOn: [698,482], mainLoadOff:[725,482], triangle: 708},
	load7Status: {id: 'd6',loadMCCBSwitch: false, loadOn: [847,306], loadOff:[870,306],mainLoad: false, mainLoadOn: [814,482], mainLoadOff:[837,482], triangle: 821},
}

let  acbBridge = {
	acb: {id: 'slant',acbSwitch: false,  acbOn: [508,233], acbOff:[535,232]},
}
draw();

function drawLine(){
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 2;
    ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(300, 150);
	ctx.stroke();
	ctx.closePath();
}

function drawArc(left, top, color, clearLeft, clearTop){
	ctx.clearRect(clearLeft-20, clearTop-20, 100, 50);
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.ellipse(left, top, 5, 9, 0, 0, 4 * Math.PI);
	ctx.fill();
}
function drawEqTriangle(ctx, side, cx, cy, color){
	ctx.clearRect(cx-10, cx-15, 25, 20);
    let h = side * (Math.sqrt(3)/2);   
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(cx, cy);
    ctx.beginPath(); 
	ctx.moveTo(0, h / 2);
	ctx.lineTo( -side / 2, -h / 2);
	ctx.lineTo(side / 2, -h / 2);
	ctx.lineTo(0,h / 2);
	ctx.stroke();
	ctx.fill(); 
    ctx.save();
    ctx.restore();
    ctx.closePath();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}


function clearCanvas(){
	ctx.clearRect(66, 296, 100, 50);
}

function switchToggle(ele){
	if(ele.id == 'u1' || ele.id == 'd1' || ele.id == 'd2'){
		switch (ele.id) {
			case 'u1':
				incomer1.acb.acbSwitch = !incomer1.acb.acbSwitch;
				changeSwitch(incomer1.acb.acbSwitch, ele.id);
				toggleIndicatorACB(incomer1.acb);
				toggleIncomer12MainIndicator();
				// overAllConnectionControl();
				break;
			case 'd1':
				incomer1.load1Status.loadMCCBSwitch = !incomer1.load1Status.loadMCCBSwitch;
				changeSwitch(incomer1.load1Status.loadMCCBSwitch, ele.id)
				toggleIndicatorLoad(incomer1.load1Status);
				toggleIncomer12MainIndicator();
				break;
			case 'd2':
				incomer1.load2Status.loadMCCBSwitch = !incomer1.load2Status.loadMCCBSwitch;
				changeSwitch(incomer1.load2Status.loadMCCBSwitch, ele.id)
				toggleIndicatorLoad(incomer1.load2Status);
				toggleIncomer12MainIndicator();
				break;
			default:
				break;
		}
	}
	if(ele.id == 'u2' || ele.id == 'd3' || ele.id == 'd4'){
		switch (ele.id) {
			case 'u2':
				incomer2.acb.acbSwitch = !incomer2.acb.acbSwitch;
				changeSwitch(incomer2.acb.acbSwitch, ele.id);
				toggleIndicatorACB(incomer2.acb);
				toggleIncomer12MainIndicator();
				break;
			case 'd3':
				incomer2.load3Status.loadMCCBSwitch = !incomer2.load3Status.loadMCCBSwitch;
				changeSwitch(incomer2.load3Status.loadMCCBSwitch, ele.id)
				toggleIndicatorLoad(incomer2.load3Status);
				toggleIncomer12MainIndicator();
				break;
			case 'd4':
				incomer2.load4Status.loadMCCBSwitch = !incomer2.load4Status.loadMCCBSwitch;
				changeSwitch(incomer2.load4Status.loadMCCBSwitch, ele.id)
				toggleIndicatorLoad(incomer2.load4Status);
				toggleIncomer12MainIndicator();
				break;
			default:
				break;
		}
	}
	if(ele.id == 'u3' || ele.id == 'd5' || ele.id == 'd6' || ele.id == 'd7'){
		switch (ele.id) {
			case 'u3':
				incomerDG.acb.acbSwitch = !incomerDG.acb.acbSwitch;
				changeSwitch(incomerDG.acb.acbSwitch, ele.id)
				toggleIndicatorACB(incomerDG.acb);
				toggleIncomerDGMainIndicator();
				break;
			case 'd5':
				incomerDG.load5Status.loadMCCBSwitch = !incomerDG.load5Status.loadMCCBSwitch;
				changeSwitch(incomerDG.load5Status.loadMCCBSwitch, ele.id);
				toggleIndicatorLoad(incomerDG.load5Status);
				toggleIncomerDGMainIndicator();
				break;
			case 'd6':
				incomerDG.load6Status.loadMCCBSwitch = !incomerDG.load6Status.loadMCCBSwitch;
				changeSwitch(incomerDG.load6Status.loadMCCBSwitch, ele.id);
				toggleIndicatorLoad(incomerDG.load6Status);
				toggleIncomerDGMainIndicator();
				break;
			case 'd7':
				incomerDG.load7Status.loadMCCBSwitch = !incomerDG.load7Status.loadMCCBSwitch;
				changeSwitch(incomerDG.load7Status.loadMCCBSwitch, ele.id);
				toggleIndicatorLoad(incomerDG.load7Status);
				toggleIncomerDGMainIndicator();
				break;
			default:
				break;
		}
	}
	if(ele.id == 'slant'){
		acbBridge.acb.acbSwitch = !acbBridge.acb.acbSwitch;
		bridgeConnected = checkForBridge();
		changeSwitch(acbBridge.acb.acbSwitch, ele.id);
		toggleIndicatorACB(acbBridge.acb);
		if(bridgeConnected){
			overAllConnectionControl();
		} else {
			toggle12();
			toggleDG();
		}
	}
}

function changeSwitch(status, id){
	if(id == 'slant'){
		document.getElementById(id).src = status ? './images/slantClose.png': './images/slantOpen.png';
	} else {
		document.getElementById(id).src = status ? './images/swClose.png': './images/swOpen.png';
	}	
}

function toggleIndicatorACB(acb){
	trip = (((incomer1.acb.acbSwitch && incomerDG.acb.acbSwitch && bridgeConnected) || (incomer2.acb.acbSwitch && incomerDG.acb.acbSwitch && bridgeConnected) ||(incomer1.acb.acbSwitch && incomerDG.acb.acbSwitch && incomer2.acb.acbSwitch && bridgeConnected) || (!incomer1.acb.acbSwitch && !incomerDG.acb.acbSwitch && !incomer2.acb.acbSwitch && bridgeConnected)) && bridgeConnected)? true : false;
	if(!trip){
		if(acb.acbSwitch){
			drawArc(acb.acbOn[0], acb.acbOn[1], '#00ff00',acb.acbOff[0], acb.acbOff[1] );
		} else {
			drawArc(acb.acbOff[0], acb.acbOff[1], '#ff0000', acb.acbOn[0], acb.acbOn[1]);
		}
		if(incomer1.acb.acbSwitch){
			drawArc(incomer1.acb.acbOn[0], incomer1.acb.acbOn[1], '#00ff00',incomer1.acb.acbOff[0], incomer1.acb.acbOff[1] );
		}
		if(incomer2.acb.acbSwitch){
			drawArc(incomer2.acb.acbOn[0], incomer2.acb.acbOn[1], '#00ff00',incomer2.acb.acbOff[0], incomer2.acb.acbOff[1] );
		}
		if(incomerDG.acb.acbSwitch){
			drawArc(incomerDG.acb.acbOn[0], incomerDG.acb.acbOn[1], '#00ff00',incomerDG.acb.acbOff[0], incomerDG.acb.acbOff[1] );
		}
	} else if(trip){
		resetTimerSettings("timerLoad1","timerLoad1Text",load1Timer)
		resetTimerSettings("timerLoad2","timerLoad2Text",load2Timer)
		resetTimerSettings("timerLoad3","timerLoad3Text",load3Timer)
		resetTimerSettings("timerLoad4","timerLoad4Text",load4Timer)

		// resetTimerSetting);
		toggleIndicatorACBTripped(acb)
	}
}

function toggleIndicatorACBTripped(acb){ 
		if(incomer1.acb.acbSwitch){
			drawArcForTrip(incomer1.acb.acbTrip[0], incomer1.acb.acbTrip[1], 'yellow');
		} else {
			drawArc(incomer1.acb.acbOff[0], incomer1.acb.acbOff[1], '#ff0000', incomer1.acb.acbOn[0], incomer1.acb.acbOn[1],);
		}
		if(incomer2.acb.acbSwitch){
			drawArcForTrip(incomer2.acb.acbTrip[0], incomer2.acb.acbTrip[1], 'yellow');
		} else {
			drawArc(incomer2.acb.acbOff[0], incomer2.acb.acbOff[1], '#ff0000',incomer2.acb.acbOn[0], incomer2.acb.acbOn[1],);
		}
		if(incomerDG.acb.acbSwitch){
			drawArcForTrip(incomerDG.acb.acbTrip[0], incomerDG.acb.acbTrip[1], 'yellow');
		} else {
			drawArc(incomerDG.acb.acbOff[0], incomerDG.acb.acbOff[1], '#ff0000', incomerDG.acb.acbOn[0], incomerDG.acb.acbOn[1]);
		}
		drawArc(acbBridge.acb.acbOn[0],acbBridge.acb.acbOn[1], '#00ff00',acbBridge.acb.acbOff[0], acbBridge.acb.acbOff[1] );
	// }
}
function toggleIndicatorLoad(load){
	if(load.loadMCCBSwitch){
		drawArc(load.loadOn[0], load.loadOn[1], '#00ff00',load.loadOff[0], load.loadOff[1] );
		if(load.id == 'd1'){
			load1Timer.status = true;
		}
		if(load.id == 'd2'){
			load2Timer.status = true;
		}
		if(load.id == 'd3'){
			load3Timer.status = true;
		}
		if(load.id == 'd4'){
			load4Timer.status = true;
		}
	} else {
		drawArc(load.loadOff[0], load.loadOff[1], '#ff0000', load.loadOn[0], load.loadOn[1]);
	}
}


function toggleMainLoad(load){
	if(load.mainLoad){
		drawArc(load.mainLoadOn[0], load.mainLoadOn[1], '#00ff00',load.mainLoadOff[0], load.mainLoadOff[1] );
	} else {
		drawArc(load.mainLoadOff[0], load.mainLoadOff[1], '#ff0000', load.mainLoadOn[0], load.mainLoadOn[1]);
	}
}

function onload(){
	toggleIndicatorACB(incomer1.acb);
	toggleIndicatorLoad(incomer1.load1Status);
	toggleIndicatorLoad(incomer1.load2Status);

	toggleIndicatorACB(incomer2.acb);
	toggleIndicatorLoad(incomer2.load3Status);
	toggleIndicatorLoad(incomer2.load4Status);
	toggleIndicatorACB(incomerDG.acb);

	toggleIndicatorLoad(incomerDG.load5Status);
	toggleIndicatorLoad(incomerDG.load6Status);
	toggleIndicatorLoad(incomerDG.load7Status);

	toggleIndicatorACB(acbBridge.acb);

	toggleMainLoad(incomer1.load1Status);
	drawEqTriangle(ctx, 24, incomer1.load1Status.triangle, 430, '#ff0000'); 
	toggleMainLoad(incomer1.load2Status);
	drawEqTriangle(ctx, 24, incomer1.load2Status.triangle, 430, '#ff0000');


	toggleMainLoad(incomer2.load3Status);
	drawEqTriangle(ctx, 24, incomer2.load3Status.triangle, 430, '#ff0000');
	toggleMainLoad(incomer2.load4Status);
	drawEqTriangle(ctx, 24, incomer2.load4Status.triangle, 430, '#ff0000');

	toggleMainLoad(incomerDG.load5Status);
	drawEqTriangle(ctx, 24, incomerDG.load5Status.triangle, 430, '#ff0000');
	toggleMainLoad(incomerDG.load6Status);
	drawEqTriangle(ctx, 24, incomerDG.load6Status.triangle, 430, '#ff0000');
	toggleMainLoad(incomerDG.load7Status);
	drawEqTriangle(ctx, 24, incomerDG.load7Status.triangle, 430, '#ff0000');
}


function toggleIncomer12MainIndicator(){
	bridgeConnected = checkForBridge();
	if(!bridgeConnected){
		toggle12();
	}else{
		overAllConnectionControl();
	}
}

function toggleIncomerDGMainIndicator(){
	bridgeConnected = checkForBridge();
	if(!bridgeConnected){
		toggleDG();
	} else {
		overAllConnectionControl();
	}
}

function toggle12(){
	if(incomer1.acb.acbSwitch || incomer2.acb.acbSwitch){
		window.clearInterval(timer1);
		window.clearInterval(timer2);
		window.clearInterval(timer3);
		window.clearInterval(timer4);
		toggle12Switches();
	} else {
		window.clearInterval(timer1);
		window.clearInterval(timer2);
		window.clearInterval(timer3);
		window.clearInterval(timer4);
		resetTimerSettings("timerLoad1","timerLoad1Text",load1Timer)
		resetTimerSettings("timerLoad2","timerLoad2Text",load2Timer)
		resetTimerSettings("timerLoad3","timerLoad3Text",load3Timer)
		resetTimerSettings("timerLoad4","timerLoad4Text",load4Timer)
		controlLoadIncomer12(false);
	}
	if(!incomer1.acb.acbSwitch && !incomer2.acb.acbSwitch){
		window.clearInterval(timer1)
		window.clearInterval(timer2)
		window.clearInterval(timer3)
		window.clearInterval(timer4)
		controlLoadIncomer12(false);
	}
}
function toggle12Switches(){
	if(incomer1.load1Status.loadMCCBSwitch){
		window.clearInterval(timer1)
		timer1 = window.setInterval(load1TimerSetter, 800);
		// mainLoadIndicatorSetting(incomer1.load1Status, true);
	} else {
		window.clearInterval(timer1);
		resetTimerSettings("timerLoad1","timerLoad1Text",load1Timer)
		mainLoadIndicatorSetting(incomer1.load1Status, false);

	}
	if(incomer1.load2Status.loadMCCBSwitch){
		window.clearInterval(timer2)
		timer2 = window.setInterval(load2TimerSetter, 800);
		// mainLoadIndicatorSetting(incomer1.load2Status, true);
	} else {
		window.clearInterval(timer2);
		resetTimerSettings("timerLoad2","timerLoad2Text",load2Timer)
		mainLoadIndicatorSetting(incomer1.load2Status, false);
	}
	if(incomer2.load3Status.loadMCCBSwitch){
		window.clearInterval(timer3);
		// load3Timer.status = true;
		timer3 = window.setInterval(load3TimerSetter, 800);
		// mainLoadIndicatorSetting(incomer2.load3Status, true);
	} else {
		window.clearInterval(timer3);
		resetTimerSettings("timerLoad3","timerLoad3Text",load3Timer);
		mainLoadIndicatorSetting(incomer2.load3Status, false);
	}
	if(incomer2.load4Status.loadMCCBSwitch){
		window.clearInterval(timer4);
		// load4Timer.status = true;
		timer4 = window.setInterval(load4TimerSetter, 800);
		// mainLoadIndicatorSetting(incomer2.load4Status, true);
	} else {
		window.clearInterval(timer4);
		resetTimerSettings("timerLoad4","timerLoad4Text",load4Timer);
		mainLoadIndicatorSetting(incomer2.load4Status, false);
	}
}
function toggleDG(){
	if(incomerDG.acb.acbSwitch){
		toggleDGSwitches();
	} else {
		controlLoadIncomerDG(false);
	}
}
function toggleDGSwitches(){
	if(incomerDG.load5Status.loadMCCBSwitch){
		mainLoadIndicatorSetting(incomerDG.load5Status, true);
	} else {
		mainLoadIndicatorSetting(incomerDG.load5Status, false);
	}
	if(incomerDG.load6Status.loadMCCBSwitch){
		mainLoadIndicatorSetting(incomerDG.load6Status, true);
	} else {
		mainLoadIndicatorSetting(incomerDG.load6Status, false);
	}   
	if(incomerDG.load7Status.loadMCCBSwitch){
		mainLoadIndicatorSetting(incomerDG.load7Status, true);
	} else {
		mainLoadIndicatorSetting(incomerDG.load7Status, false);
	}
}
function mainLoadIndicatorSetting(outputLoad, status){
	outputLoad.mainLoad = status;
	toggleMainLoad(outputLoad);
	let color = outputLoad.mainLoad ? '#00ff00' : '#ff0000';
	drawEqTriangle(ctx, 24, outputLoad.triangle, 430, color);
}

function controlLoadIncomer12(status){
	mainLoadIndicatorSetting(incomer1.load1Status, status);
	mainLoadIndicatorSetting(incomer1.load2Status, status);
	mainLoadIndicatorSetting(incomer2.load3Status, status);
	mainLoadIndicatorSetting(incomer2.load4Status, status);
}

function controlLoadIncomerDG(status){
	mainLoadIndicatorSetting(incomerDG.load5Status, status);
	mainLoadIndicatorSetting(incomerDG.load6Status, status);
	mainLoadIndicatorSetting(incomerDG.load7Status, status);
}

function checkForBridge(){
	return acbBridge.acb.acbSwitch? true : false;
}

function turnOffAllLoad(){
	mainLoadIndicatorSetting(incomer1.load1Status, false);
	mainLoadIndicatorSetting(incomer1.load2Status, false);
	mainLoadIndicatorSetting(incomer2.load3Status, false);
	mainLoadIndicatorSetting(incomer2.load4Status, false);
	mainLoadIndicatorSetting(incomerDG.load5Status, false);
	mainLoadIndicatorSetting(incomerDG.load6Status, false);
	mainLoadIndicatorSetting(incomerDG.load7Status, false);
}

function overAllConnectionControl(){
	if(trip){
		trip1G = incomer1.acb.acbSwitch && incomerDG.acb.acbSwitch ? true : false;
		trip2G = incomer2.acb.acbSwitch && incomerDG.acb.acbSwitch ? true : false;
		trip12G = incomer1.acb.acbSwitch && incomer2.acb.acbSwitch && incomerDG.acb.acbSwitch ? true : false;
		window.clearInterval(timer1);
		window.clearInterval(timer2);
		window.clearInterval(timer3);
		window.clearInterval(timer4);
		if(incomer2.load3Status.loadMCCBSwitch){
			load3Timer.status = true;
		}
		if(incomer2.load4Status.loadMCCBSwitch){
			load4Timer.status = true;
		}
		turnOffAllLoad();
	} else {
		toggle12Switches();
		toggleDGSwitches();
	}
}

function drawArcForTrip(left, top, color){
	ctx.clearRect(left-100, top-20, 100, 50);
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.ellipse(left, top, 5, 9, 0, 0, 4 * Math.PI);
	ctx.fill();
}
onload();


function circuitStatus(){
	console.log(`1: ${incomer1.acb.acbSwitch}`);
	console.log(`2: ${incomer2.acb.acbSwitch}`);
	console.log(`DG: ${incomerDG.acb.acbSwitch}`);
	console.log(`bridge: ${bridgeConnected}`);
	console.log(`Trip: ${trip}`);
}

function toggleTip(ele){
	ele.style.opacity = ele.style.opacity == 1 ? 0 : 1
}

// function timer(){
// 	load1TimerSetter();
// }

function load1TimerSetter(){
	if(load1Timer.status == true){
		if(load1Timer.value <= 10){
			document.getElementById("timerLoad1Text").innerHTML = `On for 10s`;
			document.getElementById("timerLoad1Text").style.color = "green";
			document.getElementById("timerLoad1").innerHTML = load1Timer.value !=10 ? `00.0${load1Timer.value}` : `00.${load1Timer.value}`;
			load1Timer.value++;
			mainLoadIndicatorSetting(incomer1.load1Status, load1Timer.status );
			if(load1Timer.value == 11){
				load1Timer.value = 0;
				load1Timer.status = false;
			}
		} 
	}else if(load1Timer.status == false){
		if(load1Timer.value <= 5){
			document.getElementById("timerLoad1Text").innerHTML = `Off for 5s`;
			document.getElementById("timerLoad1Text").style.color = "red";
			document.getElementById("timerLoad1").innerHTML = load1Timer.value !=6 ? `00.0${load1Timer.value}` : `00.${load1Timer.value}`;
			load1Timer.value++;
			mainLoadIndicatorSetting(incomer1.load1Status, load1Timer.status );
			if(load1Timer.value == 6){
				load1Timer.value = 0;
				load1Timer.status = true;
			}
		}
	}
}


function load2TimerSetter(){
	if(load2Timer.status == true){
		if(load2Timer.value <= 8){
			document.getElementById("timerLoad2Text").innerHTML = `On for 8s`;
			document.getElementById("timerLoad2Text").style.color = "green";
			document.getElementById("timerLoad2").innerHTML = load2Timer.value !=9 ? `00.0${load2Timer.value}` : `00.${load2Timer.value}`;
			load2Timer.value++;
			mainLoadIndicatorSetting(incomer1.load2Status, load2Timer.status );
			if(load2Timer.value == 9){
				load2Timer.value = 0;
				load2Timer.status = false;
			}
		} 
	}else if(load2Timer.status == false){
		if(load2Timer.value <= 4){
			document.getElementById("timerLoad2Text").innerHTML = `Off for 4s`;
			document.getElementById("timerLoad2Text").style.color = "red";
			document.getElementById("timerLoad2").innerHTML = load2Timer.value !=5 ? `00.0${load2Timer.value}` : `00.${load2Timer.value}`;
			load2Timer.value++;
			mainLoadIndicatorSetting(incomer1.load2Status, load2Timer.status );
			if(load2Timer.value == 5){
				load2Timer.value = 0;
				load2Timer.status = true;
			}
		}
	}
}
function load3TimerSetter(){
	if(load3Timer.status == true){
		if(load3Timer.value <= 16){
			document.getElementById("timerLoad3Text").innerHTML = `On for 15s`;
			document.getElementById("timerLoad3Text").style.color = "green";
			document.getElementById("timerLoad3").innerHTML = load3Timer.value <=9 ? `00.0${load3Timer.value}` : `00.${load3Timer.value}`;
			load3Timer.value++;
			mainLoadIndicatorSetting(incomer2.load3Status, load3Timer.status );
			if(load3Timer.value == 17){
				load3Timer.value = 0;
				load3Timer.status = false;
				document.getElementById("timerLoad3Text").innerHTML = ``;
				document.getElementById("timerLoad3").innerHTML = ``;
				mainLoadIndicatorSetting(incomer2.load3Status, load3Timer.status );
			}
		} 
	}
	
}
function load4TimerSetter(){
	if(load4Timer.status == true){
		if(load4Timer.value <= 11){
			document.getElementById("timerLoad4Text").innerHTML = `On for 10s`;
			document.getElementById("timerLoad4Text").style.color = "green";
			document.getElementById("timerLoad4").innerHTML = load4Timer.value <=9 ? `00.0${load4Timer.value}` : `00.${load4Timer.value}`;
			load4Timer.value++;
			mainLoadIndicatorSetting(incomer2.load4Status, load4Timer.status );
			if(load4Timer.value == 12){
				load4Timer.value = 0;
				load4Timer.status = false;
				document.getElementById("timerLoad4Text").innerHTML = ``;
				document.getElementById("timerLoad4").innerHTML = ``;
				mainLoadIndicatorSetting(incomer2.load4Status, load4Timer.status );
			}
		} 
	}
}

function resetTimerSettings(textId,textIdText,timer){
	document.getElementById(textId).innerHTML = "";
	document.getElementById(textIdText).innerHTML = "";
	timer.value = 0;
	timer.limit = timer.upLimit;
	window.clearInterval(timer)
}