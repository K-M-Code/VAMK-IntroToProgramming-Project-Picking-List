//***Function to get a JSON file with orders */
function fetchOrder(arg, par) {
    var urlJson = "/project.json";

    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            if (arg == 0 && par == 0) {
                tableOrdersNoFilters(data);
            } else if (arg == 1 || arg == 2 || arg == 3) {
                tableOrdersFilters(data);
            } else if (arg == 0 && par == 1) {
                var id = localStorage.getItem("orderid");
                getOrderInfo(data, id);
                printDetails(data, id);
            } else if (arg == "status" && par == 0) {
                sessionStorage.setItem("STATUS", 0);
            }
        });

}

function tableOrdersNoFilters(data) {
    var table = getTableTitles();
    var row = 0;

    for (var i = 0; i < data.length; i++) {
        table += fillTable(data[i], row);
        row++;
    }
    document.getElementById("table_main").innerHTML = table;
}

function tableOrdersFilters(data) {
    var row = 0;
    var table = getTableTitles();
    var orderid = document.getElementById("orderid").value;
    var customerid = document.getElementById("customerid").value;
    var customer = document.getElementById("customer").value.toLowerCase();

    var orderidRegex = RegExp("^" + orderid);
    var customeridRegex = RegExp("^" + customerid);
    var customerRegex = RegExp("^" + customer);
    for (var i = 0; i < data.length; i++) {
        if (orderidRegex.test(data[i].orderid) && customeridRegex.test(data[i].customerid) && customerRegex.test(data[i].customer.toLowerCase())) {
            table += fillTable(data[i], row);
            row++;
        }
    }
    document.getElementById("table_main").innerHTML = table;
}

function printDetails(data, id) {
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
        if (data[i].orderid == id) {
            document.getElementById('orderid').innerHTML = "Order ID: " + id;
            document.getElementById('customerid').innerHTML = "Customer ID: " + data[i].customerid;
            document.getElementById('customer').innerHTML = "Customer name:  " + data[i].customer;
            document.getElementById('invaddr').innerHTML = "Invoice address: " + data[i].invaddr;
            document.getElementById('delivaddr').innerHTML = "Delivary address: " + data[i].delivaddr;
            document.getElementById('deliverydate').innerHTML = "Delivery date: " + data[i].deliverydate;
            document.getElementById('respsalesperson').innerHTML = "Responsible sale person: " + data[i].respsalesperson;
            document.getElementById('totalprice').innerHTML = "Total price: " + data[i].totalprice;
            document.getElementById('comment').innerHTML = "Comments: " + data[i].comment;
        }

    }
    var table = "<tr><th>Packed</th><th>code</th><th>product</th><th>description</th><th>suppliercode</th><th>qty</th><th>unit_price</th><th>shelf_pos</th><tr>";

    for (var key in data) {
        if (data[key].orderid == id) {
            for (var i = 0; i < data[key].products.length; i++) {
                var order = data[key].products[i];
                // console.log(data[key].products[i]);
                table += "<td> <input type=\"checkbox\" id=\"" + i + "\"></td>";
                for (var val in order) {
                    table += "<td>" + order[val] + "</td>";
                }
                table += "</tr>";
            }
            // console.log(data[key]);
        }
    }
    document.getElementById("details_table").innerHTML = table;
}

function fillTable(data, row) {

    var rowId = "row" + row;
    var tableString = "<tr class=\"order_list_row\" id=\"" + rowId + "\" onclick=\"newLocation(this.id)\">";
    if (data != 0) {
        for (var key in data) {
            if (key == "orderid" || key == "customerid" || key == "customer" || key == "delivaddr" || key == "deliverydate") {
                tableString += "<td>" + data[key] + "</td>";
            }
        }

        tableString += "</tr>";
        return tableString;
    } else {
        return "";
    }
}

function getTableTitles() {
    return "<th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Delivery Address</th><th>Delivery Date</th><th>Order Status</th>";

}

function getOrderInfo(data, id) {

}

//** Function get the orderid from the clicked row and save it on the local storage */
function newLocation(id) {
    var orderId = document.getElementById(id).childNodes[0].innerHTML;
    localStorage.setItem("orderid", orderId);
    document.location.href = "orderdetails.html";

}


//** Functions for ORDERDETAILS */
function getOrder() {
    // console.log(localStorage.getItem("orderid"));
    fetchOrder(0, 1);

}






//**LOGIN */
function login() {
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




    function newLocation() {
        fetchOrder("status", 0);
        document.location.href = "landing.html";
    }

}