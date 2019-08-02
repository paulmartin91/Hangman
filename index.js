// array with phrases

let rawPhrases = ["hire paul", "paul is great", "  and he writes really good code  ", "  plus he has a puppy", " you don't hate puppies? ", "do you?"];
//let rawPhrases = ["test", "test", "test"]
let phrases = [];

rawPhrases.forEach(x=>{
let y = x.toUpperCase();
let counter = 0;
let tempArr = y.split("");
tempArr.forEach(x=>{
if (x.match(/[a-z]/i)) counter++;
}) //g
tempArr.push(counter);
phrases.push(tempArr);
  })

var phrasesCounter = 0;

//array with hangman parts

var hangmanParts = [
  "hmStrut1",
  "hmStrut2",
  "hmStrut3",
  "hmStrut4",
  "hmRope",
  "hmHead",
  "hmBody",
  "hmArmL",
  "hmArmR",
  "hmLegL",
  "hmLegR"
];

//function to hide the hangman

function hmHide() {
  for (let i = 0; i < hangmanParts.length; i++) {
    console.log(i)
    document.getElementById(hangmanParts[i]).style.visibility = "hidden";
  }
}

//function to create hidden letters

function hiddenLetters() {
  for (let i = 0; i < phrases[phrasesCounter].length - 1; i++) {
    var para = document.createElement("div");
    var node = document.createTextNode(phrases[phrasesCounter][i]);
    para.appendChild(node);
    para.setAttribute("id", "letterBoxes");
    para.setAttribute("class", "letter" + phrases[phrasesCounter][i]);

    //go
    if (phrases[phrasesCounter][i] == " ") {
      para.style.visibility = "hidden";
    }
    para.style.fontSize = "0em";
    
       if (phrases[phrasesCounter][i] == "'" || phrases[phrasesCounter][i] == "?") {
      para.style.fontSize = "2em";
    }
    
    var element = document.getElementById("hmHiddenLetterBox");
    element.appendChild(para);
  }
}

//hmHide(); //hide hangman

//hiddenLetters(); //create letters


//start again
function newGame(bool) {
  
  //hides win/loose messages
  document.getElementById("hmWinner").style.visibility = "hidden";
  document.getElementById("hmLooser").style.visibility = "hidden";
  document.getElementById("hmFinished").style.visibility = "hidden";

  //deletes elements created in hiddenLetters function
  for (let i = 0; i < phrases[phrasesCounter].length - 1; i++) {
    
  let x = document.getElementsByClassName("letter" + phrases[phrasesCounter][i]);
  let p;
  for (p = 0; p < x.length; p++) {
    x[p].outerHTML = "";
  }

   // document.getElementsByClassName("letter" + phrases[phrasesCounter][i]).outerHTML = "";
  }
  
  if (bool == false) {
phrasesCounter = 0;} else {phrasesCounter++}

  //loads new phrase or resets to 0

  hmHide(); // hides hangman

  //makes all clickable letters visible
  for (let i = 1; i < 27; i++) {
    document.getElementById(
      "letterBox" + String.fromCharCode(64 + i)
    ).style.visibility =
      "visible";
  }

  //recreates elements for hidden letters

  hiddenLetters();

  //reset winCount
  winCount = 0;
  //reset loosecount
  looseCount = 0;
}

var winCount = 0; //counts correct letters guessed
var looseCount = 0; //counts incorrect letters guessed

function letterClick(clickedLetter) {
  var noCounter = 0;

  //hides clicked letter
  document.getElementById(clickedLetter.id).style.visibility = "hidden";
  
  //cycles through phrase array
  for (let i = 0; i < phrases[phrasesCounter].length; i++) {
    //if it is in there, shows letter, +1 to winCount
    if (
      clickedLetter.getAttribute("data-target") == phrases[phrasesCounter][i]) {
      
  let x = document.getElementsByClassName("letter" + phrases[phrasesCounter][i]);
  var p;
  for (p = 0; p < x.length; p++) {
    x[p].style.fontSize = "2em";
  }
         winCount++;
      
      // $("#letter"+phrases[phrasesCounter][i]).css("font-size", "2em");

      //have you won?
      if (
        winCount == phrases[phrasesCounter][phrases[phrasesCounter].length - 1]
      ) {
          if (phrasesCounter == phrases.length-1){
  document.getElementById("hmFinished").style.visibility = "visible";
  } else {
  
        document.getElementById("hmWinner").style.visibility = "visible";
  }
      }
    } else {
      //counts inncorrect letters in phrases array
      noCounter++;
    }
  }
  //if you guessed an incorrect letter
  if (noCounter == phrases[phrasesCounter].length) {
    //shows hangman part
    document.getElementById(hangmanParts[looseCount]).style.visibility =
      "visible";
    //adds 1 to looseCount
    looseCount++;
    //if all hangman parts are showing, loose message shows
    if (looseCount == hangmanParts.length) {
      document.getElementById("hmLooser").style.visibility = "visible";
    }
  }
}

newGame(false);