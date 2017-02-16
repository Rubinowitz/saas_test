/* global $, Stripe */
//document ready
$(document).on('turbolninks:load', function(){
  
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));


  //When user clicks for submit btn,
  submitBtn.click(function(event){
    
    //prevent default submission
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //Collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //use strip to validate the card
    var error = false;
    
    //validation
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card number appears to be invalid!');
    }
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The CVC number appears to be invalid!');
    }
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appears to be invalid!');
    }
    
    
    if(error){
      //don't send the card
      submitBtn.val("Sign Up").prop('disabled', false);
      
    }
    else{
      //Send the card info to stripe
      
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  
  //stripe will return a card token
 function stripeResponseHandler(status, response) {
    //Get the token from response
    var token = response.id;
    
    //incject token as hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //submit with token
    theForm.get(0).submit();
 }
});