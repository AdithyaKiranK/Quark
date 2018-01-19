var deviceDB;
var allDevices = [];
var baudRate = 19200;
var parity = 'E';

window.onload = function () {
    var deviceList = document.getElementById('deviceSelectionList');
    var path = require('path');
    var p = path.join(__dirname, '.', 'assets/json/deviceList.json');
   
    var fs = require('fs');
    fs.readFile(p, 'utf8', function (err, jsonData) {
        if(err ){
            alert("Error reading device database. Page may not be loaded!")
        }
        else{
            
            deviceDB = JSON.parse(jsonData);
            
            // Add the device names to the selection drop down
            for( var i=0; i<deviceDB["devicesMasterList"].length; ++i )
            {
                var opt = document.createElement("li");
                var listVal = (deviceDB["devicesMasterList"][i]["name"]);
                var innerLink = document.createElement("a");
                innerLink.setAttribute("role","menuitem");
                innerLink.setAttribute("tabindex","-1");
                innerLink.setAttribute("href","#");
                innerLink.setAttribute("class","listItem")
                innerLink.setAttribute("data-listIndexUser",i);
                innerLink.innerHTML = listVal;
                var devId = "dev" + listVal;
                innerLink.setAttribute("id",devId);
                allDevices.push(listVal);
                opt.setAttribute("role","presentation");
                opt.appendChild(innerLink);
                deviceList.appendChild(opt);
            }
        }
    });
    
    $("#deviceSelectionList").on( 'click', 'a.listItem', function(){
        var x = document.getElementById("devListButton");
        // Set the button's text to the selected device
        x.innerHTML = event.target.id.replace("dev","");
        deviceSelect(event.target.id);
        var caret = document.createElement("span");
        caret.setAttribute("class","caret");
        x.appendChild(caret);
    } );
    
    // Add slideDown animation to Bootstrap dropdown when expanding.
    $('.dropdown').on('show.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown("fast");
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp("fast");
    });
    
    resetControlsOnPage();
    
     $("#submitButton").click(function(){
        submitValues(); 
     });
    
    $(".baudratelist ul li a").click(function(){
       submitBaud(event.target.id); 
    });
    
    $(".paritylist ul li a").click(function(){
        submitParity(event.target.id);
    });
    
    $("#cancelButton").click(function(){
        closeWindow();
    })
    
    $("#19k2baud").css("color","#3dcd58");
    $("#evenParity").css("color","#3dcd58");
};

function deviceSelect( devID ) {
    
    resetControlsOnPage();

    $("#intfListButton").prop('disabled', false);
    
    var x = document.getElementById("intfListButton");
    x.innerHTML = "Interfaces";
    var caret = document.createElement("span");
    caret.setAttribute("class","caret");
    x.appendChild(caret);
    
    var lis = document.getElementById("deviceSelectionList").getElementsByTagName("a");
    var devSelected = 0;
    
    for( var i=0; i<lis.length; ++i)
    {
       if(lis[i].getAttribute("id") == (devID))
           {
               devSelected = i;
               break;
           }
    }
    
    var interfaceList = document.getElementById('intfList');
    
    interfaceList.innerHTML = "";
    interfaceList.value = "";
    
    
    for(var j=0; j<(deviceDB["devicesMasterList"][devSelected]["interfaces"].length); ++j )
    {
        var intfval = deviceDB["devicesMasterList"][devSelected]["interfaces"][j];   
        var opt = document.createElement("li");
        var innerLink = document.createElement("a");
        innerLink.setAttribute("role","menuitem");
        innerLink.setAttribute("tabindex","-1");
        innerLink.setAttribute("href","#");
        innerLink.setAttribute("class","intfItem")
        innerLink.innerHTML = intfval;
        innerLink.setAttribute("id",intfval);
        opt.setAttribute("role","presentation");
        opt.appendChild(innerLink);
        interfaceList.appendChild(opt);
    }
    
    $("#intfList").on( 'click', 'a.intfItem', function(){
        var x = document.getElementById("intfListButton");
        // Set the button's text to the selected interface
        x.innerHTML = event.target.id;
        var caret = document.createElement("span");
        caret.setAttribute("class","caret");
        x.appendChild(caret);
        interfaceSelect(event.target.id);

    } );
    
    var defIntf = deviceDB["devicesMasterList"][devSelected]["defaultInterface"];
}

function interfaceSelect( selectedIface ) {
    if(selectedIface == "Serial") {
        $("#unitIDpikr").prop('disabled', false);    
        $("#ipPikr").prop("disabled", true);
    }
    else if(selectedIface == "Ethernet") {
        $("#ipPikr").prop("disabled", false);
        $("#unitIDpikr").prop('disabled', true);    
    }
    // Enable the submit button
    $("#submitButton").prop('disabled',false);
}

function resetControlsOnPage() {
    // Disable the unit ID and IP entry fields
     $("#unitIDpikr").prop('disabled', true);
     $("#ipPikr").prop('disabled', true);
     $("#intfListButton").prop('disabled', true);
     $("#submitButton").prop('disabled',true);
}

function submitBaud( baudID ) {
    
    var selector = "#"+baudID;
    
    $(".baudratelist ul li a").css("color","#6c6e72");
    $(selector).css("color","#3dcd58");
    
    if(baudID == '4k8baud') {
        baudRate = 4800;
    }else if(baudID == '9k6baud') {
        baudRate = 9600;
    }else if(baudID == '19k2baud') {
        baudRate = 19200;
    }else if(baudID == '38k4baud') {
        baudRate = 38400;
    }
}

function submitParity( parity ) {
    
    var selector = "#"+parity;
    
    $(".paritylist ul li a").css("color","#6c6e72");
    $(selector).css("color","#3dcd58");
    
    if(parity == 'oddParity') {
        parity = 'O';
    }else if(parity == 'evenParity') {
        parity = 'E';
    }else if(parity == 'noParity') {
        parity = 'N';
    }
}

function jsonify( key, value, addTrailingComma )
{
    var str = "\"" + key + "\":" + "\"" + value + "\"";
    
    if( addTrailingComma == true ) {
         str += ",";
    }
    
    return str;
}


function submitValues() {
    var path = require('path');
    var p = path.join(__dirname, '.', 'assets/json/localDeviceDB.json');
    var fs = require('fs');
    var newDevice = "{";
    var devName;
    var devType = $("#devListButton").text(); 
    
    devType = jsonify("device",devType,true);
    
    var intfname = jsonify("iface",$("#intfListButton")[0].innerText,true);
    var intfdetail;
    
    if($("#intfListButton")[0].innerText == "Serial")
    {
        intfdetail = jsonify("id",$("#unitIDpikr")[0].value,true);
        intfdetail += jsonify("baudrate",baudRate,true);
        intfdetail += jsonify("parity",parity,false);
    }
    else
    {
        intfdetail = jsonify("ip",$("#ipPikr")[0].value);
    }
    
    devName = $("#deviceName")["0"].value;
    
    if($("#deviceName")["0"].value == "")
    {
        devName = "dev";
    }
    
    newDevice += jsonify("name",devName,true);
    newDevice += devType + intfname + intfdetail;
    newDevice += "},";

    fs.appendFileSync(p,newDevice,(err)=> {
       if(err)
       {
           alert("Error writing to local database");
       }
    });
    
    $("html").fadeOut();
    closeWindow();
    
}

function closeWindow(){
    const remote = require('electron').remote;
    var window = remote.getCurrentWindow();
    window.close();
}















