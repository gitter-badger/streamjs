/**
 * BeatBox
 *
 * Tracks "tap" events from an InputManager and calculates beat statistics.
 * Fires "newNode" events every time a new record is added to this.nodes
 */
define(["inputManager"], function(input){
	"use strict";
	function BeatBox(input) {
		var hiddenVars = { // private variables
			nodeIndex: 0, // next index for insertion into this.nodes
			avgIndex: 0, // next index for insertion into vars.avgNodes
			avgNodes: [] // cyclical array to store the latest this.avgBPMWindow nodes
		};
		this.beatboxHistory = 32; // how many nodes to store in history
		this.avgBPMWindow = 8;    // how many nodes to use in average calculations
		this.avgResetFactor = 2;  // delay time change factor that causes running average to be reset
		this.timing = 1/4;        // rhythym of taps
		this.avgDeltaTap = 0;     // calculated average of time deltas of last this.avgBPMWindow taps
		this.avgBPM = 0;          // calculated average BPM of last this.avgBPMWindow taps
		this.nodes = [];          // cyclical array of nodes, limited to this.beatboxHistory entries
		var that = this;
		this.addBeat = function(){addBeat.call(that, hiddenVars)};
		input.addEventListener('tap', this.addBeat);
	}
	function addBeat(vars) {
		var timeStamp = Date.now();
		var deltaTap, bpm;
		var previousNodeIndex = (this.nodes.length + vars.nodeIndex-1)%this.nodes.length;

		if (this.nodes[previousNodeIndex] && previousNodeIndex != vars.nodeIndex) {
			deltaTap = timeStamp - this.nodes[previousNodeIndex].timeStamp;
			bpm = this.timing/(deltaTap/(60 * 1000));
		} else {
			deltaTap = 0;
			bpm = 0;
		}
		var offset = deltaTap - this.avgDeltaTap;
		var newNode = {timeStamp:timeStamp, deltaTap:deltaTap, bpm:bpm, offset:offset};
		this.nodes[vars.nodeIndex] = newNode;

		if (
			deltaTap < this.avgDeltaTap/this.avgResetFactor ||
			deltaTap > this.avgDeltaTap*this.avgResetFactor
		) {
			// flush the averaging window
			vars.avgNodes = [];
			vars.avgIndex = 0;
		}
		vars.avgNodes[vars.avgIndex] = newNode;

		var totalBPM = 0, totalDeltaTap = 0;
		var avgNodeCount = Math.min(this.avgBPMWindow, vars.avgNodes.length)
		for (var i = 0; i < vars.avgNodes.length; i++) {
			totalDeltaTap += vars.avgNodes[i].deltaTap;
			totalBPM += vars.avgNodes[i].bpm;			
		};
		this.avgBPM = totalBPM/avgNodeCount;
		this.avgDeltaTap = totalDeltaTap/avgNodeCount;
		if (++vars.nodeIndex > this.beatboxHistory) {
			vars.nodeIndex = 0;
		}
		if (++vars.avgIndex > this.avgBPMWindow) {
			vars.avgIndex = 0;
		}
	}

	return BeatBox;
});