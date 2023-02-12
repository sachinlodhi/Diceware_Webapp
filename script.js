const submit = document.getElementById("submit");
const language = document.getElementById("languages");
const number = document.getElementById("num");
const box = document.querySelectorAll("img");

/// Function to load the wordlist in the begining 
async function wordListLoader(langOption)
{ 
  // console.log(langOption);
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

let listHING ={}
wordListLoader("hinglish").then(data => (listHING = data));

let listDEV = {}
wordListLoader("devanagari").then(data => (listDEV = data));

let listCH = {}
wordListLoader("chinese").then(data => (listCH = data));

let listEL = {}
wordListLoader("greek").then(data => (listEL = data));

let listPB = {}
wordListLoader("punjabi").then(data => (listPB = data));


async function display(lang, len) // take this from frontend
{  
    // console.log(lang);
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
    if(lang == "hinglish")
    {
      // console.log("Selected hinglish");
    selectedLang = listHING;
    // console.log(listHING);
    }
    if(lang == "devanagari")
    {
      // console.log("Selected hinglish");
    selectedLang = listDEV;
    // console.log(listHING);
    }
    if(lang == "chinese")
    {
      // console.log("Selected hinglish");
    selectedLang = listCH;
    // console.log(listHING);
    }


    if(lang == "greek")
    {
      // console.log("Selected hinglish");
    selectedLang = listEL;
    // console.log(listHING);
    }

    if(lang == "punjabi")
    {
      // console.log("Selected hinglish");
    selectedLang = listPB;
    // console.log(listHING);
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
passString = passString.trim();
return passString; 
} 


// for typerwriter effect

var i = 0; // for passString
var j = 0; // for entropy
var k = 0; // for comibnations
var speed = 60;
var passString =""

var entropyVal = ""
var possibleCombinations = ""
function typeWriter() {    
    if (i < passString.length || j<entropyVal.length || k<possibleCombinations.length) {
      document.getElementById("finalPass").innerHTML += passString.charAt(i);
      document.getElementById("finalEntropy").innerHTML += entropyVal.charAt(j);
      document.getElementById("finalCombo").innerHTML += possibleCombinations.charAt(j);

      i++;
      j++;
      k++;
      setTimeout(typeWriter, speed);
    }
  }

 submit.addEventListener("click", ()=>{ 
    event.preventDefault();
    // console.log("working");
    //resetting old printed results
    document.getElementById("finalPass").innerHTML = "";
    document.getElementById("finalEntropy").innerHTML = "";
    document.getElementById("finalCombo").innerHTML = "";
    i = 0;
    display(language.value, number.value).then(function(data){
    passString = data;
    // console.log("In passString:" , passString);
    typeWriter();
    calculateEntropy(passString, language.value);

});
   
 });



 function calculateEntropy(string, langVal) {
  // string = "found aloud tease mit ceil"
  let specialSymbol =/[ !@#$%^&*()-_+={}[\]|;:'\",.<>/~~~]/
  let digits = false;
  let uppers = false;
  let lowers = false;
  let specials = false;
  let space = 0;

  // For Latin, English, Hinglish, French 
if(["english", "french", "hinglish", "latin"].includes(langVal))
{
  // console.log("Language Detected : ", langVal);
  let lowercaseRegex = /[a-z]+/;
  let uppercaseRegex = /[A-Z]+/;
  let numberRegex = /[0-9]+/;
  // let specialCharRegex = /[!@#\$%\^&\*]+/;
  
   lowers = lowercaseRegex.test(string);
   uppers = uppercaseRegex.test(string);
   digits = numberRegex.test(string);
   specials = specialSymbol.test(string);
  //  specials = specialSymbol.test(string);
  
  if(digits)
  {
    space+=10;
  }
  if(uppers)
  {
    space+=26;
  }
  if(lowers)
  {
    space+=26;
  }
  if(specials)
  {
    space+=32;
  }
}


if(langVal == "german")
{
  // console.log("Language Detected : ", langVal);
  let lowercaseRegex = /[a-zäöüß]+/;
  let uppercaseRegex = /[A-ZÄÖÜ]+/;
  let numberRegex = /[0-9]+/;  
   lowers = lowercaseRegex.test(string);
   uppers = uppercaseRegex.test(string);
   digits = numberRegex.test(string);
   specials = specialSymbol.test(string);
  
  if(digits)
  {
    space+=10;
  }
  if(uppers)
  {
    space+=30;
  }
  if(lowers)
  {
    space+=30;
  }
  if(specials)
  {
    space+=32;
  }
  }

if (langVal == "devanagari")
{
  let charactersRegex = /[\u0900-\u097F]/;
  let numberRegex = /[\u0966-\u096F]/;

  lowers = charactersRegex.test(string);
  digits = numberRegex.test(string);
  specials = specialSymbol.test(string);

  if(digits)
  {
    space+=10;
  }
  if(lowers)
  {
    space+=48; //vowels and consonants
  }
  if(specials)
  {
    space+=32;
  }
}

if (langVal == 'hebrew')
{
  let charactersRegex = /[\u05D0-\u05EA]/;
  let numberRegex = /[\u0030-\u0039]/;

  lowers = charactersRegex.test(string);
  digits = numberRegex.test(string);
  specials = specialSymbol.test(string);

  if(digits)
  {
    space+=10;
  }
  if(lowers)
  {
    space+=22; //vowels and consonants
  }
  if(specials)
  {
    space+=32;
  }

}

if(langVal == "russian")
{
  let lowercaseRegex = /[а-яa-z]/;
let uppercaseRegex = /[А-ЯA-Z]/;
let numberRegex = /[0-9]+/;  
   lowers = lowercaseRegex.test(string);
   uppers = uppercaseRegex.test(string);
   digits = numberRegex.test(string);
   specials = specialSymbol.test(string);
 
   if(digits)
  {
    space+=10;
  }
  if(lowers)
  {
    space+=33; //vowels and consonants
  }
  if(uppers)
  {
    space+=33;
  }
  if(specials)
  {
    space+=32;
  }
}

if(langVal == "spanish")
{
  let lowercaseRegex = /[a-záéíóúñ]/
let uppercaseRegex = /[A-ZÁÉÍÓÚÑ]/
let numberRegex = /[0-9]+/

lowers = lowercaseRegex.test(string);
   uppers = uppercaseRegex.test(string);
   digits = numberRegex.test(string);
   specials = specialSymbol.test(string);
   if(digits)
   {
     space+=10;
   }
  if(lowers)
   {
     space+=32; //originals(a-z) and accented: á, é, í, ó, ú
   }
  if(uppers)
  {
    space+=32;
  }
   if(specials)
   {
     space+=32;
   }


}

if(langVal=="chinese")
{
  let lowercaseRegex = /[\u4e00-\u9fa5]+/
  let numberRegex = /[0-9]+/
  lowers = lowercaseRegex.test(string);
   digits = numberRegex.test(string);
   specials = specialSymbol.test(string);


   if(digits)
   {
     space+=10;
   }
   if(lowers)
   {
     space+=24; //basic chinese has 24 letters
   }  
   if(specials)
   {
     space+=32;
   }

}

if (langVal == "greek")
{
// this block has english+greek letters

  let lowercaseENGRegex = /[a-z]+/; // lowercase english
  let hasLowercase = /[\u0370-\u03FF]+/ // lowercase greek
  let hasUppercase = /[\u0391-\u03A9]+/ // uppercase greek
  let numberRegex = /[0-9]+/

  lowers = hasLowercase.test(string);
  uppers = hasUppercase.test(string);
  let lowersENG = lowercaseENGRegex.test(string);
  digits = numberRegex.test(string);
  specials = specialSymbol.test(string);

  if(digits)
  {
    space+=10;
  }
  if(lowers)
  {
    space+=24; //lower greek alphabets = 24
  }  
  if(uppers)
  {
    space+=24; //upper greek alphabets = 24
  }  
  if(lowersENG)
  {
    space+=26; //lower english alphabets = 26
  }
  if(specials)
  {
    space+=32;
  }

}

if (langVal == "punjabi")
{
// this block has english+greek letters

  
  
  let punjabiCharacter = /[\u0A00-\u0A7F]/ // all punjabi charcaters -> 48
  let numberRegex = /[0-9]+/
  let punjabiNumberRegex = /[\u0A66-\u0A6F]/ // punjabi numbers -> "੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", and "੯"

  lowers = punjabiCharacter.test(string);
  digits = numberRegex.test(string);
  let punjabiNums = punjabiNumberRegex.test(string);

  specials = specialSymbol.test(string);

  if(digits)
  {
    space+=10;
  }
  if(specials)
  {
    space+=32;
  }
  if(lowers)
  {
    space+=48; // gurmukhi has 48 alphabets
  }
  if(punjabiNums)
  {
    space+=10;
  }

}

//Calculation
// console.log("Special char : ", specialSymbol.length);
console.log("space : ", space);
console.log(string)
let possibleCombo = space ** string.length;
// console.log("Possible Comobo : ", possibleCombo);
let entropy = Math.log2(possibleCombo);
entropy = Math.ceil(entropy)
entropyVal = entropy.toString() + " bits"; 
possibleCombinations = possibleCombo.toString() + " ";
j = 0;
k = 0;
// console.log("Entropy is", entropyVal);
}


