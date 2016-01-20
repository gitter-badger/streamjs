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
define(['EventEmitter'], function(EventEmitter){
	function HitWindow() {
		var ee = new EventEmitter(["goodHit","poorHit","miss"]);
		this.addEventListener = ee.addListener;
		var maxHitZone = {
			//+/- maximum hit offset in milliseconds
			good: 50,
			poor: 150,
		};
		var hitZone = {
			good: maxHitZone.good,
			poor: maxHitZone.poor,
		};
		var sumOffset;
		function updateSumOffset(hit) {
			sumOffset += hit.offset;
			if(Math.abs(sumOffset) > hitZone.poor) {
			}
		}
		this.processNode = function(node) {
			//check accuracy of node

		}
	}
	return HitWindow;
});