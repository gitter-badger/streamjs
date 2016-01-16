define(function(){
	return function EventEmitter(events) {
		var callbacks = {};
		if (!events) events = [];
		events.forEach(function(value){
			callbacks[value] = [];
		});
		this.emit = function(eventType) {
			if(!callbacks[eventType]) {
				throw "Error: "+eventType+" does not exist.";
			}
			callbacks[eventType].forEach(function(func){
				func();
			});
		};
		this.addListener = function(eventType, callback) {
			if(!callbacks[eventType]) {
				throw "Error: "+eventType+" does not exist.";
			}
			callbacks[eventType].push(callback);
		};
	};
});