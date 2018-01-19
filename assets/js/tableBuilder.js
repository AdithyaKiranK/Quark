
    

onmessage = function (e) {
    var regs = (e.data);
    var trstr = "";
    
    for(var i=0; i<regs.reglist.length; ++i)
    {
        trstr += "<tr><td>"+ regs.reglist[i].regDescription + "</td>";

        if(regs.reglist[i].regAddr == 3000) {
            trstr +=  "<td id=\"rms\">"+ regs.reglist[i].regAddr +  "</td>";      
        }
        else if(regs.reglist[i].regAddr == 3204) {
            trstr +=  "<td id=\"energy\">"+ regs.reglist[i].regAddr +  "</td>";      
        }
        else if(regs.reglist[i].regAddr == 3701) {
            trstr +=  "<td id=\"demand\">"+ regs.reglist[i].regAddr +  "</td>";      
        }
        else
        {
            trstr += "<td>" + regs.reglist[i].regAddr +  "</td>";
        }
        trstr += "<td>"+ regs.reglist[i].datatype + "</td>";
        trstr += "<td id=" + regs.reglist[i].regAddr.toString()+ ">-</td></tr>";
    }
    
    // Artificial delay to show UI value
    setTimeout( function() {
         postMessage(trstr);
    }, 1000);
}