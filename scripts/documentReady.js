define(function(){
	"use strict";
	return function(fn) {
		if (document.readyState === "complete") {
			fn({"target": document, "type": "DOMContentLoaded"});
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}
});