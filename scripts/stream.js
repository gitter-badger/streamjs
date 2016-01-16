
//input manager
	//capture keystrokes or ui, fire input event
	//events: tap, setBPM, setDynamicBPM, setMetronome, setTiming
//settingsPanel ?
	//gui buttons
//state
	//set with input events
	//current timing, metronome, dynamic bpm
	//getters
//beatbox
	//on input, 
		//calculate deltaTap (time now - last node timestamp)
		//calculate instantBPM
		//get avgDeltaTap, subtract deltaTap = offset
		//push node to stack node(timestamp, deltaTap, bpm, offset)
		//update avgBPM and avgDeltaTap
	//calculate: know last node, current time, getTiming
	//new node event
	//bpm
//hitwindow
	//private vars: blue, orange, red zone hit windows
		//targetHitWindowSize
		//currentHitWindowSize
		//hitWindowStep
		//sumOffset()
	//new graph node listener
		//create event for node accuracy
	//listen for node accuracy event
		//set targetHitWindowSize accordingly
		//add deltaBPM to sumOffset() 
	//request frame, tween actual size to target size
	//sumOffset() calls break event if total offset > || < currentHitWindowSize


//display maybe split
	//make canvas thing
	//make static line things
	//create initial things
	//get beatbox nodes
	//plot nodes
	//draw bpm line
	//get avg bpm
	//draw it
	//update hitwindow size

//audio
define(["inputManager","BeatBox"],function(input, BeatBox){
	"use strict";
	var bb = new BeatBox(input);
	return {};
});