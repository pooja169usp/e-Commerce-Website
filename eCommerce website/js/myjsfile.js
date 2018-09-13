/*   Guggari, Pooja Maheshwar. 
	 Class Account# jadrn017 
	 Fall 2017
*/
/////////////////////////////////////////////////////////////////
    
    
	function validateDate(month,day,year) {
		var checkDate = new Date(year, month-1, day);    
		var checkDay = checkDate.getDate();
		var checkMonth = checkDate.getMonth()+1;
		var checkYear = checkDate.getFullYear();
		
		if(day == checkDay && month == checkMonth && year == checkYear)
			return true;
		else
			return false;         
    }  
	
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
        
    // copied from stackoverflow.com       
    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
		
	function isNameFormatCorrect(name){
		var pattern = new RegExp(/^[a-zA-ZÃ Ã¡Ã¢Ã¤Ã£Ã¥Ä…ÄÄ‡Ä™Ã¨Ã©ÃªÃ«Ä—Ä¯Ã¬Ã­Ã®Ã¯Å‚Å„Ã²Ã³Ã´Ã¶ÃµÃ¸Ã¹ÃºÃ»Ã¼Å³Å«Ã¿Ã½Å¼ÅºÃ±Ã§ÄÅ¡Å¾Ã€ÃÃ‚Ã„ÃƒÃ…Ä„Ä†ÄŒÄ–Ä˜ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÄ®ÅÅƒÃ’Ã“Ã”Ã–Ã•Ã˜Ã™ÃšÃ›ÃœÅ²ÅªÅ¸ÃÅ»Å¹Ã‘ÃŸÃ‡Å’Ã†ÄŒÅ Å½âˆ‚Ã° ,.'-]+$/u);
		return pattern.test(name);
	}
	/*function isAddressFormatCorrect(address){
		var pattern = new RegExp(/^[a-zA-Z ,.'-#]+$/u);
		return pattern.test(address);
	}*/
	
	function calculate_age(birth_month,birth_day,birth_year)
	{
		today_date = new Date();
		today_year = today_date.getFullYear();
		today_month = today_date.getMonth();
		today_day = today_date.getDate();
		age = today_year - birth_year.val();

		if ( today_month < (birth_month.val() - 1))
		{
			age--;
		}
		if (((birth_month.val() - 1) == today_month) && (today_day < birth_day.val()))
		{
			age--;
		}
		
		return age;
	}
	
	function dup_handler(response) {
		if(response == "dup")
			$('#status').text("ERROR, duplicate");
		else if(response == "OK") {
			$('#status').text("");
			processUpload();
		}
		else
			alert(response);
    }	
	
	function processUpload() {
        send_file();
	}
	var size = 0; 
	function send_file() {    
		var form_data = new FormData($('form')[0]);
        var file_name = $('#photograph').val();
        //if(size > 2000000) {
         //   $('#status').html("ERROR, image is too big");
         //   return;
           // }
        //        file_name = file_name.replace("C:\\fakepath\\",""); 
        var toDisplay = "<img src='/~jadrn017/proj3/animatedEllipse.gif' width='25px' height='auto' />";               
        $('#pic').html(toDisplay);
        var where = file_name.lastIndexOf("\\");  // this is safer!
        file_name = file_name.substring(where+1);          
        form_data.append("image", document.getElementById("photograph").files[0]);
		
        $.ajax( {
            url: "ajax_file_upload.php",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
	        if(response.startsWith("Success")) {
               	var fname = $("#photograph").val();	       
               	$('#status').html(response);
				$('form').serialize();
			    $('form').submit();
			
		      }
	       else {
                $('#status').css('color','red');
				$('#status').html(response);	
				$('#pic').html("&nbsp;");		       
                }
	    },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, 2MB maximum size");
                }
            });
    } 
                 
$(document).ready( function() {
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
    elementHandle[12] = $('[name="month"]');
    elementHandle[14] = $('[name="year"]');
    
    
    
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
       
        if(isEmpty(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please enter month of expiry for your card");
            elementHandle[12].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("The month of expiry for your card appears to be invalid, "+
            "numbers only please. ");
            elementHandle[12].focus();            
            return false;
            }
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please enter year of expiry for your card");
            elementHandle[14].focus();
            return false;

            }
        if(!$.isNumeric(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("The year of expiry for your card appears to be invalid, "+
            "numbers only please. ");
            elementHandle[14].focus();            
            return false;
            }
        if(elementHandle[14].val().length != 4) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("The year of expiry for your card should have exactly 4 digits")
            elementHandle[14].focus();            
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
 
	$(function () {
		$('input:radio').click(function () {
			$('input[name=gender]').removeClass("error");
			errorStatusHandle.text("");
		});
	elementHandle[12].on('blur', function() {
        if(isEmpty(elementHandle[12].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[13].on('blur', function() {
        if(isEmpty(elementHandle[13].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[14].on('blur', function() {
        if(isEmpty(elementHandle[14].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });      

    elementHandle[4].on('keyup', function() {
        elementHandle[4].val(elementHandle[4].val().toUpperCase());
        });
        
    elementHandle[6].on('keyup', function() {
        if(elementHandle[6].val().length == 3)
            elementHandle[7].focus();
            });
            
    elementHandle[7].on('keyup', function() {
        if(elementHandle[7].val().length == 3)
            elementHandle[8].focus();
            });
	
	
	$('input[name="photograph"]').on('change',function(e) {
		size = this.files[0].size;
		elementHandle[11].removeClass("error");
		errorStatusHandle.text("");
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