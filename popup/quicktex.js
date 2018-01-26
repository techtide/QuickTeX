var textInput = document.getElementById("entryfield");
var display = document.getElementById("display");
var storage = window.localStorage;

textInput.value = storage.getItem("text");

textInput.addEventListener("input", function() {
    // Check for input and render the text that has changed.
    render(textInput.value);
});
    
function handle(id) {
    // Handles the force render button.
    render(textInput.value);
}

function render(text) {
    try {
        // Renders the given text.
        katex.render(text, document.getElementById("display"), {
            displayMode: true,
            macros: {
                "\\RR": "\\mathbb{R}"
            },
        });
        storage.setItem("text", text);
        console.log(storage.getItem("text"));
    } catch(err) {
        // Display the error message instead of leaving a blank field.
        while(display.lastChild) {
            // Remove any text that's already in the display box.
            display.removeChild(display.lastChild);
        }
        var erm = err.message.replace("KaTeX", "QuickTeX");
        var message = document.createTextNode(erm);
        var span = document.createElement("span");
        span.appendChild(message);
        span.style.overflow = "hidden";
        span.style.color = "#800000";
        span.style.font = "10px Menlo, monospace";
        display.appendChild(span);
        span.setAttribute("class", "errorMessage");
    }
}

var copyTextareaBtn = document.querySelector('.copy');

copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.copy');
  textInput.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});

function forget(storedSettings) {

    /*
    Convert from a string to a time.
    The string is one of: "hour", "day", "week", "forever".
    The time is given in milliseconds since the epoch.
    */
    function getSince(selectedSince) {
      if (selectedSince === "forever") {
        return 0;
      }
  
      const times = {
        hour: () => { return 1000 * 60 * 60 },
        day: () => { return 1000 * 60 * 60 * 24 },
        week: () => { return 1000 * 60 * 60 * 24 * 7}
      }
  
      const sinceMilliseconds = times[selectedSince].call();
      return Date.now() - sinceMilliseconds;
    }
}  