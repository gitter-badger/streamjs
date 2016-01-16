define(["documentReady", "EventEmitter"], function(ready, EventEmitter){
	"use strict";
	var InputManager = {};
	var emitter = new EventEmitter(['tap']);
	InputManager.addEventListener = emitter.addListener;

	var focus = document.createElement("input");
	focus.setAttribute('style', 'position:fixed;left:-100%;');
	ready(function(){
		document.body.appendChild(focus);
		var game = document.querySelector('.sjs-game');
		focus.focus();
		game.addEventListener("click", function(e){
			focus.focus();
		});
		focus.addEventListener('keydown', function(e){
			emitter.emit('tap');
		});
	});
	return InputManager;
});