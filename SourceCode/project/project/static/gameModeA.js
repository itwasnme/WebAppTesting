// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
"zebra",
"!@#$",
"dress",
"male",
"chickens",
"roasted",
"receipt",
"maniacal",
"disgusting",
"moan",
"gratis",
"shame",
"collect",
"material",
"pies",
"comparison",
"borrow",
"statuesque",
"crook",
"arrive",
"aboriginal",
"thaw",
"wide-eyed",
"vagabond",
"previous",
"haunt",
"belligerent",
"fry",
"omniscient",
"addition",
"wrench",
"tough",
"jumbled",
"hapless",
"permissible",
"adhesive",
"stew",
"bless",
"pointless",
"waste",
"voyage",
"grateful",
"club",
"ossified",
"partner",
"placid",
"feeling",
"bells",
"lethal",
"songs",
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let timer_group = document.querySelector(".timer");
let error_text = document.querySelector(".curr_errors");
let error_group = document.querySelector(".errors");
let accerts_text = document.querySelector(".curr_accerts");
let wpm_text = document.querySelector(".curr_wpm");
let wpm_group = document.querySelector(".wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");


let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accerts = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;




//onfocus="startGame()"....
function startGame() {
  resetValues();
  updateQuote();
  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accerts = 0;
  quoteNo = 0;
  input_area.disabled = false;
  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game...';
  accerts_text.textContent = 0;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  wpm_group.style.display = "none";
  timer_group.style.display = "block";
}

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];
  // separate each character and make an element 
  // out of each of them to individually style them

  for (let i = 0; i < current_quote.length; i++) {
    const charSpan = document.createElement('span')
    charSpan.innerText = current_quote[i];
    quote_text.appendChild(charSpan)   
  }
  // roll over to the first word
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game...";

  // display restart button
  restart_btn.style.display = "block";

  // hide timer
  timer_group.style.display = "none";

  // calculate wpm
  if(accerts>0 || total_errors>0){
        wpm = accerts + total_errors;
        wpm_text.textContent = wpm;
        wpm_group.style.display = "block";
  }
}

//oninput="processCurrentText()"...
function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  for (let i = 0; i < quoteSpanArray.length; i++) {
    let typedChar = curr_input_array[i]

    // characters not currently typed
    if (typedChar == null) {
      quoteSpanArray[i].classList.remove('correct_char');
      quoteSpanArray[i].classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === quoteSpanArray[i].innerText) {
      quoteSpanArray[i].classList.add('correct_char');
      quoteSpanArray[i].classList.remove('incorrect_char');

      // incorrect characters
    } else {
      quoteSpanArray[i].classList.add('incorrect_char');
      quoteSpanArray[i].classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  }

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
	if(errors>0){
    	total_errors += 1;
	}else{
	    accerts +=1;
	}
	error_text.textContent = total_errors;
	accerts_text.textContent = accerts;
    // clear the input area
    input_area.value = "";
  }
}

