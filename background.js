console.log("Background Running!!");

// Event Listener of the message which was sent from content.js
chrome.runtime.onMessage.addListener(reciever);

window.savedNotes = [];

// Saves all the selected text in savedNotes array 
function reciever(request, sender, sendResponse){
    console.log(request);
    savedNotes.push(request.text + "\n" + "\n");
}