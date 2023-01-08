"use strict"

// let xmlhttp = new XMLHttpRequest();
// let url = "https://my.api.mockaroo.com/kino.json?key=40cbedd0";

// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var myArr = JSON.parse(this.responseText);
//         myFunction(myArr);
//     }
// };
var xmlhttp = new XMLHttpRequest();
var url = "https://my.api.mockaroo.com/kino.json?key=40cbedd0";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
console.log(myArr)
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i] + '">' +
        arr[i].display + '</a><br>';
    }
    document.getElementById("lol").innerHTML = out;
}