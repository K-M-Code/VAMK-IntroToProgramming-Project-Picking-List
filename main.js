function fetchOrder() {

    // var urlJson = "http://www.cc.puv.fi/~e2000594/VAMK-Project-Picking-List/project.json";
    var urlJson = "project.json";


    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            printTable();
        });


    // console.log(tableTitles);

    // document.getElementById("table_main").innerHTML = tableTitles;
}

function printTable() {
    var tableTitles = "<tr><th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Order ID</th><th>Invoice address</th><th>Delivery address</th><th>Delivery date</th><th>Responsible sale person</th><th>Comment</th><th>Total price</th><th>Products</th></tr>";
    document.getElementById("table_main").innerHTML = tableTitles;
}
fetchOrder();