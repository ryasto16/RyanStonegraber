
var lengthOfText = 85 //# of characters(85 default)(should be multiple of 5)
var randomStringArray

resetPage();
console.log("Random String:");
console.log(randomStringArray);

var userStringArray = [];
var started = false;
var startTime;

// this happens everytime a key is pressed
function checkWord(event){

    if(started == false){ //used for timing. clock starts the first time a key is pressed after resetPage()
        started = true;
        startTime = performance.now();
    }

    userStringArray = (document.getElementById("inputText").value).split(" "); //saves what user has typed to array
    console.log(userStringArray);

    if(userStringArray.length  >=  randomStringArray.length && (userStringArray[userStringArray.length -1]).length === (randomStringArray[randomStringArray.length-1]).length ){//checks for end of typing             
        var endTime = performance.now();
        console.log("ENDED");
        console.log("Random String:");
        console.log(randomStringArray);
        console.log("User Typed String:");
        console.log(userStringArray);
        document.getElementById("inputText").disabled = true;
        document.querySelectorAll(".wordList").forEach(function(element){
            element.style.backgroundColor = "transparent";
        });

        var errors = 0;
        randomStringArray.forEach(function(element, index){
            if(element !== userStringArray[index]){
                errors+=1
            }
        });

        var wpm = ((lengthOfText/5)-errors)/((endTime-startTime)/60000);

        window.alert("Number of errors: " + errors +"\nWPM: ~" + Math.round(wpm));

        resetPage();


    } else{
        document.querySelectorAll(".wordList").forEach(function(element){
            element.style.backgroundColor = "transparent";
        });
        var currentWord = document.getElementById("word"+((userStringArray.length-1).toString()))
        currentWord.style.backgroundColor = "#7caeff";
        currentWord.scrollIntoView(false);

    }
}

function resetPage(){

    var divElement = document.getElementById("mainTextArea");
    divElement.innerHTML = "";

    document.getElementById("inputText").value = "";
    document.getElementById("inputText").disabled = false;
    document.getElementById("inputText").focus();

    var randomNumber //will be used to get random letter
    var randomString = "";//default 85 length
    randomStringArray = [];
    userStringArray = [];
    started = false;

    for (var i = 1; i<lengthOfText; i++){
        if (i%5===0 && i!==lengthOfText){
            randomString += ' ';
        } else {
            randomNumber = Math.floor(Math.random() * (122-97) ) +97;
            randomString += String.fromCharCode(randomNumber);
        }
    }
    
    randomStringArray = randomString.split(" ");
    
    randomStringArray.forEach(function(element, index){
    
        var spanWord = document.createElement("span");
    
        spanWord.innerHTML = element;
    
        spanWord.id = "word" + index.toString(); //give each span an id(for color change)
        spanWord.className = "wordList";
    
        divElement.appendChild(spanWord);
        divElement.innerHTML += " ";
        
    });
}

function showInfo(){
    window.alert("The timer doesn't start until the first key is clicked.\nThe last word typed must be the same amount of characters as the last word shown for the timer to stop.\n\nMade by Ryan Stongraber");
}