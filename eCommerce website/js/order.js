/*  Guggari, Pooja Maheshwar. 
	 Class Account# jadrn017 
	 Fall 2017
*/    

var proj2_data;
//var cart;
$(document).ready(function() {
    proj2_data = new Array();
	var cart = new shopping_cart("jadrn017");
    $.post('http://jadran.sdsu.edu/jadrn011/servlets/FetchAllProducts', storeProductsData);

    function storeData(response) {
    	if(response.startsWith("Success")) {	
    		showCartList("great");
    	}
    	else {
    		//alert(response);
		    var tmpArray = explodeArray(response,';');
		    for(var i=0; i < tmpArray.length; i++) {
		        innerArray = explodeArray(tmpArray[i],'|');
		        proj2_data[i] = innerArray;
				
		        }
				showCartList("good");
		}
    }

	function isCartEmpty() {
		var cartList = cart.getCartArray();
	        if(cartList.length == 0 || cart.size == 0) {
		        $('#showcart').html("<h1>Oops! Looks like your carty is empty! </h1><br><h3>Here... Check out our amazing camera where <a href='proj2.html'>Cliking is made easy</a>");
				$('#order').hide();
				$('.displaycart').hide();
			}
	}

	function showCartList(string) {
	  	var total = 0;
        var tax = 0.08;
        var shippingCharge = 2;
        var cartList = cart.getCartArray();
		if(string=="good") {
			$('#count').text(cart.size());
		}
		else {
			cartList = 0;
			cart.size = 0;
			$('#count').text("0");
			$('#ui-dialog').dialog('close');
			$('#showcart').html("<h1>Congratulations! Your order has been placed successfully. </h1><br><h3>Delicious and Yummilicious Bertha's Deluxe chocolates are on the way!</h3>");
			$('#order').hide();
			$('.displaycart').hide();
			displayCustomerDetails();
			document.cookie = 'jadrn011=; expires=-1;path=/'
			return;
		}
		if(string != "great") {
			if (cartList.length == 0 || cart.size == 0) {
			    $('#showcart').html("<h1>Oops! Looks like your carty is empty! </h1><br><h3>Here... Check out our amazing camera where <a href='proj2.html'>Cliking is made easy</a>");
				$('#order').hide();
				$('.displaycart').hide();
				return;
			}
		
	        var tempStr = '<ul><li><table class="displaycart" align="center"><tr><th>Products in your cart</th><th>Name</th><th>Quantity</th><th>Price</th><th>Total</th>';
			
				if(string=="good")
					tempStr += "<th>Update cart</th></tr>";
					
					else
					tempStr += "</tr>";
					
	        for(var i=0; i < cartList.length; i++) {
	         var sku = cartList[i][0];
	         var quantity = parseInt(cartList[i][1]);
	         var name;
			 var cost;
	      		
	          for(var j=0; j < proj2_data.length; j++) {
	 
	           if(proj2_data[j][0] == cartList[i][0]) {   
	               cost = parseFloat(proj2_data[j][6]);
	               name = proj2_data[j][2];
	               var costProduct = quantity * cost;
	               total += costProduct;
				   
	               tempStr += "<tr><td><img src=\"/~jadrn000/PROJ4_IMAGES/"+proj2_data[j][0]+".jpg\" alt=\""
				   +proj2_data[i][2]+"\""+" width=\"200px\"  /></td><td><b>"+name+"</b><br><i>"+proj2_data[j][1]+"</i></td>";
					
					if(string=="good")
					tempStr += "<td><input type='text' name='quantity' size='5' class='"+proj2_data[j][0]+"' value='"+quantity+"' /></td>";
					
					else
					tempStr += "<td>"+quantity+"</td>";
					
					tempStr +="<td>$"+cost+"</td>";
					tempStr +="<td>$"+costProduct.toFixed(2)+"</td>";
	   			   
				   if(string=="good")
					tempStr +="<td><input type='button' class='updateqty' id="+proj2_data[j][0]+" value='Update Quantity' /><br><br>"
				   +"<input type='button' class='delete' id="+proj2_data[j][0]+" value='Remove item' /></td></tr>";
					
					else
					tempStr +="</tr>";
				
	          }
	         }
			 
	        }
			tempStr +="</table></li>";
	        var tax_total = total * tax;
	        var finalCost = total + shippingCharge + tax_total;
	        tempStr += "<br><br><li><table class='paymentdet' align='center'><tr><td>Product Total:  </td><td>$" + total.toFixed(2) + "</td></tr>" +
	        "<tr><td>Tax:  </td> <td>$" + tax_total.toFixed(2) + "</td></tr>" +
	        "<tr><td>Shipping Fee:  </td><td>$2.00</td></tr>" +
	        "<tr><td>Order Total:  </td><td>$" + finalCost.toFixed(2) + "</td></tr></table><br>";
		
			if(string=="good") {
				tempStr +="<input type='button' value='Place Your Order' id='order' /></li></ul><br>";
			}
			else {
				tempStr +="</li></ul><br>";
			}		
	        $('#showcart').html(tempStr);
			
			if(cart.size()==0) {
				$('#order').hide();
			}
	
    	}
	}
    $.noConflict();
    $("#ui-dialog").dialog({
            height: 700,
            width: 800,
            modal: true,
            autoOpen: false
    });
    

    $('#showcart').on('click', "#order", function($e) {  
    	//alert("Good");
		$("#ui-dialog").dialog('open');
    });	
			
	$('input[type="checkbox"]').click(function() {
	    if($(this).prop("checked") == true){
			sameShipping();
		}
	});
			
    $('#showcart').on('click',".delete", function() {
		var sku = this.id;
		cart.delete(sku);
		showCartList("good");
   	}); 
			
	$('#showcart').on('click',".updateqty", function() {
        var sku = this.id;
		cart.setQuantity(sku, $('.'+sku).val());
        showCartList("good");
    }); 
		
 	$('#placeorder').on('click',function(e) {  
 		e.preventDefault();
		if (isValidData()){
			/* for(var i=0; i < 15; i++) {
             	elementHandle[i].removeClass("error");
             	errorStatusHandle.text("");
			   } */
			
			//showConfirmation();
			$.get('/perl/jadrn017/save_data.cgi', storeData);
			showCartList("great");
			
		}
    });	       

    var errorStatusHandle = $('#status');
    var elementHandle = new Array(15);
    elementHandle[0] = $('[name="fname"]');
    elementHandle[1] = $('[name="lname"]');
    elementHandle[2] = $('[name="address1"]');
    elementHandle[3] = $('[name="city"]');
    elementHandle[4] = $('[name="state"]');
    elementHandle[5] = $('[name="zip"]');
    elementHandle[6] = $('[name="area_phone"]');
    elementHandle[7] = $('[name="prefix_phone"]');
    elementHandle[8] = $('[name="phone"]');
    elementHandle[12] = $('[name="expiry"]');
    elementHandle[9] = $('[name="card"]');
    
    
    
    function isValidData() {

        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter your first name");
            elementHandle[0].focus();
            return false;
            }
        if(isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter your last name");
            elementHandle[1].focus();            
            return false;
            }
        if(isEmpty(elementHandle[2].val())) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please enter your address");
            elementHandle[2].focus();           
            return false;
            }
        if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter your city");
            elementHandle[3].focus();            
            return false;
            }
        if(isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter your state");
            elementHandle[4].focus();            
            return false;
            }
        if(!isValidState(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("The state appears to be invalid, "+
            "please use the two letter state abbreviation");
            elementHandle[4].focus();            
            return false;
            }
        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter your zip code");
            elementHandle[5].focus();            
            return false;
            }
        if(!$.isNumeric(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("The zip code appears to be invalid, "+
            "numbers only please. ");
            elementHandle[5].focus();            
            return false;
            }
        if(elementHandle[5].val().length != 5) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("The zip code must have exactly five digits")
            elementHandle[5].focus();            
            return false;
            }
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter your area code");
            elementHandle[6].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The area code appears to be invalid, "+
            "numbers only please. ");
            elementHandle[6].focus();            
            return false;
            }
        if(elementHandle[6].val().length != 3) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The area code must have exactly three digits")
            elementHandle[6].focus();            
            return false;
            }   
        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter your phone number prefix");
            elementHandle[7].focus();            
            return false;
            }           
        if(!$.isNumeric(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The phone number prefix appears to be invalid, "+
            "numbers only please. ");
            elementHandle[7].focus();            
            return false;
            }
        if(elementHandle[7].val().length != 3) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The phone number prefix must have exactly three digits")
            elementHandle[7].focus();            
            return false;
            }
        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter your phone number");
            elementHandle[8].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The phone number appears to be invalid, "+
            "numbers only please. ");
            elementHandle[8].focus();            
            return false;
            }
        if(elementHandle[8].val().length != 4) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The phone number must have exactly four digits")
            elementHandle[8].focus();            
            return false;
            }  
        if(isEmpty(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please enter your card number");
            elementHandle[9].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("The card number appears to be invalid, "+
            "numbers only please. ");
            elementHandle[9].focus();            
            return false;
            }
        if(elementHandle[9].val().length != 16) {
        	//alert(elementHandle[9].val().length);
            elementHandle[9].addClass("error");
            errorStatusHandle.text("The card number must have exactly sixteen digits")
            elementHandle[9].focus();            
            return false;
            }
        if(isEmpty(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please enter expiration date for your card");
            elementHandle[12].focus();
            return false;
            }
        if(validateExpiryDate(elementHandle[12].val()) == 2) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Exptration date entered does not match the expiration date format or date fragments are invalid ");
            elementHandle[12].focus();            
            return false;
            }
        if(validateExpiryDate(elementHandle[12].val()) == 3) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Sorry, Your card has expired!");
            elementHandle[12].focus();            
            return false;
            }
        if(validateExpiryDate(elementHandle[12].val()) == 4) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Expiry date must be this month or later");
            elementHandle[12].focus();            
            return false;
            }

        return true;
    }      

    elementHandle[0].focus();
   
    /////// HANDLERS

    // the error message should no longer show once the value has been updated by the user
    elementHandle[0].on('blur', function() {
        if(isEmpty(elementHandle[0].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[1].on('blur', function() {
        if(isEmpty(elementHandle[1].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[2].on('blur', function() {
        if(isEmpty(elementHandle[2].val()))
            return;
		$(this).removeClass("error");
		errorStatusHandle.text("");
        });
	elementHandle[3].on('blur', function() {
        if(isEmpty(elementHandle[3].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[4].on('blur', function() {
        if(isEmpty(elementHandle[4].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[5].on('blur', function() {
        if(isEmpty(elementHandle[5].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[6].on('blur', function() {
        if(isEmpty(elementHandle[6].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[7].on('blur', function() {
        if(isEmpty(elementHandle[7].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[8].on('blur', function() {
        if(isEmpty(elementHandle[8].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[9].on('blur', function() {
        if(isEmpty(elementHandle[9].val()))
            return;
		$(this).removeClass("error");
		errorStatusHandle.text("");
        });
	elementHandle[12].on('blur', function() {
        if(isEmpty(elementHandle[12].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	    

        
    elementHandle[6].on('keyup', function() {
        if(elementHandle[6].val().length == 3)
            elementHandle[7].focus();
            });
            
    elementHandle[7].on('keyup', function() {
        if(elementHandle[7].val().length == 3)
            elementHandle[8].focus();
            });
	
   /* $(':submit').on('click', function(e) {
		e.preventDefault();
		if (isValidData()){
			for(var i=0; i < 15; i++)
            	elementHandle[i].removeClass("error");
			errorStatusHandle.text("");
			//var params = "email="+elementHandle[9].val();
			//var url = "check_dup.php?"+params;
			//$.get(url, dup_handler);
			//processUpload();
        }  });
        
    $(':reset').on('click', function() {
        for(var i=0; i < 10; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        });   */   
}); 


function normalizeYear(year){
    // Century fix
    var YEARS_AHEAD = 20;
    if (year<100){
        var nowYear = new Date().getFullYear();
        year += Math.floor(nowYear/100)*100;
        if (year > nowYear + YEARS_AHEAD){
            year -= 100;
        } else if (year <= nowYear - 100 + YEARS_AHEAD) {
            year += 100;
        }
    }
    return year;
}

function validateExpiryDate(s){
    var match=s.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
    if (!match){
        //alert('Input string isn\'t match the expiration date format or date fragments are invalid.')
        return 2;
    }
    var exp = new Date(normalizeYear(1*match[2]),1*match[1]-1,1).valueOf();
    var now=new Date();
    var currMonth = new Date(now.getFullYear(),now.getMonth(),1).valueOf();
    if (exp<=currMonth){
        return 3;
    } else {
        return 0;
    }
}


// from https://stackoverflow.com/questions/43648170/validating-credit-card-expiry-date-against-todays-date-in-javascript
/*function validateExpiryDate(s) {

  // Check 2-2 digits
  if (!/\d\d-\d\d/.test(s)) {
    return 2;
  }
  
  // Check month is 1 to 12 inclusive
  var b = s.split('-');
  if (b[0]<1 || b[0]>12) {
    return 3;
  }
  
  // Check is this month or later
  var d = new Date()
  var c = d.getFullYear()/100 | 0 + '';
  if (new Date(c + b[1], b[0], 1) < d) {
    return 4;
  }
  


  //return true;
} */


function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
}

function isValidState(state) {                                
        var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
        for(var i=0; i < stateList.length; i++) 
            if(stateList[i] == $.trim(state))
                return true;
        return false;
}  
			
function sameShipping() {
	$('[name="s_fname"]').val($('[name="fname"]').val());
	$('[name="s_lname"]').val($('[name="lname"]').val());
	$('[name="s_address1"]').val($('[name="address1"]').val());
	$('[name="s_address2"]').val($('[name="address2"]').val());
	$('[name="s_city"]').val($('[name="city"]').val());
	$('[name="s_state"]').val($('[name="state"]').val());
	$('[name="s_zip"]').val($('[name="zip"]').val());
	$('[name="s_area_phone"]').val($('[name="area_phone"]').val());
	$('[name="s_prefix_phone"]').val($('[name="prefix_phone"]').val());
	$('[name="s_phone"]').val($('[name="phone"]').val());
	
}


function displayCustomerDetails() {
	var custStr;
	var card = $('[name="card"]').val().replace(/\d(?=\d{4})/g, "*");
	custStr='<div>First Name :'+ $('[name="fname"]').val()+
				'<br>Shipping Address : '+$('[name="address1"]').val()+$('[name="address2"]').val()+
				'<br>'+$('[name="city"]').val()+' , '+$('[name="state"]').val()+' , '+$('[name="zip"]').val()+
				'<br>'+card;
			
	$('#customerdetails').html(custStr);		
} 

function showConfirmation() {
	$.get('/perl/jadrn017/save_data.cgi', storeData);
	$("#ui-dialog").dialog('close');
	cart.size()=0;
	
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