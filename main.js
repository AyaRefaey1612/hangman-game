let letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
let divOfLetters=document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span=document.createElement("span");
    let spanText=document.createTextNode(letter);
    span.appendChild(spanText);
    span.className="letter-box"; 
     

   divOfLetters.appendChild(span);

});


fetch("hang.json")
.then((response)=>(response.json()))
.then((words)=>{
    console.log(words);

    let keys=Object.keys(words);
let randomNumber=Math.floor(Math.random()*keys.length);
let randomName=keys[randomNumber];
let randomArray=words[randomName];
let randomVAlueNumber=Math.floor(Math.random()*randomArray.length);
let randomWord=randomArray[randomVAlueNumber];
// console.log(randomWord);

// set category name
document.querySelector(".catogory span").innerHTML=randomName;

let lettersNumber=Array.from(randomWord);
let lettersGuess=document.querySelector(".letters-guess");

lettersNumber.forEach(letter =>{
 let spanGuess=document.createElement("span");
 if(letter === " "){
    spanGuess.className="with-space";
 }
lettersGuess.appendChild(spanGuess);
 
});

let wrongNumbers=0;
let successNumbers=0;
let theDraw=document.querySelector(".hangman-draw");

let lettersGuessSpan=document.querySelectorAll(".letters-guess span");
document.addEventListener("click" ,e=>{
    let Thestatus=false;
    if(e.target.className === "letter-box"){
        e.target.classList.add("clicked");
    
    let clickedLetter=e.target.innerHTML.toLowerCase();
    
    lettersNumber.forEach((letter ,index)=>{
    if(clickedLetter == letter.toLowerCase()){
         Thestatus=true;
         let spansLetter="";
        lettersGuessSpan.forEach((span , sapnIndex) =>{
            if(sapnIndex == index){
                span.innerHTML=letter;
            }
        });
        lettersGuessSpan.forEach((span)=>{
            if(span.className == "with-space"){
                spansLetter+=" ";
                
            }else{
                spansLetter+=span.innerHTML;
            }
      
         
         if(span.innerHTML === " "){
            console.log("this is space");
         }
        })
       console.log(spansLetter);
       console.log(randomWord); 
       console.log(`${spansLetter} === ${randomWord}`)
       if(spansLetter === randomWord){
       
        congratulations();


       }
    }

})



if(Thestatus == false){
    wrongNumbers+=1;

    theDraw.classList.add(`Wrong-${wrongNumbers}`);
    document.querySelectorAll(".letter-box").forEach(element => {
        element.classList.add("no-click");
    });
 
      document.getElementById("fail").play();
 
   
    setTimeout(() => {
        document.querySelectorAll(".letter-box").forEach(element => {
            element.classList.remove("no-click");
        });
        }, 1500);
    
    

    if(parseInt(wrongNumbers) == 8){
        endGame();
        console.log("yes")
        document.querySelector(".letters").classList.add("finished");
        

    }
    
}else{
    successNumbers+=1;
    document.querySelectorAll(".letter-box").forEach(element => {
        element.classList.add("no-click");
    });
    
      document.getElementById("Success").play();
   
   
    setTimeout(() => {
        document.querySelectorAll(".letter-box").forEach(element => {
            element.classList.remove("no-click");
        });
        }, 1500);
    
}
    }
});

function endGame(){
    let poPup=document.createElement("div");
    poPup.className="po-pup";
    poPup.innerHTML=`<sapn>GAME OVER, The Word Is ${randomWord}</sapn>`;
    let poPupText=document.createTextNode(`Your fail tries is 8 and your success tries is ${successNumbers}`)
    poPup.appendChild(poPupText);  
    let i=document.createElement("i");
    i.className="fa-solid fa-face-meh";
    poPup.appendChild(i);
    document.querySelector(".letters-guess").appendChild(poPup);
    console.log(lettersNumber);
    console.log(document.querySelector(".letters-guess span").innerHTML);
}

function congratulations(){
    let successDiv=document.createElement("div");
    successDiv.className="popup-success";
    wrongNumbers == 1 || wrongNumbers == 2 ?successDiv.innerHTML=`Congratulations, Your fail tries is ${wrongNumbers} "Excellent"`: wrongNumbers == 3 || wrongNumbers == 4 ?successDiv.innerHTML=`Congratulations, Your fail tries is ${wrongNumbers} "Very Good"`:wrongNumbers == 5 || wrongNumbers == 6 ?successDiv.innerHTML=`Congratulations, Your fail tries is ${wrongNumbers} "Good"`:wrongNumbers == 7 ?successDiv.innerHTML=`Congratulations, Your fail tries is ${wrongNumbers} "Not Bad"`: 
    successDiv.innerHTML=`Congratulations, you are a genius, Your fail tries is ${wrongNumbers == 1 || wrongNumbers == 2 ?console.log("good"):console.log("bad")}  `;
    let i=document.createElement("i");
    i.className="fa-solid fa-face-laugh-beam";
    successDiv.appendChild(i);
    document.querySelector(".letters-guess").appendChild(successDiv);
    document.querySelector(".letters").classList.add("finished");
}
})



