function f9() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById("textarea1").style.fontWeight = "normal";
	document.getElementById("textarea1").style.textAlign = "left";
	document.getElementById("textarea1").style.fontStyle = "normal";
	document.getElementById("textarea1").style.textTransform = "capitalize";
	document.getElementById("textarea1").value = " ";
}

//make sure to clear text area of white spaces
function f10() {
	//function to comment 
	let text1 = "//";

	var textArea = document.getElementById("textarea1");

	var lines = textArea.value.split("\n"); //getting lines
	let resultlines = [];


	var text = textArea.value.toString();
	var indexStart = textArea.selectionStart;
	var indexEnd = textArea.selectionEnd;
	var selectedText = text.substring(indexStart, indexEnd);

	let result = text1.concat("", selectedText);

	var final_string = "";
	if (lines[0] == selectedText) {
		final_string = final_string.concat("", result);

	} else {
		final_string = final_string.concat("", lines[0]);
	}

	// final_string = final_string.concat(" ",lines[0]); 
	for (var i = 1; i < lines.length; i++) {
		if (lines[i] == selectedText) {
			final_string = final_string.concat("\n", result);
		} else {
			final_string = final_string.concat("\n", lines[i]);
		}
	}
	document.getElementById("textarea1").value = final_string;

}

function f11() {
	//function to comment all lines
	let text1 = "//";
	var textArea = document.getElementById("textarea1");
	var lines = textArea.value.split("\n");

	let result = [];

	for (var i = 0; i < lines.length; i++) {
		if (lines[i] != "") {
			result[i] = text1.concat(" ", lines[i]);

		}
	}


	var final_string = "";
	final_string = final_string.concat(" ", result[0]);

	for (var i = 1; i < lines.length; i++) {
		if (lines[i] != "") {
			final_string = final_string.concat("\n ", result[i]);
		}
	}

	document.getElementById("textarea1").value = final_string;
}


function f12() {
	//function to comment 

	var textArea = document.getElementById("textarea1");

	var lines = textArea.value.split("\n"); //getting lines
	let resultlines = [];


	var text = textArea.value.toString();
	var indexStart = textArea.selectionStart;
	var indexEnd = textArea.selectionEnd;
	var selectedText = text.substring(indexStart, indexEnd);

	let result = selectedText.replace('//', '');


	var final_string = "";
	var final_string = "";
	if (lines[0] == selectedText) {
		final_string = final_string.concat("", result);

	} else {
		final_string = final_string.concat("", lines[0]);
	}

	for (var i = 1; i < lines.length; i++) {
		if (lines[i] == selectedText) {
			final_string = final_string.concat("\n", result);
		} else {
			final_string = final_string.concat("\n", lines[i]);
		}
	}
	document.getElementById("textarea1").value = final_string;

}

function f13() {
	const textarea = document.querySelector('textarea')
	textarea.addEventListener('input', () => {
		const text = textarea.value;
		const lines = text.split("\n");
		const count = lines.length;
		count.toString();
		console.log(count);
		var paragraph = document.getElementById("lineNo");
		var text2 = document.createTextNode(count);
		paragraph.appendChild(text2);
	})
}

//LINES NO.
var cntline;
	
function keyup(obj, e)
{
	if(e.keyCode >= 33 && e.keyCode <= 40) // arrows ; home ; end ; page up/down
		selectionchanged(obj, e.keyCode);
}

function selectionchanged(obj)
{
	var substr = obj.value.substring(0,obj.selectionStart).split('\n');
	var row = substr.length;
	var col = substr[substr.length-1].length;
	var tmpstr = '(' + row.toString() + ',' + col.toString() + ')';
	// if selection spans over 
	if(obj.selectionStart != obj.selectionEnd)
	{
		substr = obj.value.substring(obj.selectionStart, obj.selectionEnd).split('\n');
		row += substr.length - 1;
		col = substr[substr.length-1].length;
		tmpstr += ' - (' + row.toString() + ',' + col.toString() + ')';
	}
	obj.parentElement.getElementsByTagName('input')[0].value = tmpstr;
}

function input_changed(obj_txt)
{
	obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea')[0];
	cntline = count_lines(obj_txt.value);
	if(cntline == 0) cntline = 1;
	tmp_arr = obj_rownr.value.split('\n');
	cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10);
	// if there was a change in line count
	if(cntline != cntline_old)
	{
		obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
		populate_rownr(obj_rownr, cntline);
		scroll_changed(obj_txt);
	}
	selectionchanged(obj_txt);
}

function scroll_changed(obj_txt)
{
	obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea')[0];
	scrollsync(obj_txt,obj_rownr);
}

function scrollsync(obj1, obj2)
{
	// scroll text in object id1 the same as object id2
	obj2.scrollTop = obj1.scrollTop;
}

function populate_rownr(obj, cntline)
{
	tmpstr = '';
	for(i = 1; i <= cntline; i++)
	{
		tmpstr = tmpstr + i.toString() + '\n';
	}
	obj.value = tmpstr;
}

function count_lines(txt)
{
	if(txt == '')
	{
		return 1;
	}
	return txt.split('\n').length + 1;
}

//AUTOCOMPLETE FUNCTION

$(function() {
	var availableTags = ["Category", "Clop", "Check", "jQueryScript.net", "jQuery", "Free jQuery Plugins"];

	var minWordLength = 1;
	function split(val) {
	return val.split(' ');
	}
	
	function extractLast(term) {
	return split(term).pop();
	}
	$("#textarea1") 
	.bind("keydown", function(event) {
	if (event.keyCode === $.ui.keyCode.TAB && $(this).data("ui-autocomplete").menu.active) {
	event.preventDefault();
	}
	}).autocomplete({
	minLength: minWordLength,
	source: function(request, response) {

	var term = extractLast(request.term);
	if(term.length >= minWordLength){
	response($.ui.autocomplete.filter( availableTags, term ));
	}
	},
	focus: function() {
	return false;
	},
	select: function(event, ui) {
	var terms = split(this.value);
	terms.pop();
	terms.push(ui.item.value);
	terms.push("");
	this.value = terms.join(" ");
	return false;
	}
	});
	});

f13();