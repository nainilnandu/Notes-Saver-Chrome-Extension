console.log("Extension is Running!!");


var noteDOM = document.createElement('input');
noteDOM.setAttribute('type', 'button');
noteDOM.setAttribute('class', 'selection_bubble');
noteDOM.setAttribute('id', "btn");
document.body.appendChild(noteDOM);

// var inputDOM = document.createElement('input');

// inputDOM.setAttribute('type', 'button');


// inputDOM.setAttribute('class', 'selection_bubble');
// inputDOM.setAttribute('id', "btn");
// document.body.appendChild(inputDOM);


// chrome.storage.local.set({
//     "isActive": true
// }, function() {
//     if (chrome.runtime.lastError) {
//         console.error(
//             "Error setting " + key + " to " + JSON.stringify(data) +
//             ": " + chrome.runtime.lastError.message
//         );
//     }
// });


document.addEventListener("mouseup", function(e){
    console.log('Word Selected');
    let selectedText = window.getSelection();
    console.log(selectedText.toString());

    if(selectedText.toString().length>0){
        // let message = {
        //     text:selectedText
        // };
        
        renderBubble(e.pageX, e.pageY, selectedText);
        //chrome.runtime.sendMessage(message);
    }
},false);

document.addEventListener('mousedown', function(e) {
    if (noteDOM.id != e.target.id && noteDOM.style.visibility == 'visible') {
        noteDOM.removeAttribute("value");
        // inputDOM.removeAttribute("value");
        noteDOM.style.visibility = 'hidden';
        // inputDOM.style.visibility = 'hidden';
    }
}, false);

function renderBubble(mouseX, mouseY, selectedText) {
    chrome.storage.local.get("isActive", function(data) {
        if (data.isActive == true) {
            console.log("In render!!");
            showit(mouseX, mouseY, selectedText);

        } else {
            console.log("Not Active");
        }
    });
}

function showit(mouseX, mouseY, selectedText) {

    if (noteDOM.hasAttribute('value') == false) {
        console.log("In show it!!");
        noteDOM.setAttribute('value', "Add to Note");
        // inputDOM.setAttribute('value', "Save file");


        noteDOM.style.top = mouseY + 'px';
        noteDOM.style.left = mouseX + 'px';
        noteDOM.style.visibility = 'visible';
        // inputDOM.style.top = mouseY + 'px';
        // inputDOM.style.left = (mouseX + 102) + 'px';
        // inputDOM.style.visibility = 'visible';
        noteDOM.onclick = function() {
            addToNote(selectedText.toString());
        };
        // inputDOM.onclick = function() {
        //     saveFile(selectedText.toString());
        // };
    }
}

// function saveFile(selectedText) {

//     console.log("Data to add and thn save :" + selectedText);
//     noteDOM.style.visibility = 'hidden';
//     inputDOM.style.visibility = 'hidden';
//     // console.log(noteDOM.style.visibility);
//     chrome.runtime.sendMessage({
//         task: 'saveFile',
//         selected: selectedText
//     }, function() {
//         noteDOM.removeAttribute("value");
//         inputDOM.removeAttribute("value");
//     });
//     selectedText = "";
// }

function addToNote(selectedText) {

    // console.log("Data to add :" + selectedText);


    noteDOM.style.visibility = 'hidden';
    // inputDOM.style.visibility = 'hidden';
    // console.log(noteDOM.style.visibility);



    chrome.runtime.sendMessage({
        task: 'addToNote',
        text: selectedText
    }, function() {
        noteDOM.removeAttribute("value");
        // inputDOM.removeAttribute("value");
    });
    selectedText = "";
}

