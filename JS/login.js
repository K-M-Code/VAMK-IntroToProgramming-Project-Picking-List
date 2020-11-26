window.onload = () => {
    var users = [{
        name: "A",
        password: "1"
    }, {
        name: "Agent Smith",
        password: "kill neo"
    }, {
        name: "Agent Brown",
        password: "kill neo very hard"
    }, {
        name: "Agent Jones",
        password: "want another job"
    }];

    var input = document.getElementsByTagName('input');
    var login = document.getElementById('login');
    var form = document.querySelector('form');
    // form.onsubmit = () => { return false }

    login.onclick = () => {
        if ((input[0].value != "") && (input[1].value != "")) {
            var user_name = input[0].value;
            var pass = input[1].value;
            for (var i = 0; i < users.length; i++) {
                // console.log(user_name);
                // console.log(pass);
                // console.log(users[i].name.type);
                console.log(users[i].name == user_name);
                if ((users[i].name == user_name) && (users[i].password == pass)) {
                    console.log('here');
                    // form.onsubmit = () => { return true }
                    newLocation();
                    break;
                } else {
                    document.getElementById('alarm').innerHTML = "Wrong password or username!"
                    setTimeout(() => {
                        document.getElementById('alarm').innerHTML = "";
                    }, 2000);

                }
            }

        } else {
            if (input[0].value == "") {
                input[0].nextElementSibling.textContent = "Username is empty";
                setTimeout(() => {
                    input[0].nextElementSibling.textContent = "";
                }, 2000);
            }
            if (input[1].value == "") {
                input[1].nextElementSibling.textContent = "Password is empty";
                setTimeout(() => {
                    input[1].nextElementSibling.textContent = "";
                }, 2000);
            }
        }

    }


}

function newLocation() {
    document.location.href = "landing.html";
}

// const form = document.querySelector('form')
// form.addEventListener('submit', event => {
//     // submit event detected

//     console.log(event);
//     var users = [{
//         name: "Agent Smith",
//         password: "kill neo"
//     }, {
//         name: "Agent Brown",
//         password: "kill neo very hard"
//     }, {
//         name: "Agent Jones",
//         password: "want another job"
//     }];

//     for (var i = 0; i < users.length; i++) {

//     }

//     event.preventDefault()
// });