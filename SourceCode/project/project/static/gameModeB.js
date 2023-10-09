// selecting required elements
let timer_text = document.querySelector(".curr_time");
let timer_group = document.querySelector(".timer");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");


let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = "abcdefghijklmnopqrstuvwxyz";

  // separate each character and make an element 
  // out of each of them to individually style them
  for (let i = 0; i < current_quote.length; i++) {
    const charSpan = document.createElement('span')
    charSpan.innerText = current_quote[i];
    quote_text.appendChild(charSpan)   
  }
}

function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

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

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  if (curr_input.length == current_quote.length && errors==0) {

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";

    finishGame();
  }
}

function updateTimer() {
    // increase the time elapsed
    timeElapsed++;
    // update the timer text
    timer_text.textContent = timeElapsed + "s";
    if(timeElapsed>=30){
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

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
  
  //Hide Errors and Accuracy
  error_group.style.display = "none";
  accuracy_group.style.display = "none";
}


function startGame() {
  resetValues();
  updateQuote();
  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  input_area.disabled = false;
  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game...';
  accuracy_text.textContent = 100;
  timer_text.textContent = 0 + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
    error_group.style.display = "block";
  accuracy_group.style.display = "block";
}
