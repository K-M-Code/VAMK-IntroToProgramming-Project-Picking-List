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
                printDetails(data, id);
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
    var table = getTableTitles();
    var orderid = document.getElementById("orderid").value;
    var customerid = document.getElementById("customerid").value;
    var customer = document.getElementById("customer").value.toLowerCase();

    var orderidRegex = RegExp("^" + orderid);
    var customeridRegex = RegExp("^" + customerid);
    var customerRegex = RegExp("^" + customer);
    for (var i = 0; i < data.length; i++) {
        if (orderidRegex.test(data[i].orderid) && customeridRegex.test(data[i].customerid) && customerRegex.test(data[i].customer.toLowerCase())) {
            table += fillTable(data[i]);
        }
    }
    document.getElementById("table_main").innerHTML = table;
}

function printDetails(data, id) {
    var table = "<td><table class=\"inner\"><th>code</th><th>product</th><th>description</th><th>suppliercode</th><th>qty</th><th>unit_price</th><th>shelf_pos</th><tr>";

    for (var key in data) {
        if (data[key].orderid == id) {
            for (var i = 0; i < data[key].products.length; i++) {
                var order = data[key].products[i];
                // console.log(data[key].products[i]);
                for (var val in order) {
                    table += "<td>" + order[val] + "</td>";
                }
                table += "</tr>";
            }
            // console.log(data[key]);
        }
    }
    document.getElementById("table_main").innerHTML = table;
}

function fillTable(data, row) {

    var rowId = "row" + row;
    var tableString = "<tr class=\"order_list_row\" id=\"" + rowId + "\" onclick=\"newLocation(this.id)\">";
    if (data != 0) {
        for (var key in data) {
            if (Array.isArray(data[key])) {
                tableString += "<td><table class=\"inner\"><th>code</th><th>product</th><th>description</th><th>suppliercode</th><th>qty</th><th>unit_price</th><th>shelf_pos</th><tr>";
                for (var obj in data[key]) {
                    for (var inner in data[key][obj]) {
                        tableString += "<td>" + data[key][obj][inner] + "</td>";
                    }
                    tableString += "</tr>";
                    // var list = JSON.parse(data[key][obj]);

                    // tableString += "<li>" + data[key][obj].code + ": " + "</li>";
                }
                tableString += "</table></td>";
            } else {
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
    return "<th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Invoice address</th><th>Delivery address</th><th>Delivery date</th><th>Responsible sale person</th><th>Comment</th><th>Total price</th><th>Products</th>";

}

//** Function get the orderid from the clicked row and save it on the local storage */
function newLocation(id) {
    var orderId = document.getElementById(id).childNodes[0].innerHTML;
    localStorage.setItem("orderid", orderId);
    document.location.href = "orderdetails.html";
    // console.log(orderId);

}


//** Functions for ORDERDETAILS */
function getOrder() {
    // console.log(localStorage.getItem("orderid"));
    fetchOrder(0, 1);

}