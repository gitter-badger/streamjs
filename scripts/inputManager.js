define(["documentReady", "EventEmitter"], function(ready, EventEmitter){
	"use strict";
	var InputManager = {};
	var emitter = new EventEmitter(['tap']);
	InputManager.addEventListener = emitter.addListener;
	var focus = document.createElement("input");
	InputManager.focus = function() {
		focus.focus();
	}
	focus.setAttribute('style', 'position:fixed;left:-100%;');
	ready(function(){
		document.body.appendChild(focus);
		
		focus.focus();
		
		focus.addEventListener('keydown', function(e){
			emitter.emit('tap');
		});
	});
	return InputManager;
});