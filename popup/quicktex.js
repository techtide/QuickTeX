var textInput = document.getElementById("entryfield");
var display = document.getElementById("display");

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
    } catch(err) {
        // Display the error message instead of leaving a blank field.
        while(display.lastChild) {
            // Remove any text that's already in the display box.
            display.removeChild(display.lastChild);
        }
        var message = document.createTextNode(err.message);
        var span = document.createElement("span");
        span.appendChild(message);
        display.appendChild(span);
        span.setAttribute("class", "errorMessage");
    }
}

// https://github.com/mdn/webextensions-examples/blob/master/quicknote/popup/quicknote.js
