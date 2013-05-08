// function(cmd, chunk);
module.exports = {
	'[': function(cmd, chunk) {
		var csi = this.parseCsi(chunk);
		if(csi === null)
			return 0;
		else if(csi.length !== chunk.length && csi.cmd === '') {
			console.log("Garbaged CSI!");
			return 1;
		}

		var result = this.callHandler('csi', csi.cmd, csi.args, csi.mod);
		if(result === null)
			console.log("Unknown CSI handler " + csi.cmd);
		return result;
	},
	'(': function(cmd, chunk) {
		if(chunk[2] === undefined)
			return 0;
		this.buffer.mode.graphic = chunk[2] === '0';
		return 3;
	},
	')': '+',
	'*': '+',
	'+': function(chunk) {
		if(data[2] === undefined)
			return 0;
		term.mode.graphic = false;
		return 3;
	},
	'c': function(cmd, chunk) { // RIS / Reset
		term.reset();
		return 2;
	},
	'D': function(cmd, chunk) { // IND / Linefeed
		term.inject('\x84');
		return 2;
	},
	'E': function(cmd, chunk) { // NEL / Newline
		if(!term.mvCur(0, 1))
			term.insertLines(1);
		return 2;
	},
	'H': function(cmd, chunk) { // HTS / Set tab stop at current column
		term.tabSet();
		return 2;
	},
	'M': function(cmd, chunk) {// RI / Reverse linefeed
		if(term.cursor.y == term.scrollRegion[0])
			term.scroll('up');
		else
			term.mvCur(0, -1);
		return 2;
	},
	'N': function(cmd, chunk) {
		this.write('\x8e');
		return 2;
	},
	'O': function(cmd, chunk) {
		term.write('\x8f');
		return 2;
	},
	'P': function(cmd, chunk) {
		term.write('\x90');
		return 2;
	},
	'V': function(cmd, chunk) {
		term.write('\x96');
		return 2;
	},
	'W': function(cmd, chunk) {
		term.write('\x97');
		return 2;
	},
	'X': function(cmd, chunk) {
		term.write('\x98');
		return 2;
	},
	'Z': function(cmd, chunk) {
		term.write('\x9a');
		return 2;
	},
	'[': function(cmd, chunk) {
		term.write('\x9b');
		return 2;
	},
	'\\': function(cmd, chunk) {
		term.write('\x9c');
		return 2;
	},
	']': function(cmd, chunk) {
		term.write('\x9d');
		return 2;
	},
	'^': function(cmd, chunk) {
		term.write('\x9e');
		return 2;
	},
	'_': function(cmd, chunk) {
		term.write('\x9f');
		return 2;
	},
	'#': function(cmd, chunk) {
		if(chunk[2] === undefined)
			return 0;
		var line = this.buffer.getLine();
		switch(chunk[2]) {
		case '3':
			line.attr.doubletop = true;
			line.changed = true;
			break;
		case '4':
			line.attr.doublebottom = true;
			line.changed = true;
			break;
		case '5':
			line.attr.doublewidth = false;
			line.changed = true;
			break;
		case '6':
			line.attr.doublewidth = true;
			line.changed = true;
			break;
		}
		return 3;
	},
	'g': function(cmd, chunk) { //Visual Bell
		this.emit('bell', true);
		return 2;
	},
	'=': function(cmd, chunk) {
		return 2;
	},
	'<': '=',
	'>': '='
};