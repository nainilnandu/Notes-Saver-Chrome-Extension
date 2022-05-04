console.log("Background Running!!");

chrome.runtime.onMessage.addListener(reciever);

window.word = [];

function reciever(request, sender, sendResponse){
    console.log(request);
    word.push(request.text + "\n" + "\n");
}