function fetchOrder(arg) {

    // var urlJson = "http://www.cc.puv.fi/~e2000594/VAMK-Project-Picking-List/project.json";
    var urlJson = "project.json";


    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            var table = getTableTitles();
            var orderid = document.getElementById("orderid").value;
            var customerid = document.getElementById("customerid").value;
            var customer = document.getElementById("customer").value.toLowerCase();

            var orderidRegex = RegExp("^" + orderid);
            var customeridRegex = RegExp("^" + customerid);
            var customerRegex = RegExp("^" + customer);

            console.log(arg);

            // console.log(orderidRegex);
            // console.log(customerRegex);

            if (arg == 0 && document.getElementById("orderid").value == "") {
                for (var i = 0; i < data.length; i++) {
                    table += fillTable(data[i]);
                }
                document.getElementById("table_main").innerHTML = table;
            } else if (arg == 1 || arg == 2 || arg == 3) {
                console.log("here");
                for (var i = 0; i < data.length; i++) {
                    // console.log(orderidRegex.test(data[i].orderid));
                    // console.log(customeridRegex.test(data[i].customerid));
                    // console.log(customerRegex.test(data[i].customer.toLowerCase()));
                    if (orderidRegex.test(data[i].orderid) && customeridRegex.test(data[i].customerid) && customerRegex.test(data[i].customer.toLowerCase())) {

                        table += fillTable(data[i]);
                        // console.log(customerRegex.test(data[i].customer.toLowerCase()));
                    }
                }
                document.getElementById("table_main").innerHTML = table;
            }
        });


    // console.log(tableTitles);

    // document.getElementById("table_main").innerHTML = tableTitles;
}

function fillTable(data) {
    var tableString = "<tr>";
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
    return "<th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Invoice address</th><th>Delivery address</th><th>Delivery date</th><th>Responsible sale person</th><th>Comment</th><th>Total price</th><th>Products</th></.>";

}
fetchOrder(0);