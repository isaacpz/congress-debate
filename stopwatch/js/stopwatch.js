var started = null;
var minutes = 0;
var seconds = 0;
var centiseconds = 0;
var active = false;

function incrementTimer() {
	if(!active)
		return;
    centiseconds = 0;
    seconds = 0;
    minutes = 0;
    
    var millisSince  = (new Date()).getTime() - started.getTime();
	centiseconds = millisSince * 0.1;
	while(centiseconds >= 100) {
		seconds++;
		centiseconds = centiseconds - 100;
	}
	while(seconds >= 60) {
		minutes++;
		seconds = seconds - 60;
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
    if(this.started == null)
        this.started = new Date();
	this.active = true;
}


function resetTime() {
	this.active = false;
    this.started = null;
	setPage();
}

function checkAlerts() {
	if(minutes == 1 && seconds == 59 && centiseconds == 0) {
		alertBackground(1);
	}
	if(minutes == 2 && seconds == 29 && centiseconds == 0) {
		alertBackground(2);
	}
	if(minutes == 2 && seconds == 54 && centiseconds == 0) {
		alertBackground(3);
	}
	if(minutes == 3 && seconds == 4 && centiseconds == 0) {
		alertBackground(5);
	}
}

function alertBackground(times) {
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
