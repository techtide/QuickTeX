var textInput = document.getElementById("entryfield");
var display = document.getElementById("display");
// var issueFunctions = ["\\sum^", "\\prod^"];


textInput.addEventListener("input", function() {
    render(textInput.value);
});
    
function handle(id) {
    // Handles the force render button.
    var text = textInput.value;
    render(text);
}

function render(text) {
    // Renders given text.

    /*var ready = function(t) {
        if(issueFunctions.includes(t)) {
            return filter(t);
        } else {
            return t;
        }
    }*/
    katex.render(text, document.getElementById("display"), {
        displayMode: true,
        macros: {
            "\\RR": "\\mathbb{R}"
        },
    });
    var isEmpty = document.getElementById('cartContent').innerHTML === "";
    if(!isEmpty) {
        alert(text);
        
    }
}

/*function filter(text) {
    try {    
        var modifiedText = "\\" + text;
        var regex = /(\\sum|\\prod)(\^.*)/g;
        var matches1 = getMatches(modifiedText, regex, 1);
        var matches2 = getMatches(modifiedText, regex, 2);
        
        if(matches1 == null && matches2 == null) {
           // alert("woops matches 1/matches 2 is null");
        }
        // only statement for \sum or \prod not just \choose
        if((matches1 += matches2.charAt()) == ("\sum^" || "\prod^")) {
            // If it's \sum^ or \prod^, then filter it and add the horizontal space.
            // There is a total of 2 matches that will exist in one piece. Matches start at 1.
            
            // add three ~ in front of 2    
            
            return String(matches1) + String(parseInt(matches2)).charAt(0) + "{" + calculateSpace(matches1) + String(parseInt(matches2)).charAt(1) + "}";
        } else {
            return text;
        }
    } catch (error) {
        console.log(error);
    }
}*/

function calculateSpace(x) {
    if(x == "\\sum") {
        return "~~~";
    }
    return "~~~";
}

function getMatches(string, regex, index) {
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
}