/*    JavaScript 6th Edition
 *    Chapter 2
 *    Individual Case

 *   Julies's Creations
 *    
 *    Author: Brandi Austin
 *    Date:   03/24/2021

 *    Filename: jc.js
 */
 "use strict" //interpret document contents in JavaScript strict mode
/* global variables status */
var menuComplete = true;
var nameComplete = true;
var websecurity  = true;
var formValidity = true;
var dateObject   = new Date();
var countdown;
var treat = [];

/* global variables for h2 and p elements */
var messageHeadElement = document.getElementById("messageHead");
var messageElement = document.getElementById("message");
var nameElement = document.getElementById("Name");

/* global variables for the fieldset elements */
var menuFieldset = document.getElementsByTagName("fieldset")[0];
var nameFieldset = document.getElementByTagName("fieldset")[1];

function displayCalender(whichMonth){
    var date;
    var dateToday = new Date();
    var dayOfWeek;
    var daysInMonth;
    var dateCells;
    var captionValue;
    var month;
    var year;
    var monthArray = ["January","February","March","April","May",
        "June","July","August","September","October","November", "December"];
    if (whichMonth === -1) {
        dateObject.setMonth(dateObject.getMonth() - 1);
     }   else if (whichMonth === 1) {
      dateObject.setMonth(dateObject.getMonth() + 1);
     }
    month = dateObject.getMonth();
    year = dateObject.getFullYear();
    dateObject.setDate(1);
    dayOfWeek = dateObject.getDay();
    captionValue = monthArray[month] + " " + year;
    document.querySelector("#cal table caption").innerHTML = captionValue;
    
    if (month ===0|| month ===2|| month ===4|| month ===6|| month ===7|| month ===9||
        month ===11) { // Jan, Mar, May, Jul, Aug, Oct, Dec
        
        daysInMonth =31;
    }  else if (month ===1) { // Feb
        if (year %4===0) { // leap year test
            if (year %100 ===0) {
               // year ending in 00 not a leap year unless // divisible by 400
             if (year %400 ===0) {  
                 daysInMonth = 29;
             } else {
                 daysInMonth = 28;
             }
             } else {
                 daysInMonth = 29;
             }
            } else {
                daysInMonth = 28;
            }
        }   else { // Apr, Jun, Sep, Nov
            
             daysInMonth =30;
        }
         dateCells =document.getElementsByTagName("td");
        for (var i = 0; i < dateCells.length; i++) {
           // clear existing table dates 
            dateCells[i].innerHTML ="";
            dateCells[i].className ="";
        }
     for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
        // add dates to days cells
        dateCells[i].innerHTML = dateObject.getDate();
        dateCells[i].className = "date";
        if (dateToday < dateObject) {
           dateCells[i].className = "futuredate"; 
        }
        date = dateObject.getDate() +1;
        dateObject.setDate(date);
    }
        dateObject.setMonth(dateObject.getMonth() -1);
        // reset month to month shown
        document.getElementById("cal").style.display ="block";
        // display calendar if it’s not already visible   
}
 function selectDate(event) {
     if (event === undefined) { // get caller element in IE8
         event= window.event;
    }
    var callerElement = event.target ||event.srcElement;
    if (callerElement.innerHTML === "") {
       // cell contains no date, so don’t close the calendar
        document.getElementById("cal").style.display = "block";
        return false;
    }
    dateObject.setDate(callerElement.innerHTML);
    var fullDateToday = new Date();
    var dateToday = Date.UTC(fullDateToday.getFullYear(),
           fullDateToday.getMonth(), fullDateToday.getDate());
    var selectedDate = Date.UTC(dateObject.getFullYear(),
          dateObject.getMonth(), dateObject.getDate());  
    if (selectedDate <= dateToday) {
        document.getElementById("cal").style.display = "block";
        return false;
    }
    document.getElementById("tripDate").value = dateObject.toLocaleDateString();
    hideCalendar();
    
    countdown = setInterval(updateCountdown, 1000); 
    document.getElementById("countdownSection").style.display = "block";
    document.getElementById("ticket").style.display = "block";
    
    ticket.date = dateObject.toLocaleDateString();
    document.getElementById("selectedDate").innerHTML = ticket.date;
    document.getElementById("dateSection").style.display = "block";
}
function hideCalender() {
    document.getElementById("cal").style.display = "none";
}

function prevMo() {
    displayCalender(-1);
}

function nextMo() {
    displayCalender(1);
}

function updateCountdown() {
    var dateToday = new Date();
    var dateFrom = Date.UTC(dateToday.getFullYear(),
        dateToday.getMonth(), dateToday.getDate(), 
        dateToday.getHours(), dateToday.getMinutes(), 
        dateToday.getSeconds());
    var dateTo = Date.UTC(dateObject.getFullYear(),
                         dateObject.getMonth(), dateObject.getDate(),19, 0, 0); 
    // all launches at 8:00pm UTC
    // days
    var daysUntil = Math.floor((dateTo - dateFrom) / 86400000);
    document.getElementById("countdown").innerHTML = daysUntil;
    // hours
    var fractionalDay = (dateTo - dateFrom) % 86400000;
    var hoursUntil = Math.floor(fractionalDay / 3600000);
    if (hoursUntil < 10) {
        hoursUntil = "0" + hoursUntil;
    }
    document.getElementById("countdown").innerHTML +=
        ":" + hoursUntil;
    // minutes
    var fractionalHour = fractionalDay % 3600000;
    var minutesUntil = Math.floor(fractionalHour / 60000);
    if (minutesUntil < 10) {
        minutesUntil = "0"+ minutesUntil;
    }
    document.getElementById("countdown").innerHTML +=
        ":"+ minutesUntil;
    // seconds
    var fractionalMinute = fractionalHour % 60000;
    var secondsUntil = Math.floor(fractionalMinute / 1000);
    if (secondsUntil <10) {
        secondsUntil = "0"+ secondsUntil;
    }
    document.getElementById("countdown").innerHTML +=
        ":"+ secondsUntil;   
}


/* validate payment fieldset */    
function validatePayment() {  
    var errorDiv = document.querySelector(
        "#paymentInfo .errorMessage");
    var fieldsetValidity =true;
    var ccNumElement = document.getElementById("ccNum");
    var selectElements = document.querySelectorAll(
        "#paymentInfo select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var cards =document.getElementsByName("PaymentType");
    var currentElement;

try {  
    if (!cards[0].checked && !cards[1].checked &&
        !cards[2].checked && !cards[3].checked) { 
        // verify that a card is selected
        for (i = 0; i < 4; i++) {
            cards[i].style.outline ="1px solid red";
        }
        fieldsetValidity = false;
      } else {
          for (i =0; i <4; i++) {
              cards[i].style.outline = "";
          }
      }
    if (ccNumElement.value === "") {
        // verify that a card number has been entered
        ccNumElement.style.background ="rgb(255,233,233)";
        fieldsetValidity = false;
      } else {  
          ccNumElement.style.background ="white";
      }
    for (var i =0; i < elementCount; i++) {
        // verify that a month and year have been selected
        currentElement = selectElements[i];
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border ="1px solid red";
            fieldsetValidity = false;
        } else {
            currentElement.style.border = "";
        }
    }
      if (!fieldsetValidity) { // check if any field is blank
          throw "Please complete all payment information.";
      } else {
          errorDiv.style.display = "none";
      }
    }
      catch(msg) {
           errorDiv.style.display = "block";
           errorDiv.innerHTML = msg;
           formValidity = false;
      }
      }

function generatePlaceholder(){
    if (!Modernizr.input.placeholder) {
        var messageBox =document.getElementById("customText");
         messageBox.value = messageBox.placeholder;
         messageBox.style.color ="rgb(178,184,183)";
    }
}
/* Form section is completed */
function testFormCompleteness() {
    if (menuComplete)
        createRecommenation();
}

function security() {
var websecurity = document.createElement("mainli").
    getElementsByTagName("mainli")
list = appendChild.cloneNode(true);

}

var treatsBox;
   for (var i = 0; i < 6; i++) {
      menuBox = menuFieldset.getElementsByTagName("input")[i];
      menuBox.checked = false;      
      if (menuBox.addEventListener) {
        menuBox.addEventListener("click", verifyTreats, false); 
      } else if (treatsBox.attachEvent)  {
        menuBox.attachEvent("onclick", verifyTreats);
      }
   }



function resetForm() {
    document.getElementById("menu").checked = menu;
}

/* validate required fields */
function validateRequired() {
   var inputElements = document.querySelectorAll(
       "#contactinfo input");
   var errorDiv = document.getElementById("errorText");
   var elementCount = inputElements.length;
   var requiredValidity = true;
   var currentElement;
    try {
        for (var i =0; i < elementCount; i++) {
           
            // validate all input elements in fieldset
            currentElement = inputElements[i];
            if (currentElement.value ==="") {
                currentElement.style.background = "rgb(255,233,233)";
                requiredValidity = false;
             } else {
                  currentElement.style.background = "white";
             }        
}
        if (requiredValidity === false) { 
            throw "Please complete all fields.";
        }
        errorDiv.style.display = "none";
        errorDiv.innerHTML = "";
    }
    
    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
    }


/* validate number fields for older browsers */
function validateNumbers() {
    var numberInputs = document.querySelectorAll(
       "#contactinfo input[type=number]");
    var elementCount = numberInputs.length;
    var numErrorDiv = document.getElementById("numErrorText");
    var numbersValidity = true;
    var currentElement;
    try {
       for (var i =0; i < elementCount; i++) {
           // validate all input elements of type "number" in fieldset
           currentElement = numberInputs[i];
           if (isNaN(currentElement.value) || (currentElement.value  === "")) {
           currentElement.style.background = "rgb(255,233,233)"; 
           numbersValidity = false;
           } else {
                currentElement.style.background = "white";
           } 
}
        if (numbersValidity === false) {
           throw "Zip and Social Security values must be numbers.";
        }
        numErrorDiv.style.display = "none";
        numErrorDiv.innerHTML = "";
    }
    catch(msg) {
         numErrorDiv.style.display = "block";
         numErrorDiv.innerHTML = msg;
        

/* On click one name is submitted */
<input type = "submit" onclick = "var message='Thanks for your order! We appreciate your business.'; window.alert(message)" />



/* verify at least one treat checkbox is checked */
function verifyMenu() {
    testFormCompleteness();
}

/* validate  first name section */
function verifyfName() {
    var validity = true;
    var messageText = ""
    try {
        var fnameElement = document.getElementById("fName");
        if (name.value >0) {
         throw "Invalid text. Please enter your name.";
        }
}
catch(message) {
    validity = false;
    return false;
}
  finally { 
    nameValid =false;
  }
    return false;
}
    
 function verifylName() {
    var validity = true;
    var messageText = ""
    try {
        var lnameElement = document.getElementById("lName");
        if (name.value >0) {
         throw "Invalid text. Please enter your name.";
        }
}
catch(message) {
    validity = false;
    return false;
}
  finally { 
    nameValid =false;
  }
    return false;
}
/* validate address fieldsets */
function validateAddress (fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#"+ fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;

    try {
        for (var i = 0; i < elementCount; i++) {
            // validate all input elements in fieldset
            currentElement = inputElements[i];
            if (currentElement.value === "") {
              currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            } else {
                currentElement.style.background = "white";
            }
        }
            currentElement = document.querySelector("#"+ fieldsetId +  " select");
            // validate state select element
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity =false;
             } else {  
                 currentElement.style.border ="";
             }
            if (fieldsetValidity === false) {
                // throw appropriate message based on current fieldset
                if (fieldsetId === "billingAddress") {
                    throw "Please complete all Billing Address information.";
               } else {
                   throw "Please complete all Delivery Address information.";
               }
              } else {
                  errorDiv.style.display = "none";
                  errorDiv.innerHTML = "";
              } 
    }
        catch(msg) {
          errorDiv.style.display = "block";
          errorDiv.innerHTML = msg;
          formValidity = false;
      } 
}

    /* validate form */
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault(); // prevent form from submitting
     } else {
          evt.returnValue = false; // prevent form from submitting in IE8
     }
     formValidity = true; // reset value for revalidation
     validateRequired();
     validateNumbers();
     validateAddress("billingAddress")
     if (formValidity === true) {
         document.getElementsByTagName("form")[0].submit();
     }
  // replace with calls to validation functions
  if (formValidity ===true) {
     document.getElementById("errorText").innerHTML ="";
     document.getElementById("errorText").style.display ="none";
     document.getElementsByTagName("form")[0].submit();
   } else {  
     document.getElementById("errorText").innerHTML ="Please fix 
   the indicated problems and then resubmit your order.";
      document.getElementById("errorText").style.display ="block";
       scroll(0,0);
   }
    
function treatItems(event){
  if (event === undefined) { // get caller element in IE8
      event=window.event;
}  
  var callerElement = event.target ||event.srcElement;
  var treatName = callerElement.value;
  if (callerElement.checked) { // if box has just been checked
      // add checkbox value to menu array
      treat.push(treatName);
    var newTreat = document.createElement("li");
    newTreat.innerHTML = treatName;
    document.getElementById("profileTreat").appendChild(newTreat);
    document.getElementById("profile").style.display = "block";
    document.getElementById("treatSection").style.display ="block";
} else { // if box has just been unchecked
    var listItems =document.querySelectorAll ("#profileTreat li");
    for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === treatName) {
             // remove element at index i from array
             treat.splice(i, 1);

            // remove lodging from profile list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}
    
    // convert form input to strings for submission
function convertToString() {
    
    arrayString = treat.toString();
    // convert profile object to string
    objectString = JSON.stringify(profile);
}
    
/* create event listeners */
function createEventListeners() {
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
    var dateField = document.getElementById("tripDate");
        if (dateField.addEventListener) {
            dateField.addEventListener("click", displayCalendar, false);
          } else if (dateField.attachEvent) {  
              dateField.attachEvent("onclick", displayCalendar);
          }
    
    var dateCells =document.getElementsByTagName("td");
    if (dateCells[0].addEventListener) {
        for (var i =0; i < dateCells.length; i++) {
           dateCells[i].addEventListener("click", selectDate, false);
        }
    } else if (dateCells[0].attachEvent) {
         for (var i =0; i < dateCells.length; i++) {
             dateCells[i].attachEvent("onclick", selectDate);
         }
    }
    
    var closeButton = document.getElementById("close");
    if (closeButton.addEventListener) {
        closeButton.addEventListener("click", hideCalendar, false);
    }   else if (closeButton.attachEvent) {
        closeButton.attachEvent("onclick", hideCalendar);
    }
   
    var prevLink = document.getElementById("prev");
    var nextLink = document.getElementById("next");
    if (prevLink.addEventListener) {
        prevLink.addEventListener("click", prevMo, false); 
        nextLink.addEventListener("click", nextMo, false);
    } else if (prevLink.attachEvent) {  
        prevLink.attachEvent("onclick", prevMo);
        nextLink.attachEvent("onclick", nextMo);
    } 
    
    var treat = document.getElementsByName("treats");
   if (treats[0].addEventListener) {
      for (var i = 0; i < treats.length; i++) {
        treats[i].addEventListener("change", treatItems, false);
      }
   } else if (treats[0].attachEvent) {
      for (var i = 0; i < treats.length; i++) {
        treats[i].attachEvent("onchange", treatItems;
      }
   }
    var button =document.getElementById("createBtn");
    if (button.addEventListener) {
        button.addEventListener("click", convertToString, false);
    } else if (button.attachEvent) {
        button.attachEvent("onclick", convertToString);
    }
}

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}



        