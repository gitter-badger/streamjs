define(['inputManager'], function(input){
	function TextDisplay(beatBox, properties) {
		properties.width = Math.round(properties.width) || 100;
		properties.height = Math.round(properties.height) || 80;
		properties.parent = properties.parent || document.body;
		canvas = document.createElement('pre');
		canvas.style.width = properties.width + 'ch';
		canvas.addEventListener('click', input.focus);
		if(properties.parent instanceof Element) {
			properties.parent.appendChild(canvas);
		} else {
			document.querySelector(properties.parent).appendChild(canvas);
		}
		beatBox.width = properties.width - 4;
		beatBox.addEventListener('newNode', function(node){
			var grid;
			if (node.bpm === 0) {
				grid = makeGrid();
				grid[0][grid.avgLineY] = node;
			} else {
				grid = fillGrid()
			}
			draw(grid);
		});
		function makeGrid() {
			var grid = [];
			grid.length = properties.width - 4;
			for (var i=0; i<grid.length; i++) {
				grid[i] = [];
				grid[i].length = properties.height;
			}
			grid.minBPM = 0;
			grid.maxBPM = 0;
			grid.avgBPM = 0;
			grid.avgLineY = Math.floor(properties.height/2);
			return grid;
		}
		//creates 2d array of objects
		function fillGrid() {
			var sorted = beatBox.getNodes();
			var bounds = beatBox.getRange();
			var range = bounds.max - bounds.min;
			var bpm = beatBox.getBPM();
			var scale = properties.height / range;
			var grid = makeGrid();
			var t, node, y;
			for (t=0; t<sorted.length; t++) {
				node = sorted[t];
				y = properties.height - Math.round((node.bpm - bounds.min) * scale);
				grid[t][y] = node;
			}
			grid.avgBPM = Math.round(bpm);
			grid.avgLineY = properties.height - Math.round((bpm - bounds.min) * scale);
			grid.minBPM = Math.floor(bounds.min);
			grid.maxBPM = Math.ceil(bounds.max);
			return grid;
		}
		function pad(num, width) {
			var out = "";
			for (var pad=(width - (num+"").length); pad>0; pad--) {
				out += ' ';
			}
			out += num;
			return out;
		}
		function draw(objectsGrid) {
			var output = '';
			for(var y=0; y<properties.height; y++) {
				if (y === 0) {
					output += pad(objectsGrid.maxBPM, 3);
					output += "|";
				} else if (y === properties.height-1) {
					output += pad(objectsGrid.minBPM, 3);
					output += "|";
				} else if (objectsGrid.avgLineY === y) {
					output += pad(objectsGrid.avgBPM, 3);
					output += ">";
				} else {
					output += "   |";
				}
				for(var x = 0; x<objectsGrid.length; x++) {
					if (objectsGrid[x][y] instanceof Object) {
						output += "+";
					} else if (objectsGrid.avgLineY === y) {
						output += "-";
					} else if (objectsGrid[x][y] === undefined) {
						output += " ";
					} else {
						output += "?"; // shouldn't get here...
					}
				}
				output += '\n';
			}
			canvas.textContent = output;
		};
		draw(makeGrid());
	}
	return TextDisplay;
});