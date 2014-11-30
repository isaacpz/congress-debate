var minutes = 0;
var seconds = 0;
var centiseconds = 0;
var active = false;

function incrementTimer() {
	if(!active)
		return;
	centiseconds = centiseconds + 1;
	if(centiseconds >= 100) {
		seconds++;
		centiseconds = 0;
	}
	if(seconds >= 60) {
		minutes++;
		seconds = 0;
	}
	setPage();
	checkAlerts();
}

function setPage() {
	var centiseconds = "";
	if(this.centiseconds < 10)
		centiseconds = "0";
	centiseconds = centiseconds + this.centiseconds;
	
	var seconds = "";
	if(this.seconds < 10)
		seconds = "0";
	seconds = seconds + this.seconds;
	
	var minutes = "";
	if(this.minutes < 10)
		minutes = "0";
	minutes = minutes + this.minutes;
	
	$("#minutes").text(minutes);
	$("#seconds").text(seconds);
	$("#centiseconds").text(centiseconds);
}

function setPaused() {
	this.active = false;
}

function setResumed() {
	this.active = true;
}


function resetTime() {
	this.active = false;
	this.minutes = 0;
	this.seconds = 0;
	this.centiseconds = 0;
	setPage();
}

function checkAlerts() {	
	if(minutes == 2 && seconds == 0 && centiseconds == 0) {
		alertBackground(1);
	}
	if(minutes == 2 && seconds == 30 && centiseconds == 0) {
		alertBackground(2);
	}
	if(minutes == 2 && seconds == 55 && centiseconds == 0) {
		alertBackground(3);
	}
	if(minutes == 3 && seconds == 5 && centiseconds == 0) {
		alertBackground(5);
	}
}

function alertBackground(times) {
	console.log("alerting " + times);
	$('html body').delay(300).animate({backgroundColor: '#F7614D'}, 2, function() {
		$('html body').delay(300).animate({backgroundColor: '#ECF0F1'}, 2, function() {
			if(times > 1)
				alertBackground(times - 1);
		});
	});
}
$(document).ready(function() {
	setPage();
	setInterval(incrementTimer, 10);
});
