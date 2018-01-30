var storage = window.localStorage;
var snippetName;
var snippetCode;
var confirmation = confirm("This is the Snippets Wizzard.\nSnippets can automatically present complicated bits of TeX through our auto-complete system.\nYou can create and delete new snippets using this wizard.");
if(confirmation == true) {
    var command = window.prompt("Type 'create,' to create a new snippet, 'remove,' to remove a snippet, or press the small x to close this popup.");
    if(command == "create") {
        snippetName = prompt("Snippet name? This is what you will type in the input box to toggle the pasting of your snippet.\n No spaces, slashes, or escape chars are allowed.");
        snippetCode = JSON.stringify(prompt("Enter the code for the given snippet (in proper, compatible LaTeX)."));
        storage.setItem(snippetName.toLowerCase(), snippetCode);
        alert("All outstanding snippets: \n" + printAllSnippets());
        document.write("The Snippets Wizard process is over.\n Refresh the page to restart the wizard, or close out of the current tab.");
    } else if(command == "remove") {
        var entry = prompt("" + printAllSnippets());
        storage.removeItem(entry.toLowerCase());
        document.write("The Snippets Wizard process is over.\n Refresh the page to restart the wizard, or close out of the current tab.");
    } else {
        /*var window = window.self;
        window.opener = window.self;
        window.close(); */
    }
}   

function printAllSnippets() {
    var snippetString;
    for(var i = 1; i < localStorage.length; i++){
        snippetString += "\n" + localStorage.key(i) + "  :  " + localStorage.getItem(localStorage.key(i));
    }
    return snippetString;
}