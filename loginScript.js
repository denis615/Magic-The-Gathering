
//Targeting the submit button trhough the DOM

let submitBtn=document.getElementById("submit");

//Adding an event listener to call a function everytime the btn is clicked
submitBtn.addEventListener(`click`,function(){

   // this function checks if the first char of the string is an uppercase
    function checkUpperCaseLetter(string){
        let i=0;
        var character="";

        while(i<=string.length){
            character=string.charAt(0);
            if(character==character.toUpperCase()){
                return true;
            }

            else{
                return false;
            }
        }
        
    }
    // Here there is a  check if the username passes the conditions
    let userNameField=document.getElementById("userName").value;
    if(userNameField.length<3){
        let logInOutput=document.getElementById('loginOutput')
       // the class from CSS to make the element red is added
        logInOutput.className='log-in-output-error'
        logInOutput.innerText="The Username Should be at least 3 letters"
    }
    if(checkUpperCaseLetter(userNameField)===false){
        let logInOutput=document.getElementById('loginOutput')
        logInOutput.className='log-in-output-error'
  //the class from CSS to make the element red is added
        logInOutput.innerText="The First Letter should be an uppercase letter!"
    }
    else 
    if(userNameField.length>=3 && checkUpperCaseLetter(userNameField)===true){
        //If all the conditions are met a green text is displayed
        let logInOutput=document.getElementById('loginOutput')
        logInOutput.className='log-in-output-success'
       

        logInOutput.innerText="You Have  Successfully logged in"

        //The timeout functions stalls a little bit opening the other page because there was not enough time to see the You have logged in message
        setTimeout(function(){
        window.open("cards.html","_self")
    },700)
    }

    //The user is assigned to local storage so it can be fetched from the other Script
   localStorage['user']=`${userNameField}`


   
})