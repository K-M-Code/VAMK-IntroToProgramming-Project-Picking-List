function runMatrix() {
    var arr = ["@", "!", "^", "&", "*", "#", "+", "π", "ƒ", "œ", "å", "~", "µ", "∂", "s", "[]", "M", "||", "K", "M", "N"];
    for (var i = 4; i < 180; i++) {
        var node = document.createElement("SPAN");
        var sec = Math.floor(Math.random() * 10) + 4;
        var symb = Math.floor(Math.random() * 9) + 1;
        var id = "m" + i;
        node.id = id;
        node.innerHTML = symb;
        document.getElementById('symbols').appendChild(node);
        document.getElementById(id).style.color = "green";

        document.getElementById(id).style.animation = "matrix linear " + sec + "s " + "infinite";
    }
    for (var i = 1; i < 180; i++) {
        var node = document.createElement("SPAN");
        var sec = Math.floor(Math.random() * 10) + 5;
        var symb = Math.floor(Math.random() * 9) + 1;
        var id = "mm" + i;
        node.id = id;
        node.innerHTML = symb;
        document.getElementById('symbols2').appendChild(node);
        document.getElementById(id).style.color = "green";

        document.getElementById(id).style.animation = "matrix linear " + sec + "s " + "infinite";
    }
    for (var i = 1; i < 100; i++) {

        var node = document.createElement("SPAN");
        var sec = Math.floor(Math.random() * 10) + 6;
        var symb = arr[Math.floor(Math.random() * 20)];
        var id = "d" + i;
        node.id = id;
        node.innerHTML = symb;
        document.getElementById('symbols3').appendChild(node);
        document.getElementById(id).style.color = "green";

        document.getElementById(id).style.animation = "matrix2 linear " + sec + "s " + "infinite";
    }
    for (var i = 1; i < 0; i++) {

        var node = document.createElement("SPAN");
        var sec = Math.floor(Math.random() * 4) + 2;
        var symb = arr[Math.floor(Math.random() * 20)];
        var id = "dd" + i;
        node.id = id;
        node.innerHTML = symb;
        document.getElementById('symbols4').appendChild(node);
        document.getElementById(id).style.color = "green";

        document.getElementById(id).style.animation = "matrix2 linear " + sec + "s " + "infinite";
    }
}