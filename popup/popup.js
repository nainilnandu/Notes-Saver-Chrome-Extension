let bgpage = chrome.extension.getBackgroundPage();

let text = bgpage.word;
console.log(text);
let list  = document.getElementById("notes");
let ul = document.createElement("ul");

text.forEach(function (text) {
	var li = document.createElement('li');
	li.innerText = text;
	list.appendChild(li);
});



downloadbtn = document.getElementById('download');
downloadbtn.onclick = function() {
    console.log("Download Working");
    date = new Date();
    myfilename = "notes_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getHours() + "-" + date.getMinutes() + ".txt";
    
    console.log(myfilename);
    var blob = new Blob([text], {
        type: '"text/plain;charset=UTF-8"'
    });

    myurl = window.URL.createObjectURL(blob);


    chrome.downloads.download({
        url: myurl,
        saveAs: true
    }, function(downloadId) {

    });
};
// li.innerText = word;
// list.appendChild(li);
// //document.write(word);
// console.log(word);



