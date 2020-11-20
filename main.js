function fetchOrder() {

    // var urlJson = "http://www.cc.puv.fi/~e2000594/VAMK-Project-Picking-List/project.json";
    var urlJson = "project.json";


    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            var table = getTableTitles();
            for (var i = 0; i < data.length; i++) {
                table += fillTable(data[i]);
            }
            document.getElementById("table_main").innerHTML = table;
        });


    // console.log(tableTitles);

    // document.getElementById("table_main").innerHTML = tableTitles;
}

function fillTable(data) {
    var tableString = "<tr>";
    if (data != 0) {
        for (var key in data) {
            tableString += "<td>" + data[key] + "</td>"
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
fetchOrder();