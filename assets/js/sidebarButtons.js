let addWindow;
var windowFullSize = false;

window.onload = function() {

    
    $('.titleImg').fadeOut(1000, "swing", function() {
        const remote = require('electron').remote;
        var window = remote.getCurrentWindow();
        window.maximize();
        windowFullSize = true;
        deviceButtonHandler();
        $(".mainpage").fadeIn(1000, "swing");  
        $("#appImage").remove();
    });  
    
    $("#exitIcon").on("click", function(){
       const remote = require('electron').remote;
       var window = remote.getCurrentWindow();
       window.close();
    });
    
    $("#resizeIcon").on("click", function(){
       const remote = require('electron').remote;
       var window = remote.getCurrentWindow();
        
        if( windowFullSize == true ) {
            window.setSize((window.getSize()[0]) - 10, (window.getSize()[1]) - 30);
            windowFullSize = false;
        }
        else {
            window.maximize();
            windowFullSize = true;
        }
    });
    
    $("#minimizeIcon").on("click", function(){
       const remote = require('electron').remote;
       var window = remote.getCurrentWindow();
       window.minimize();
    });
};

function setButtonShadow( buttonName ) {
    $(".sidebar").each( function(index) {
        $(this).css("box-shadow","none");
    });
    document.getElementById(buttonName).style.boxShadow = "3px 0px 0px #6c6e72";
}

function loadPage( pageName ) {
    $.ajax({
            url: pageName,
            async: false,
            success: function (data){
                $('#selectedPage').html(data);
                $("#selectedPage").css("display", "none");
                $("#selectedPage").fadeIn(500, "swing");
            }
        });  
}

function addButtonHandler() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    if( addWindow == null )
    {
        addWindow = new BrowserWindow({ width: 800, height: 600, title:"Add new device", icon: "../images/addDeviceHeader.png", frame:false });

        addWindow.on('closed', () => {
          addWindow = null;
        });

        addWindow.loadURL('file://' + __dirname + '/addDevice.html');

        localStorage.setItem('devWinOpen', 'true');
    }
    else
    {
        addWindow.focus();
    }  
}


function deviceButtonHandler() {
    setButtonShadow("deviceButton");
    loadPage("./paramsDisplay.html");
}

function setupButtonHandler() {
    
    setButtonShadow("settingsButton");
    loadPage("./deviceConfiguration.html");
}

function graphButtonHandler() {
    setButtonShadow("graphButton");
    loadPage("./graphs.html");
}

function diagButtonHandler() {
    setButtonShadow("diagButton");
    loadPage("./diagnostics.html");
}

