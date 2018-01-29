var textInput = document.getElementById("entryfield");
var display = document.getElementById("display");
var storage = window.localStorage;
var snippetsButton = document.getElementById("snippets-button");

textInput.value = storage.getItem("lastSnippetAInternal");
if(storage.getItem("lastSnippetAInternal") != "") {
    render(textInput.value);
}

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
        console.log(storage.getItem("lastSnippetAInternal"));
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
    var snippetName;
    var snippetCode;
    if(window.confirm("This is the Snippets Wizzard.\nSnippets can automatically present complicated bits of TeX through our auto-complete system.\nYou can create and delete new snippets using this wizard.")) {
        var command = window.prompt("Type 'create,' to create a new snippet, 'remove,' to remove a snippet, or press the small x to close this popup.");
        if(command == "create") {
            snippetName = prompt("Snippet name? This is what you will type in the input box to toggle the pasting of your snippet.\n No spaces, slashes, or escape chars are allowed.");
            snippetCode = JSON.stringify(window.prompt("Enter the code for the given snippet (in proper, compatible LaTeX)."));
            storage.setItem(snippetName, snippetCode);
            alert("All outstanding snippets: \n" + printAllSnippets());
        } else if(command == "remove") {
            prompt("" + printAllSnippets());
        } else {
            /*var window = window.self;
            window.opener = window.self;
            window.close(); */
        }
    }
});

function printAllSnippets() {
    var snippetString;
    for(var i = 1; i < localStorage.length; i++){
        snippetString += "\n" + localStorage.key(i) + "  :  " + localStorage.getItem(localStorage.key(i));
    }
    return snippetString;
}

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