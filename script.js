const submit = document.getElementById("submit");
// const p = document.getElementById("data-table");
const language = document.getElementById("languages");
const number = document.getElementById("num");
// const passphrase = document.querySelector(".typewriter")
const box = document.querySelectorAll("img");

// var all={};


/// Function to load the wordlist in the begining 
async function wordListLoader(langOption)
{ 
    let result = {}
    var all = ''
await fetch ("./file/" + langOption + ".txt")
.then(response => response.text())
.then(data => {
    all += data + "\n";
})
.catch(error => console.log(error));

result = Object.fromEntries(all.trim().split('\n').map(s => s.split(' ')))

return result;

}


let listEN ={}
wordListLoader("english").then(data => (listEN = data));


let listES = {}
wordListLoader("spanish").then(data => (listES = data));


let listRU = {}
wordListLoader("russian").then(data => (listRU = data));

let listFR = {}
wordListLoader("french").then(data => (listFR= data));

let listDE = {}
wordListLoader("german").then(data => (listDE = data));

let listHE = {}
wordListLoader("hebrew").then(data => (listHE = data));

let listLatin = {}
wordListLoader("latin").then(data => (listLatin = data));







// console.log(listEN);

async function display(lang, len) // take this from frontend
{  
    console.log(lang);
    let selectedLang = {}
    // //  selected english for operation
    if(lang == "english")
    {
    selectedLang = listEN;
    // console.log(selectedLang);
    }

    if(lang == "spanish")
    {
    selectedLang = listES;
    // console.log(selectedLang);
    }


    if(lang == "french")
    {
    selectedLang = listFR;
    // console.log(selectedLang);
    }

    if(lang == "german")
    {
    selectedLang = listDE;
    // console.log(selectedLang);
    }
    if(lang == "hebrew")
    {
    selectedLang = listHE;
    // console.log(selectedLang);
    }
    if(lang == "latin")
    {
    selectedLang = listLatin;
    // console.log(selectedLang);
    }
    if(lang == "russian")
    {
    selectedLang = listRU;
    // console.log(selectedLang);
    }

    var passString = ""; // Final string
    var t = 0; // To generate digits [1-6]]
    var dTrial = 0; // to store 5 digits temporary number


    for(let i = 0; i<len; i++ ){ // loop for each word 
        for ( let n = 0; n<5; ++n) // loop for each digit of 5 digit number
            { 
                t = Math.floor(Math.random() * 6) + 1;
                dTrial*=10;
                dTrial+=t;
            }
       
        passString+=selectedLang[dTrial]+" "; //Appending results and giving space
        dTrial = 0; // Setting dTrial to 0 to store the number in next trial
      
    }


return passString; 
} 



var i = 0;
var speed = 100;
var passString =""
  function typeWriter() {

    // console.log(passString.length);

    
    if (i < passString.length) {
      document.getElementById("finalPass").innerHTML += passString.charAt(i);
      i++;
    //   console.log(i);
      setTimeout(typeWriter, speed);
    }
  }




 submit.addEventListener("click", ()=>{
    
    event.preventDefault();
    document.getElementById("finalPass").innerHTML = "";
    i = 0;
    display(language.value, number.value).then(function(data){
    // console.log(passphrase.children[0]);
    // passphrase.children[0].innerHTML = data;
    passString = data;
    console.log("In passString:" , passString);
    typeWriter();









});
   
    
 });

 


 
 
