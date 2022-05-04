// Returns the object of background.js file
let bgpage = chrome.extension.getBackgroundPage();

//Fetching the savedNotes array from background.js 
let notes = bgpage.savedNotes; 
console.log(notes);

// Displaying saved notes on popup 
let list  = document.getElementById("notes");
notes.forEach(function (notes) {
	var li = document.createElement('li');
	li.innerText = notes;
	list.appendChild(li);
});



downloadbtn = document.getElementById('download');
downloadbtn.onclick = function() {
    // console.log("Download Working");
    date = new Date();
    myfilename = "notes_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + ".txt";
    console.log(myfilename);


    // Converting notes array into plain text and downloading it
    var blob = new Blob([notes], {
        type: '"text/plain;charset=UTF-8"'
    });

    myurl = window.URL.createObjectURL(blob);

    chrome.downloads.download({
        url: myurl,
        filename: myfilename,
        saveAs: true
    }, function() {
        // notes = [];
        // bgpage.savedNotes = [];
    });
};



