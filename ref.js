

var lines= 0;
var maxlines= 24;

function init()
{
    document.testform.t.value+= '';
    lines= 0;

    if (document.addEventListener)
    {
       document.addEventListener("keydown",keydown,false);
       document.addEventListener("keypress",keypress,false);
       document.addEventListener("keyup",keyup,false);
       document.addEventListener("textInput",textinput,false);
    }
    else if (document.attachEvent)
    {
       document.attachEvent("onkeydown", keydown);
       document.attachEvent("onkeypress", keypress);
       document.attachEvent("onkeyup", keyup);
       document.attachEvent("ontextInput", textinput);
    }
    else
    {
       document.onkeydown= keydown;
       document.onkeypress= keypress;
       document.onkeyup= keyup;
       document.ontextinput= textinput;   // probably doesn't work
    }
}

function showmesg(t)
{
   var old= document.testform.t.value;
   if (lines >= maxlines)
   {
   	var i= old.indexOf('\n');
	if (i >= 0)
	    old= old.substr(i+1);
   }
   else
   	lines++;

   document.testform.t.value= old + t + '\n';
}

function keyval(n)
{
    if (n == null) return 'undefined';
    var s= pad(3,n);
    if (n >= 32 && n < 127) s+= ' (' + String.fromCharCode(n) + ')';
    while (s.length < 9) s+= ' ';
    return s;
}

function keymesg(w,e)
{
    var row= 0;
    var head= [w, '        '];
    if (document.testform.classic.checked)
    {
	showmesg(head[row] +
            ' keyCode=' + keyval(e.keyCode) +
	    ' which=' + keyval(e.which) +
            ' charCode=' + keyval(e.charCode));
	row= 1;
    }
    if (document.testform.modifiers.checked)
    {
	showmesg(head[row] +
            ' shiftKey='+pad(5,e.shiftKey) +
	    ' ctrlKey='+pad(5,e.ctrlKey) +
	    ' altKey='+pad(5,e.altKey) +
	    ' metaKey='+pad(5,e.metaKey));
	row= 1;
    }
    if (document.testform.dom3.checked)
    {
	showmesg(head[row] +
	    ' key='+e.key +
	    ' char='+e.char +
	    ' location='+e.location +
	    ' repeat='+e.repeat);
	row= 1;
    }
    if (document.testform.olddom3.checked)
    {
	showmesg(head[row] +
	    ' keyIdentifier='+ pad(8,e.keyIdentifier)+
	    ' keyLocation='+e.keyLocation);
	row= 1;
    }
    if (row == 0)
	showmesg(head[row]);
}

function pad(n,s)
{
   s+= '';
   while (s.length < n) s+= ' ';
   return s;
}

function suppressdefault(e,flag)
{
   if (flag)
   {
       if (e.preventDefault) e.preventDefault();
       if (e.stopPropagation) e.stopPropagation();
   }
   return !flag;
}

function keydown(e)
{
   if (!e) e= event;
   keymesg('keydown ',e);
   return suppressdefault(e,document.testform.keydown.checked);
}

function keyup(e)
{
   if (!e) e= event;
   keymesg('keyup   ',e);
   return suppressdefault(e,document.testform.keyup.checked);
}

function keypress(e)
{
   if (!e) e= event;
   keymesg('keypress',e);
   return suppressdefault(e,document.testform.keypress.checked);
}

function textinput(e)
{
   if (!e) e= event;
   //showmesg('textInput  data=' + e.data);
   showmesg('textInput data='+e.data);
   return suppressdefault(e,document.testform.textinput.checked);
}
