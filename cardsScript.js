//The username is assigned to a variable
var userName=localStorage['user'];
// the welcome element in html is targeted
let welcomeMessage=document.getElementById("helloName")
// a hello message is displayed to the user 
welcomeMessage.innerText=`Hello ${userName}`



//this async function gets all Cards
async function getCards(){
    //this displays the loader
    let loader='<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

    let renderLoader=document.getElementById("output")
    renderLoader.innerHTML=loader
    let response=await fetch('https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English')
    //when the loader is finished the html is erased
    renderLoader.innerHTML="";
    let data= await response.json()

   
   //  the data is returned in an json format
    return data


   
}

//In this function the type dropdown gets populated
async function fillTypeOption(){

    //The dropdown gets selected
    let selectType=document.getElementById("typeDropDown")
    //The Loaders is assigned to a variable
    let loader='<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

    

    //This variable targets a dom element
    let renderLoader=document.getElementById("output")
    //The Dom elements gets the value of the loader
    renderLoader.innerHTML=loader

    //The API call is made to the server
   let response=await fetch('https://api.magicthegathering.io/v1/types')
  //The Data gets transformed to a JSOn
   let data=await response.json();

    //The dropdown gets populated in a for loop
      
   for(let i=0;i<data.types.length;i++){
   
    
    
//On each iteration a new option is given
    selectType.innerHTML+=`<option class="nav-item" value="${data.types[i]}">${data.types[i]}</option>` 
   }

   //The loader is deleted
   renderLoader.innerHTML="";
}
//The function is called immediately to populate the dropdown
fillTypeOption()

//In this function whenever the user opens up the cards. html all the cards from the api are displayed
getCards().then(function(x){
    //The dom element is targeted
    let renderCard=document.getElementById("renderCards")
    //A for Loop is made to iterate through each array of Objects
    for(let i=0;i<x.cards.length;i++){
        //On each iteration the renderCard html property is added with data from our api call
        renderCard.innerHTML+=`<div>
        
        <p>${x.cards[i].name}</p>
        <p>${x.cards[i].types}</p>
        <p>${x.cards[i].setName}</p>
        <p>${x.cards[i].colors}</p>
        </div>`
    }

})



//Here the search button is targeted
let searchBtn=document.getElementById("searchBtn")




   

  
//An event listener is added to the btn, then the initiateSearch function is called
searchBtn.addEventListener(`click`,function initiateSearch(){
   //The Search by Name input is targeted
    let searchByName=document.getElementById("searchCards")
    //The div where the cards will be shown is targeted
    let renderCard=document.getElementById("renderCards")
    //The Css class of the cards is added
    renderCard.className="cards-container"
    //The option of the colors is targeted
    let getColorOption=document.getElementById("colorDropDown")
    //I erase the render card inner html everytime the btn is clicked so that new data can take it's place
    renderCard.innerHTML=""
    //An asynchronous .then is added to the getCards so JavaScript waits until the promise is fullfilled
    getCards().then(function(x){
        //The type of the cards dropdown it gets targeted
        let typeOption= document.getElementById("typeDropDown")

         //Here the value of each index in the dropdown is assigned to a variable
        let getColorValue=getColorOption.options[getColorOption.selectedIndex].value
        let getTypeValue=typeOption.options[typeOption.selectedIndex].value

        //Using the filter method an array of Objects is created by the search by Name value
        let filterByText=x.cards.filter(x=>x.name.includes(searchByName.value))
        //Using the filter method an array of Objects is created by the type value
        let filterByType=x.cards.filter(x=>x.types.includes(getTypeValue))

        //Using the filter method an array of Objects by the color value
        let filterByColor=x.cards.filter(x=>x.colors.includes(getColorValue))
         
        
        function returnTextTypeQuery(){
            //In the below variable a filter query is made to assign the values to a new query based on our parameters
            let searchQueryTextAndType=filterByText.filter(o1=>filterByType.some(o2=>o1.name===o2.name))
            //An empty array is declared
            let arrayOfObjects=[]
            //An iteration is made on each object of the array
            for (let index=0;index<searchQueryTextAndType.length;index++){

                
            //On each iteration the object is assigned to the element variable
               let element=searchQueryTextAndType[index]
               //then the objects are pushed one by one to the empty array above
                arrayOfObjects.push(element)
            }
        
            //Finally the array of Objects is returned
            return arrayOfObjects;
        };
        //Those objects are assigned to a more "global variable"
        var query= returnTextTypeQuery()
        //The same method is used for other search queries
       function returnTextTypeColorQuery(){

        let textTypeColorQuery=query.filter(o1=>filterByColor.some(o2=>o1.name===o2.name))
        let arrayQuery=[]
        for(let index=0;index<textTypeColorQuery.length;index++){

            let elements=textTypeColorQuery[index]

            arrayQuery.push(elements)


            
        }
        return arrayQuery
       }
 //Those objects are assigned to a more "global variable"
       var textTypeColorQuery=returnTextTypeColorQuery();
 //The same method is used for other search queries
      function returnTextColorQuery(){

        let textColorQuery=filterByText.filter(o1=>filterByColor.some(o2=>o1.name===o2.name))
        let arrayQuery=[]
        for(let index=0;index<textColorQuery.length;index++){
            let elements=textColorQuery[index]

            arrayQuery.push(elements)
        }
 
        return arrayQuery
      }

      


      
//Those objects are assigned to a more "global variable"
      var textColorQuery=returnTextColorQuery()

      
    
       //The same method is used for other search queries
      function typeColorQuery(){

        let typeColorQuery=textColorQuery.filter(o1=>filterByType.some(o2=>o1.name===o2.name))
       

       

        return typeColorQuery
      }
//Those objects are assigned to a more "global variable"
      var typeColorObjects=typeColorQuery()

      //Here a function with one parameter is declared so that the object can be sorted by an Ascending order
     function sortByAscending(arrayOfObjects){

        let newArray=[]

        arrayOfObjects.forEach(element => {


            newArray.push(element)

            newArray.sort((a,b)=>{

                fa=a.name
                fb=b.name

                if(fa<fb){
                    return -1;
                }

                if(fa>fb){
                    return 1;
                }

                return 0
            })
            
        });
        
        return newArray

     }

      //Here a function with one parameter is declared so that the object can be sorted by a Descending order
     function sortByDescending(arrayOfObjects){

        let newArray=[]

        arrayOfObjects.forEach(element => {


            newArray.push(element)

            newArray.sort((a,b)=>{

                fa=a.name
                fb=b.name

                if(fa>fb){
                    return -1;
                }

                if(fa<fb){
                    return 1;
                }

                return 0
            })
            
        });
        
        return newArray

     }

//In this function the Objects are inserted in our html, based on our needs
     function insertHtmlObjects(arrayOfObjects){
        renderCard.innerHTML="";
        for(let i=0;i<arrayOfObjects.length;i++){


               

             
             
            renderCard.innerHTML+=
            `<div><p>${arrayOfObjects[i].name}</p>
            <p>${arrayOfObjects[i].types[0]}</p>
            <p>${arrayOfObjects[i].setName}</p>
            <p>${arrayOfObjects[i].colors}</p></div>`
        }

     }

     

     
     //The sort dropDown is targeted and stored in a variable
      let sortDropDown=document.getElementById("sortDropDown")
        //The value of the selected dropdown is assigned to a variable
        let sortValue=sortDropDown.options[sortDropDown.selectedIndex].value

     //In the below conditions check are made to see what type of search query was made
        if(query.length===0&&textTypeColorQuery.length===0&&textColorQuery.length===0&&typeColorObjects.length===0){
            
           //Objects in ascending order are stored in a variable
            var sortnewArrayToAscend=sortByAscending(filterByText)
            //Objects in descending order are stored in a variable
            var sortnewArraytoDescend=sortByDescending(filterByText)

            //In the below if's a check is made to see which ascending/descending dropdown was selected by the user
            if(sortValue=="ascending"){
                insertHtmlObjects(sortnewArrayToAscend)
                
            }
            if(sortValue=="descending"){

                insertHtmlObjects(sortnewArraytoDescend)
               
            }
            //If is there no sorting dropdown selected all the objects from the search query are displayed
            else if(sortValue=="null"){
                insertHtmlObjects(filterByText)
            

            }
            }
    //The same methods are used for all the other possible queries
        if(query.length>0&&textTypeColorQuery==0&&textColorQuery==0&&typeColorObjects){
                
            var sortnewArrayToAscend=sortByAscending(query)
            var sortnewArraytoDescend=sortByDescending(query)
            if(sortValue=="ascending"){
                insertHtmlObjects(sortnewArrayToAscend)
                
            }
            if(sortValue=="descending"){

                insertHtmlObjects(sortnewArraytoDescend)
            }
            else  if(sortValue=="null"){
                insertHtmlObjects(query)

            }



        }
//The same methods are used for all the other possible queries
        if(textTypeColorQuery.length>0){
            var sortnewArrayToAscend=sortByAscending(textTypeColorQuery)
            var sortnewArraytoDescend=sortByDescending(textTypeColorQuery)

            if(sortValue=="ascending"){
                insertHtmlObjects(sortnewArrayToAscend)
                
            }
            if(sortValue=="descending"){

                insertHtmlObjects(sortnewArraytoDescend)
            }
            else  if(sortValue=="null"){
                insertHtmlObjects(textTypeColorQuery)

            }


        }
//The same methods are used for all the other possible queries
        if(getTypeValue=="null"&&textColorQuery.length>0){
            var sortnewArrayToAscend=sortByAscending(textColorQuery)
            var sortnewArraytoDescend=sortByDescending(textColorQuery)

            if(sortValue=="ascending"){
                insertHtmlObjects(sortnewArrayToAscend)
                
            }
            if(sortValue=="descending"){

                insertHtmlObjects(sortnewArraytoDescend)
            }
            else  if(sortValue=="null"){
                insertHtmlObjects(textColorQuery)

            }

        }
//The same methods are used for all the other possible queries
        if(searchByName.value==""&&typeColorObjects>0){
            
            var sortnewArrayToAscend=sortByAscending(typeColorObjects)
            var sortnewArraytoDescend=sortByDescending(typeColorObjects)
           
            if(sortValue=="ascending"){
                insertHtmlObjects(sortnewArrayToAscend)
                
            }
            if(sortValue=="descending"){

                insertHtmlObjects(sortnewArraytoDescend)
                
            }
            else  if(sortValue=="null"){
                insertHtmlObjects(typeColorObjects)

            }

        }
        //After the program finishes with all the possible outcomes, it does a last check
    }).then(function(){

           //JavaScript checks if the HTML element has children, if the below statement is true, then it means that one of the above condition was met
let checkForCards=document.getElementById("renderCards").hasChildNodes();


        
        //if the statement is false, the renderCard element gets new Html elements, and a new class displaying that there are no cards from the Api by that Search Query
        if(checkForCards===false){
            renderCard.className="nocontent"
            renderCard.innerHTML=`<div>
                <h1>There Are No Cards With your Search Query</h1>
            </div>`
        }
       
    })

 
})






