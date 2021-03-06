// Adds a "0" to a digit so it'll look prettier if it's a single digit
function indentTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}

// Prints the newly acquired time left from the background script 
function processUpdate(update){
	document.getElementById('clock').innerHTML = indentTime(update.minutes) + ":" + indentTime(update.seconds);
}

// Requests an update from the background script to display to the user
function getUpdate(){

	var sending = browser.runtime.sendMessage({
		type: "update-request"
	});

	sending.then(processUpdate, function (error){return;});  
}

function sendGenericTimerStart(chosen_countdown){
		browser.runtime.sendMessage({
			type: "start",
			session_type: chosen_countdown
		});
}

function sendTimeBlock(){
	sendGenericTimerStart("time_block");
}

function sendSmallBreak(){
	sendGenericTimerStart("small_break");
}

function sendBigBreak(){
	sendGenericTimerStart("big_break");
}

function sendStop(){
		browser.runtime.sendMessage({
			type: "stop"
		});
}
// Processes the button clicks of the user
document.getElementById("time-block-button").addEventListener("click", sendTimeBlock);
document.getElementById("small-break-button").addEventListener("click", sendSmallBreak);
document.getElementById("big-break-button").addEventListener("click", sendBigBreak);
document.getElementById("stop-button").addEventListener("click", sendStop);

// Getting updates (the time to show the user) from the background JS.
getUpdate();

setInterval(getUpdate, 120);
