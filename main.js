//Var declaration
var form = document.querySelector("#loan-form"); 
var amount = document.querySelector("#amount");
var interest = document.querySelector("#interest");
var years = document.querySelector("#years");
var monthlyPayment = document.querySelector("#monthly-payment");
var totalPayment = document.querySelector("#total-payment");
var totalInterest = document.querySelector("#total-interest");

var principal,calculatedInterest,calculateYears;




form.addEventListener("submit",function(event){

  //load the spinner for 3000ms
  loadSpinner();  
  event.preventDefault();  
});

//Load spinner
function loadSpinner()
{
  //hide the results
  document.querySelector("#results").style.display = "none";
  
  document.querySelector(".spinner-border").style.display = 'block'; 
  setTimeout(clearSpinner,2000);
}
//Unload spinner
function clearSpinner()
{
  document.querySelector(".spinner-border").style.display = 'none';
  calculateResults();

}

//Calculate
function calculateResults(event) 
{
  principal = parseFloat(amount.value);
  calculatedInterest = parseFloat(interest.value)/100/12;
  calculatedPayments = parseFloat(years.value)*12;

  //Monthly Payments
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2); 
    
    document.querySelector("#results").style.display = 'block';
  }else{
    showError("please check your numbers :(");
  }  
}

//error
function showError (error)
{
  //create a div element
  var errorDiv = document.createElement("div");
  //Add class
  errorDiv.classList = "alert alert-danger";
  //add a Attribute i.e role = alert
  errorDiv.setAttribute("role","alert");
  //Add a text
  errorDiv.textContent = "Hey There :) , Enter the Values!!!";

  //Insert the errorDiv element above Loan Calculator
  var card = document.querySelector(".card"); 
  var heading = document.querySelector(".heading");
  card.insertBefore(errorDiv,heading);  //card=parent , heading and errorDiv = siblings
  
  //set-timeout
  setTimeout(clearError,3000);
} 

function clearError()
{
  document.querySelector(".alert").remove();
}