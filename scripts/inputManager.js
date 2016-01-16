define(["documentReady"], function(ready){
	"use strict";
	var InputManager = {};
	var callbacks = {'tap':[],'setBPM':[],'setDynamicBPM':[],'setMetronome':[],'setTiming':[]};
	InputManager.addEventListener = function(eventType, callback) {
		if (callbacks[eventType]) callbacks[eventType].push(callback);
	}

	var focus = document.createElement("input");
	focus.setAttribute('style', 'position:absolute;left:-100%');
	ready(function(){
		document.body.appendChild(focus);
		var game = document.querySelector('.sjs-game');
		focus.focus();
		game.addEventListener("click", function(e){
			focus.focus();
		});
		focus.addEventListener('keydown', function(e){
			callbacks["tap"].forEach(function(func){
				func({type:"tap", timeStamp:Date.now()});
			});
		});
	});
	return InputManager;
});