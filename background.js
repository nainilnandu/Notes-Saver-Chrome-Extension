console.log("Background Running!!");

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({
        "isActive": true
    }, function() {
        if (chrome.runtime.lastError) {
            console.error(
                "Error setting " + key + " to " + JSON.stringify(data) +
                ": " + chrome.runtime.lastError.message
            );
        }
    });
});

chrome.runtime.onMessage.addListener(reciever);

window.word = [];

function reciever(request, sender, sendResponse){
    console.log(request);
    word.push(request.text + "\n" + "\n");
}