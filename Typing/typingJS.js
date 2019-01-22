
var lengthOfText = 85 //# of characters(85 default)
var randomStringArray

resetPage();

var userStringArray = [];
var started = false;
var startTime;

//key press
function checkWord(event){

    if(started == false){
        started = true;
        startTime = performance.now();
    }

    if(userStringArray.length  <=  randomStringArray.length+1){

        userStringArray = (document.getElementById("inputText").value).split(" ");
        console.log(userStringArray);
    }

    if(userStringArray.length  >=  randomStringArray.length+1){//end of typing
        var endTime = performance.now();
        userStringArray.splice(userStringArray.length-1,1);
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