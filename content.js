console.log("Extension is Running!!");

// Creating a DOM 
// This is created to show a "Add to Note" button after we select some text  
var noteDOM = document.createElement('input');
noteDOM.setAttribute('type', 'button');
noteDOM.setAttribute('class', 'selection_bubble');
noteDOM.setAttribute('id', "btn");
document.body.appendChild(noteDOM);


// Selecting the text on website
document.addEventListener("mouseup", function(e){

    console.log('Word Selected');
    let selectedText = window.getSelection();
    console.log(selectedText.toString());

    if(selectedText.toString().length>0){
        // Passing x and y coordinates of mouse cursor after selection of text to show a "Add to Note" Button at that position
        showAddtoNotebutton(e.pageX, e.pageY, selectedText);
    }

},false);


// Close the Add Note button when we click on the screen 
document.addEventListener('mousedown', function(e) {

    if (noteDOM.id != e.target.id && noteDOM.style.visibility == 'visible') {
        noteDOM.removeAttribute("value");
        noteDOM.style.visibility = 'hidden';
    }

}, false);


// Shows "Add to Note" Button near selected text
function showAddtoNotebutton(mouseX, mouseY, selectedText) {

    if (noteDOM.hasAttribute('value') == false) {
        console.log("In show it!!");
        noteDOM.setAttribute('value', "Add to Note");

        noteDOM.style.top = mouseY + 'px';
        noteDOM.style.left = mouseX + 'px';
        noteDOM.style.visibility = 'visible';
        
        //On Clicking the button selected text will get saved
        noteDOM.onclick = function() {
            addToNote(selectedText.toString());
        };
    }
}


//Saving notes
function addToNote(selectedText) {

    // console.log("Data to add :" + selectedText);
    noteDOM.style.visibility = 'hidden';

    //Sends message to event Listener in background.js which saves selectesText in an array
    chrome.runtime.sendMessage({
        task: 'addToNote',
        text: selectedText
    }, function() {
        noteDOM.removeAttribute("value");
    });
    selectedText = "";
}

