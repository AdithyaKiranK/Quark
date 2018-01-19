
$(document).ready(function () {
    getLocalDeviceList();
    
    $("#localDevList li a").hover( function (){
        $(this).css("background-color", "#3dcd58"); 
        $(this).find("a").css("color","#ffffff");
    }, function (){
        $(this).css("background-color", "#ffffff"); 
        $(this).find("a").css("color","#3dcd58");
    });
});

function getLocalDeviceList() {
    var path = require('path');
    var p = path.join(__dirname, '.', 'assets/json/localDeviceDB.json');
    
    var fs = require('fs');
    fs.readFile(p, 'utf8', function (err, jsonData) {
        if (err) {
            alert("Error reading device database!");
        }
        else{
            
            // remove the trailing comma
            var jsonStr = "{\"devicesMasterList\": [" + jsonData.substring(0,jsonData.length-1) + "]}" ;
           
            var deviceDB = JSON.parse(jsonStr);
            
            for(var i=0; i<deviceDB.devicesMasterList.length; ++i) {
                var listElement = document.createElement("li");
                var listVal = deviceDB.devicesMasterList[i].name;
                var link = document.createElement("a");
                link.setAttribute("href","#");
                link.setAttribute("data-deviceType",deviceDB.devicesMasterList[i].device);
                link.setAttribute("data-iface",deviceDB.devicesMasterList[i].iface);
                
                if( deviceDB.devicesMasterList[i].iface == "Serial" ) {
                    link.setAttribute("data-deviceID",deviceDB.devicesMasterList[i].id);
                    link.setAttribute("data-baud",deviceDB.devicesMasterList[i].baudrate);
                    link.setAttribute("data-parity",deviceDB.devicesMasterList[i].parity);
                }
                else {
                    link.setAttribute("data-ipv4",deviceDB.devicesMasterList[i].ip);        
                }
                
                link.innerHTML = listVal;
                listElement.appendChild(link);
                $("#localDevList").append(listElement);
            }
            
            $("#localDevList li a").on("click",function() {
                deviceChanged(event.target);
            });
            
            $("#deviceOptions li a").on("click", function() {
                $("#deviceOptions li a").css("color","#3dcd58");
                $(event.target).css("color","#FFFFFF");
            });
        }
    });
}

function deviceChanged( target ) {
    // Set defaults on all list elements
    $("#localDevList li a").css("background-color","#FFFFFF");
    $("#localDevList li a").css("color","#3dcd58");
    $(target).css("background-color" , "#3dcd58");
    $(target).css("color","#FFFFFF");
    
    $("#devMenuTitle").fadeOut(230);
    $("#devMenuTitle")[0].innerHTML = $(target).text();
    $("#deviceOptionsContainer h1").css("background-color","#3dcd58");
    $("#devMenuTitle").fadeIn(250);
    
    
    $("#rmsTable").fadeOut(100);    
    $("#loaderGif").show();
    
    var path = require('path');
    var p = path.join(__dirname, '.', 'assets/json/EM64XXHmodded.json');
    
    var fs = require('fs');
    
    fs.readFile(p, 'utf8', function (err, jsonData) {
        if (err) {
            alert("Error reading register database!");
        }
        else{
            
            var tableWorker = new Worker("./assets/js/tableBuilder.js");
            
            tableWorker.onmessage = function(e) {
                $("#rmsTable tbody").html(e.data).promise().done( function() {
                    
                        // Loader gif hide
                        $("#loaderGif").fadeOut(100, function() {
                            
                            // Show the table body
                            $("#rmsTable").fadeIn(4000, function() {
                                // Smooth fade in for options
                                $("#deviceOptions li a").each( function(index) {
                                   $(this).fadeIn(300*index, function() {
                                       $("#deviceOptions li a").css("display","block");
                                       
//                                       setTimeout( function() {
//                                           loadRegisterTable();
//                                       }, 3000 );
                                   });
                                });
    
                            });
                                // Applies the correct margins since initial display setting is "none"
                            
                        });
                        
                        
                        
                });
            };
            
            var regs = JSON.parse(jsonData);
            // Get this done!
            tableWorker.postMessage(regs);    
        }
    });
}


function loadRegisterTable() {
    var res='global';
	var ModbusRTU = require("modbus-serial");
	var client = new ModbusRTU();
	var IP='global';

	client.connectTCP('169.254.239.5');
	client.setID(255);
	 
    // 32 is a placeholder, need to fill with actual numbers based on
    // data loader in final code
    client.readHoldingRegisters( 2999, 32, function( err, result ) {
        
        for(var i=0; i<32; ++i)
            {
                // This is where it loads the values to the table
                var selector = (3000 + (i * 2)).toString();
                document.getElementById(selector).innerHTML = 3000;//result.data[i];        
            }
        
    } )
}

function connect(){
	
}