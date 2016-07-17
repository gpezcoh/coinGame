var tot = 0;
var winners = [0,0];
var winDist = 0;
var close = 0;
var lim = document.getElementById("limit").value - 0.0;
var line = document.getElementById("line")
var table= document.getElementById("results");
var split = lim/10
console.log(lim)
// runALot(1000,100)

$(document).ready(function(){
	console.log("ayy")
	// for(var i = 0; i < lim/split; ++i){
	// 	var mark = document.createElement('div');
	// 	mark.className = "mark";
	// 	mark.style.left = 500 + i*lim/2 + "px"
	// 	line.appendChild(mark)
	// 	var mark2 = document.createElement('div');
	// 	mark2.className = "mark";
	// 	mark2.style.left = 500 - i*lim/2 + "px"
	// 	line.appendChild(mark2)
	// 	var text = document.createElement('p');
	// 	text.className = "dist";
	// 	text.style.left = 500 + i*lim/2 + "px"
	// 	text.textContent = i*split + "";
	// 	line.appendChild(text)
	// 	var text2 = document.createElement('p');
	// 	text2.className = "dist";
	// 	text2.style.left = 500 - i*lim/2 + "px"
	// 	text2.textContent = -1 * i*split + "";
	// 	line.appendChild(text2)
	// }
	prep()
})

function prep(){
	lim = document.getElementById("limit").value - 0.0;
	line = document.getElementById("line")
	table= document.getElementById("results");
	for(var i = 0; i < lim/split; ++i){
		var mark = document.createElement('div');
		mark.className = "mark";
		mark.style.left = 500 + i*lim/2 + "px"
		line.appendChild(mark)
		var mark2 = document.createElement('div');
		mark2.className = "mark";
		mark2.style.left = 500 - i*lim/2 + "px"
		line.appendChild(mark2)
		var text = document.createElement('p');
		text.className = "dist";
		text.style.left = 500 + i*lim/2 + "px"
		text.textContent = i*split + "";
		line.appendChild(text)
		var text2 = document.createElement('p');
		text2.className = "dist";
		text2.style.left = 500 - i*lim/2 + "px"
		text2.textContent = -1 * i*split + "";
		line.appendChild(text2)
	}
}

function preRun(){
	$("#warning").hide()
	$("#running").show()
	if(lim !== document.getElementById("limit").value){
		prep()
	}
	timeoutID = window.setTimeout(runALot, 500);
}

function restart(){
	tot = 0;
	winners = [0,0];
	winDist = 0;
	close = 0;
}

function runALot(){
	restart()
	var iterations = document.getElementById("iterations").value;
	var limit = document.getElementById("limit").value;
	var marker = document.getElementById("marker");
	for(var i = 0; i < iterations; ++i){
		var res = run(limit)
		tot += res[0]
		winDist += res[2]
		if(res[1]){
			winners[1]++
		}
		else{
			winners[0]++			
		}
	}
	var avg = (tot - 0.0)/iterations
	var winDistAvg = (winDist - 0.0)/iterations
	var closeAvg = (close-0.0)/iterations

	var row = table.insertRow()
	var col1 = row.insertCell(0)
	var col2 = row.insertCell(1)
	var col3 = row.insertCell(2)
	var col4 = row.insertCell(3)
	col1.textContent = avg.toFixed(2)
	col2.textContent = winDistAvg.toFixed(2)
	col3.textContent = ((avg-0.0)/winDistAvg).toFixed(2)
	col4.textContent = (closeAvg * 100).toFixed(2) + "%"

	$("#running").hide()
	// console.log("avg flips= " + avg)
	// console.log("winners= " + winners)
	// console.log("winDist= " + winDistAvg)
	// console.log("closest= " + closeAvg)
	// console.log("flips/winDist=" + (avg-0.0)/winDistAvg)
}

function run(limit){
	var flips = 0;
	var winner = 0;
	var yours = choose(-1,limit);
	var friends = choose(1,limit);
	createOrChange(yours,friends);
	var result;
	var left = marker.style.left.split(0,-2) - 0.0;
	while(winner !== yours && winner !== friends){
		result = Math.floor(Math.random() * 2);
		if(!result){
			winner--
		}
		else if (result === 1){
			winner++
		}
		else{
			console.log("wtf");
		}
		flips++
	// 		$(marker).animate({
	// 	"left": 500 + winner*lim/20 + "px"
	// },0.01);
	}
	// $(marker).css({
	// 	"left": 500 + winner*lim/20 + "px"
	// });
	var who = 0;
	var closest = Math.min(Math.abs(yours),friends)
	// console.log(closest)
	if(Math.abs(winner) === closest){
		// who = 1
		close++
	}
	if(winner === yours){
		who = 1
	}
	// else{
	// 	console.log(Math.max(Math.abs(yours),friends) - closest)
	// }
	return [flips,who, Math.abs(winner-0.0)]
}

function choose(neg,limit){
	var res = neg * Math.ceil(Math.random() * limit);
	if(res === 0){
		return choose(neg,limit)
	}
	return res;
}

function createOrChange(you,friend) {
	if(document.getElementById("you")){
		document.getElementById("you").style.left = 500 + you*lim/20 + "px";
		document.getElementById("friend").style.left = 500 + friend*lim/20 + "px";
	}
	else{
		create(you,friend)
	}
}

function create(woohoo,wtf) {
	var yours = document.createElement('div');
	yours.id = "you";
	yours.className = "circle";
	yours.style.left = 500 + woohoo*lim/20 + "px"
	line.appendChild(yours)
	var friends = document.createElement('div');
	friends.id = "friend";
	friends.className = "circle";
	friends.style.left = 500 + wtf*lim/20 + "px"
	line.appendChild(friends)
}