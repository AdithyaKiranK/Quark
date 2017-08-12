

function addButtonHandler() {
    // hide the selected tab bar
    document.getElementById("selectedBar").style.visibility = "hidden";
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ width: 800, height: 600 });
	// win.loadURL(`file://${__dirname}/index.html`)
}


function deviceButtonHandler() {
    // show the selected tab bar
//    var hlBar = document.getElementById("selectedBar");
//    hlBar.style.visibility = "visible";
//    hlBar.style.top = "31%";
    
   // document.getElementById("deviceButton").style.boxShadow = "30 30 30 //black";
    document.getElementById("deviceButton").style.boxShadow = "3px 0px 0px #6c6e72";
    
    $.ajax({
            url: "./EM64XXH.html",
            async: false,
            success: function (data){
                $('#selectedPage').html(data);
            }
        });    
}