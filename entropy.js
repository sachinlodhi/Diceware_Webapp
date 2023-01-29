let space =0;
let specialSymbol = "!@#$%^&*()-_+={}[]|;:'\",.<>/~~~~" // Increased it to 
let afasfsdafasfa = " !@#$%^&*()-_+={}[]|;:'\",.<>/~~~"
let t = "HelLo 23 $"
let nums = "0123456789"




function checkPresence(input) {
  let digits = false;
  let uppers = false;
  let lowers = false;
  let specials = false;


  let lowercaseRegex = /[a-z]+/;
  let uppercaseRegex = /[A-Z]+/;
  let numberRegex = /[0-9]+/;
  let specialCharRegex = /[!@#\$%\^&\*]+/;
  
   lowers = lowercaseRegex.test(input);
   uppers = uppercaseRegex.test(input);
   digits = numberRegex.test(input);
   specials = specialCharRegex.test(input);


//   for (let i = 0; i < string.length; i++) {
//       if (string[i].match(/[0-9]/) && digits == false) {
//           digits= true;
//       } else if (string[i].match(/[A-Z]/) && uppers == false) {
//           uppers = true;
//       } else if (string[i].match(/[a-z]/) && lowers == false) {
//           lowers = true;
//       } else {
//           specials = true;
//       }
//   }
  return { digits, uppers, lowers, specials };
}

// let string = "hello @123 Palak";
let string = "IncoRRect77$%&";
console.log(specialSymbol.length);

reponse = checkPresence(string);
// console.log(reponse["digits"]);
if(reponse["digits"])
{
space+=10;
}
if(reponse["uppers"])
{
space+=26;
}
if(reponse["lowers"])
{
space+=26;
}
if(reponse["specials"])
{
space+=specialSymbol.length;
}

console.log(space);

// Caculation

let possible_combo  = space ** string.length
console.log("Possbile COmbo: ", possible_combo);
let entropy = Math.log2(possible_combo);
console.log(entropy + " bits");

// let st = "Hello नमस्ते";
// let regex = /[\u0915-\u0939\u093C-\u094D\u0950-\u0954\u0958-\u0963\u0966-\u097F]/;
// console.log(regex.test(st));