
$(document).ready(function () {
    $("#localDevList li").hover( function (){
        $(this).css("background-color", "#3dcd58"); 
        $(this).find("a").css("color","#ffffff");
    }, function (){
        $(this).css("background-color", "#ffffff"); 
        $(this).find("a").css("color","#3dcd58");
    });
    
    $("#localDevList li a").click( function (){
        
        // Reset all button colors and highlight clicked button 
        $("#localDevList li a").css("color","#3dcd58");
        $(this).css("color","#6c6e72");
        
        // Set the heading to the clicked form's description
        $("#setupPage h1").hide();
        $("#setupPage h1")[0].innerHTML = event.target.innerHTML;
        $("#setupPage h1").fadeIn(400, function() {
              
        });  
        
        $("#formController").show();
    });

    // Add slideDown animation to Bootstrap dropdown when expanding.
    $('.dropdown').on('show.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown("fast");
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp("fast");
    });

    $("#frqList").on("click", "a.listItem", function() {
        $("#frequencyListButton")[0].innerHTML = this.innerHTML + "<span class=\"caret\"></span>" ;
    });
    
    $("#wiringList").on("click", "a.listItem", function() {
        $("#wiringListButton")[0].innerHTML = this.innerHTML + "<span class=\"caret\"></span>" ;
    });
    
    $("#formController").css("display", "none");
});