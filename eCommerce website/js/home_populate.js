/*   Guggari, Pooja Maheshwar. 
     Class Account# jadrn017 
     Fall 2017
*/

var proj4_data;

$(document).ready(function() {
    proj4_data = new Array();
    var cart = new shopping_cart("jadrn017");
    $.get('/perl/jadrn017/populate_home.cgi', storeData);
    var qty; 
    $('#count').text(cart.size());    
    $('#content').on('click',$('input[type="button"]'), function(e) {
        var sku = $(e.target).attr("name");
        qty = $('#'+sku).val();
        if($(e.target).val() != 'Add to Cart') return;
        //alert("The SKU is " + $(e.target).attr("name"));
        $('#count').text(cart.size());
        if (!qty == 0) {
            cart.add(sku,qty);
            qty = 0;
        }
        $('#count').text(cart.size());
    });   
});    

function storeData(response) {
    //alert(response);
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
    tmpString = "<ul class='products'>";
    for(var i=0; i < 6; i++) {
            tmpString +='<li><img src=\"/~jadrn000/PROJ4_IMAGES/'+
            proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
            "width=\"250px\"  /><br />";

            tmpString += "<b>"+proj4_data[i][2]+"</b><br><i>"+proj4_data[i][3]+"<br>$"+proj4_data[i][6]+"</i><br>";
            
            tmpString +="<br><br><div class='space'>Quantity : <input type='text' id="+proj4_data[i][0]+" name='qty' class='qty' size='5'>&nbsp;&nbsp;<input type='button' class='buy' name="+proj4_data[i][0]+
                        " value='Add to Cart' /></div><br /></li>"
    }
    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;
    //alert("Hello");

    }
    
// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}     