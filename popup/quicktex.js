var display = document.getElementById("display");
var textInput = document.getElementById("entryfield");
var storage = window.localStorage;
var snippetsButton = document.getElementById("snippets-button");
var snippets = [];
var selectedRow = 0;  // Selected row on the auto-complete table. Corresponds with snippet array index.

var selectMode = false;

textInput.value = storage.getItem("lastSnippetAInternal");
if(storage.getItem("lastSnippetAInternal") != "") {
    render(textInput.value);
}

textInput.addEventListener("input", function() {
    // Check for input and render the text t    hat has changed.
    if(!selectMode) {
    render(textInput.value);
    }
});

textInput.onkeydown = function (event) {
    // This will only function for the tab/auto-complete key.
    if (event.key == "Tab") {
        event.preventDefault();
        while(display.lastChild) {
            // Remove any text that's already in the display box.
            display.removeChild(display.lastChild);
        }
      var message = document.createElement("p");
      message.textContent = "Auto-complete options (use arrow keys, ; to exit):";
        message.style.color = "#800000";
      var span = document.createElement("span");
        span.appendChild(message);
      span.id="displaySpan";
      var iterator = 0;
        for(var i in localStorage) {
            // Pass in the table argument, and the table() method will fill it.
          if(i.includes("snippet_")) {
            snippets[iterator] = i;
            iterator +=1;
          }
        }
      formACTable(span);
      selectMode = !selectMode;
      // append make table method into here
        span.style.overflow = "hidden";
        span.style.font = "10px Menlo, monospace";
        display.appendChild(span);
        span.setAttribute("class", "errorMessage");
    } else if (event.keyCode == '38') {
      console.log('arrow');
      selectedRow+=(selectedRow<snippets.length)?1:0;
      console.log("ac_"+selectedRow);
      document.getElementById("ac_"+selectedRow).append("↵");
    } else if (event.keyCode == '40') {
      selectedRow-=(selectedRow<snippets.length+1)?1: 0;
    } else if(selectMode && event.keyCode == ';') {
        selectRow = 0;
        selectMode = !selectMode;

    } else {
      console.log("[warning] no other sub-function key codes recognised");
    }
};

function handle(id) {
    // Handles the force render button.
    render(textInput.value);
}

function render(text) {
    try {
        // Renders the given text.
        if(text == "") {
            display.style.display = "none";
        } else {
            display.style.display = "block";
        }
        katex.render(text, document.getElementById("display"), {
            displayMode: true,
            macros: {
                "\\RR": "\\mathbb{R}"
            },
        });
        storage.setItem("lastSnippetAInternal", text);
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

snippetsButton.addEventListener('click', function(event) {
    browser.tabs.create({ url: browser.extension.getURL("popup/snippets/index.html") });
});

function forget(storedSettings) {
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

function formACTable(element) {
  // This function is in charge of making the auto-complete options table.
  var table = "<table>";   // This string will hold the HTML code for the table, which will then be appended onto the appropriate element.
  for(var i = 0; i < snippets.length; i++) {
    // Form all the rows with the various snippets that we need.
    table += "<tr><td id='ac_'"+i+">" + i + ": " + snippets[i] + "</td></tr>";
  }
  table += "</table>";
  element.innerHTML += table;
}
