//determines and tracks avg bpm
//locks avg bpm when consistant
//calculates node offset from avg
define(function(){
	function Averager(beatBox, maxVariance, avgBPMWindow, avgResetFactor) {
		var vars = {
			avgIndex: 0, 			  // next index for insertion into vars.avgNodes
			avgNodes: [], 			  // cyclical array to store the latest this.avgBPMWindow nodes		
			avgDeltaTap: 0,     // calculated average of time deltas of last this.avgBPMWindow taps
			avgBPM: 0,          // calculated average BPM of last this.avgBPMWindow taps
			lockedBPM: null,
			lockedDelta: null
		}
		avgBPMWindow = avgBPMWindow || 8;    // how many nodes to use in average calculations
		avgResetFactor = avgResetFactor || 2;  // average delta tap factor which causes running average to be reset
		maxVariance = maxVariance || 12;
		this.lock = function(bpm){
			vars.lockedBPM = bpm || vars.avgBPM;
			vars.lockedDelta = (60 * 1000)/(bpm / beatBox.timing);
			console.log('locked: '+vars.lockedBPM);
		};
		this.unlock = function() {
			vars.lockedBPM = null;
			vars.lockedDelta = null;
		}	
		this.getBPM = function() {
			return vars.lockedBPM || vars.avgBPM;
		}
		this.processNode = function(node) {
			if (
				node.deltaTap < vars.avgDeltaTap/avgResetFactor ||
				node.deltaTap > vars.avgDeltaTap*avgResetFactor
			) {
				// flush the averaging window
				vars.avgNodes = [];
				vars.avgIndex = 0;
			}
			vars.avgNodes[vars.avgIndex] = node;
			
			var totalBPM = 0, totalDeltaTap = 0;
			var avgNodeCount = Math.min(avgBPMWindow, vars.avgNodes.length)
			for (var i = 0; i < vars.avgNodes.length; i++) {
				totalDeltaTap += vars.avgNodes[i].deltaTap;
				totalBPM += vars.avgNodes[i].bpm;			
			};
			vars.avgBPM = totalBPM/avgNodeCount;
			vars.avgDeltaTap = totalDeltaTap/avgNodeCount;
			
			vars.avgNodes[vars.avgIndex].avgBPM = vars.avgBPM;

			if(vars.avgNodes.length === avgBPMWindow && vars.lockedBPM === null) {
				avgVariance = variance(vars.avgNodes, function(node) {return node.avgBPM});
				if(avgVariance < maxVariance) {
					this.lock();
				}				
			}

			if (++vars.avgIndex >= avgBPMWindow) {
				vars.avgIndex = 0;
			}
			node.offset = node.deltaTap - (vars.lockedDelta || vars.avgDeltaTap);
		}
	}
	function variance(array, func) {
		var total = 0;
		for (var i = 0; i < array.length; i++) {
			total += func(array[i]);		
		};
		var mean = total / array.length;
		var diffTotal = 0;
		for (var k = 0; k < array.length; k++) {
			diffTotal += Math.pow((mean - func(array[k])), 2);
		};
		return diffTotal/array.length;
	}
	return Averager;
});