// Returns the object of background.js file
let bgpage = chrome.extension.getBackgroundPage();

//Fetching the selected text array from background.js 
let text = bgpage.word; 
console.log(text);

// Each 
let list  = document.getElementById("notes");
text.forEach(function (text) {
	var li = document.createElement('li');
	li.innerText = text;
	list.appendChild(li);
});



downloadbtn = document.getElementById('download');
downloadbtn.onclick = function() {
    console.log("Download Working");
    date = new Date();
    myfilename = "notes_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + ".txt";
    console.log(myfilename);
    var blob = new Blob([text], {
        type: '"text/plain;charset=UTF-8"'
    });

    myurl = window.URL.createObjectURL(blob);


    chrome.downloads.download({
        url: myurl,
        filename: myfilename,
        saveAs: true
    }, function() {

    });
};



