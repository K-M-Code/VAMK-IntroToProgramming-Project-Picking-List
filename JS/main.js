//***Function to get a JSON file with orders */
function fetchOrder(arg, par) {
    var urlJson = "/project.json";

    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            if (arg == 1) {
                tableOrdersFilters(data);
            } else if (arg == 0 && par == 1) {
                var id = localStorage.getItem("orderid");
                getOrderInfo(data, id);
                printDetails(data, id);
                showCheckBox(data, id);
                // checkStatus();

            } else if (arg == "status") {
                getStatus(data);
                // sessionStorage.setItem("STATUS", 15);
            }
        });

}
//**This function is not needed  */
// function tableOrdersNoFilters(data) {
//     var table = getTableTitles();
//     var row = 0;

//     for (var i = 0; i < data.length; i++) {
//         table += fillTable(data[i], row);
//         row++;
//     }
//     document.getElementById("table_main").innerHTML = table;
// }

function tableOrdersFilters(data) {
    var row = 0;
    var table = getTableTitles();
    var orderid = document.getElementById("orderid").value;
    var customerid = document.getElementById("customerid").value;
    var customer = document.getElementById("customer").value.toLowerCase();
    var deliveryDate = document.getElementById("deliverydate").value;

    var orderidRegex = RegExp("^" + orderid);
    var customeridRegex = RegExp("^" + customerid);
    var customerRegex = RegExp("^" + customer);
    var deliveryDateRegex = RegExp("^" + deliveryDate);
    for (var i = 0; i < data.length; i++) {
        if (orderidRegex.test(data[i].orderid) && customeridRegex.test(data[i].customerid) && customerRegex.test(data[i].customer.toLowerCase()) && deliveryDateRegex.test(data[i].deliverydate)) { //fix here deliverydate ids
            table += fillTable(data[i], row);
            row++;
        }
    }
    document.getElementById("table_main").innerHTML = table;
}

function printDetails(data, id) {

    var table = "<thead class=\"tealColor\"><tr class=\"text-white\"><th>Packed</th><th>Code</th><th>Product</th><th>Description</th><th>Supplier Code</th><th>Quantity</th><th>Unit Price</th><th>Shelf Position</th><tr></thead>";

    for (var key in data) {
        if (data[key].orderid == id) {
            for (var i = 0; i < data[key].products.length; i++) {
                var order = data[key].products[i];
                table += "<td> <input type=\"checkbox\" id=\"packed" + i + "_" + id + "\" onclick =\"checkStatus(this.id)\"></td>";
                for (var val in order) {
                    table += "<td>" + order[val] + "</td>";
                }
                table += "</tr>";
            }
        }
    }
    document.getElementById("details_table").innerHTML = table;
}

function fillTable(data, row) {


    var rowId = "row" + row;
    var tableString = "<tr class=\"order_list_row\" id=\"" + rowId + "\" onclick=\"newLocation(this.id)\">";
    tableString += "<td>" + data.orderid + "</td>";
    tableString += "<td>" + data.customerid + "</td>";
    tableString += "<td>" + data.customer + "</td>";
    tableString += "<td>" + data.delivaddr + "</td>";
    tableString += "<td>" + data.deliverydate + "</td>";
    tableString += "<td>" + sessionStorage.getItem(data.orderid) + "</td>";
    tableString += "</tr>";
    return tableString;
}

/**This function creates headers for main order table */
function getTableTitles() {
    return "<thead class=\"tealColor\"><tr class=\"text-white\"><th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Delivery Address</th><th>Delivery Date</th><th>Order Status</th></tr></thead>";

}

function getOrderInfo(data, id) {
    var checkboxes = "";
    document.getElementById("ID_Status").innerHTML = id;
    // document.getElementById("show_status").innerHTML = sessionStorage.getItem(id);
    console.log(sessionStorage.getItem(id));
    for (var i = 0; i < data.length; i++) {
        if (data[i].orderid == id) {
            document.getElementById('orderid').innerHTML = id;
            document.getElementById('customerid').innerHTML = data[i].customerid;
            document.getElementById('customer').innerHTML = data[i].customer;
            document.getElementById('invaddr').innerHTML = data[i].invaddr;
            document.getElementById('delivaddr').innerHTML = data[i].delivaddr;
            document.getElementById('deliverydate').innerHTML = data[i].deliverydate;
            document.getElementById('respsalesperson').innerHTML = data[i].respsalesperson;
            document.getElementById('totalprice').innerHTML = data[i].totalprice;
            document.getElementById('comment').innerHTML = data[i].comment;
            document.getElementById('show_status').innerHTML = sessionStorage.getItem(id);
            for (var j = 0; j < data[i].products.length; j++) {
                if (j < data[i].products.length - 1) {
                    checkboxes += "packed" + j + "_" + id + ",";
                } else {
                    checkboxes += "packed" + j + "_" + id;
                }
            }
            document.getElementById("list_of_chckboxes").innerHTML = checkboxes;
        }

    }
}

function getStatus(data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        sessionStorage.setItem(data[i].orderid, "NOT READY");
        console.log(data[i].products.length);
        for (var j = 0; j < data[i].products.length; j++) {
            console.log("here");
            sessionStorage.setItem("packed" + j + "_" + data[i].orderid, 0);
        }
    }

}
//** Function get the orderid from the clicked row and save it on the local storage */
function newLocation(id) {
    var orderId = document.getElementById(id).childNodes[0].innerHTML;
    localStorage.setItem("orderid", orderId);
    document.location.href = "orderdetails.html";

}


//** Functions for ORDERDETAILS (orderdetails.html) */
function getOrder() {
    // console.log(localStorage.getItem("orderid"));
    fetchOrder(0, 1);

}

//**LOGIN */
function login() {
    fetchOrder("status");
    var users = [{
        name: "John Doe",
        password: "matrix",
        role: "Wherehouse junior manager"
    }, {
        name: "Agent Smith",
        password: "kill neo",
        role: "Havy duty"
    }, {
        name: "Agent Brown",
        password: "kill neo very hard",
        role: "Coffe maker"
    }, {
        name: "Agent Jones",
        password: "want another job",
        role: "Light duty"
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
                console.log(users[i].name == user_name);
                if ((users[i].name == user_name) && (users[i].password == pass)) {
                    // form.onsubmit = () => { return true }
                    sessionStorage.setItem("username", user_name);
                    sessionStorage.setItem("role", users[i].role);
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


    function newLocation() {
        document.location.href = "landing.html";
    }


}
//**Function for setting User name and user role on landing page */
function getUserData() {
    var username = sessionStorage.getItem("username");
    var role = sessionStorage.getItem("role");
    document.getElementById("user_name_landing").innerHTML = username;
    document.getElementById("user_role_landing").innerHTML = role;
}

function checkStatus(id) {
    var checkBox = document.getElementById(id);
    var orderid = document.getElementById("ID_Status").innerHTML;

    if (checkBox.checked) {
        sessionStorage.setItem(id, 1);
        showCheckBox();
    } else {
        sessionStorage.setItem(id, 0);
        showCheckBox();
    }

}

function showCheckBox() {
    var id = document.getElementById("ID_Status").innerHTML;
    var list_of_chckboxes = document.getElementById('list_of_chckboxes').innerHTML;
    var arr = list_of_chckboxes.split(",");
    var counter = 0;
    for (var i = 0; i < arr.length; i++) {
        if (sessionStorage.getItem(arr[i]) == 1) {
            document.getElementById(arr[i]).checked = true;
            counter++;
        } else {
            document.getElementById(arr[i]).checked = false;
        }
    }
    if (counter == arr.length) {
        // document.getElementById("show_status").innerHTML = "READY";
        // sessionStorage.setItem(id, "READY");

    } else {
        document.getElementById("show_status").innerHTML = "NOT READY";
        sessionStorage.setItem(id, "NOT READY");
    }
    console.log("Status for " + arr[i] + ": " + sessionStorage.getItem(arr[i]));

}

function buttonReady() {
    var id = document.getElementById("ID_Status").innerHTML;
    var list_of_chckboxes = document.getElementById('list_of_chckboxes').innerHTML;
    var arr = list_of_chckboxes.split(",");
    var counter = 0;
    for (var i = 0; i < arr.length; i++) {
        if (sessionStorage.getItem(arr[i]) == 1) {
            document.getElementById(arr[i]).checked = true;
            counter++;
        }
    }
    if (counter == arr.length) {
        document.getElementById("show_status").innerHTML = "READY";
        sessionStorage.setItem(id, "READY");

    } else {
        alert("NOT READY");
        // document.getElementById("show_status").innerHTML = "NOT READY";
        // sessionStorage.setItem(id, "NOT READY");
    }
    console.log("Status for " + arr[i] + ": " + sessionStorage.getItem(arr[i]));

}