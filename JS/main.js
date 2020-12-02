/**
 * Main function to retrive data from JSON file
 * @param {string} arg 
 * arg = main: prints main table and filters are available
 * arg = details: prints order detail table to orderdetails.html
 * arg = status: creates database at sessionStorage for product ID using formula (packed+i+_+ordrid) and status for each order ID using ORDER ID: NOT READY
 */
function fetchOrder(arg) {
    var urlJson = "/project.json";
    fetch(urlJson)
        .then(res => res.json())
        .then(data => {
            if (arg == 'main') {
                console.log(typeof (data));
                printMainTableOrdersFilters(data);
            } else if (arg == 'details') {
                var id = localStorage.getItem("orderid");
                getOrderInfo(data, id);
                printOrderDetailsTable(data, id);
                showCheckBox(data, id);
            } else if (arg == "status") {
                getStatus(data);
            }
        });

}

/**
 * 
 * @param {object} data 
 * Function to create a main table of orders using data from JSON file
 * data = array af objects
 * In this function filter logic is based on RegEx.
 */
function printMainTableOrdersFilters(data) {
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
        if (orderidRegex.test(data[i].orderid) && customeridRegex.test(data[i].customerid) && customerRegex.test(data[i].customer.toLowerCase()) && deliveryDateRegex.test(data[i].deliverydate)) {
            table += fillTable(data[i], row);
            row++;
        }
    }
    document.getElementById("table_main").innerHTML = table;
}

/**
 * Creates content of orders table
 * @param {object} data 
 * @param {number} row 
 */
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

/**
 * Creates titles for main orders table
 */
function getTableTitles() {
    return "<thead class=\"tealColor\"><tr class=\"text-white\"><th>Order ID</th><th>Customer ID</th><th>Customer</th><th>Delivery Address</th><th>Delivery Date</th><th>Order Status</th></tr></thead>";

}



/**
 * Prints order details table and creates checkboxes to pick a product
 * Sets personal id to each product which is match with session storage ID 
 * @param {object} data 
 * @param {number} id 
 */
function printOrderDetailsTable(data, id) {

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

/**
 * Shows details about order and creates array of product ids of the order to perform comparation with datatbase at sessionStorage  
 * @param {object} data 
 * @param {number} id 
 */
function getOrderInfo(data, id) {
    var checkboxes = "";
    document.getElementById("ID_Status").innerHTML = id;
    var comment = sessionStorage.getItem("comment" + id);
    console.log(comment);
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
            document.getElementById('packing_comment').innerHTML = comment;
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

/**
 * Creates DATABASE at sessionStorage 
 * Order ID: NOT READY
 * Product ID ("packed" + j + "_" + data[i].orderid) , 0
 * This function performs right away after LOGIN
 * @param {object} data 
 */
function getStatus(data) {
    for (var i = 0; i < data.length; i++) {
        sessionStorage.setItem(data[i].orderid, "NOT READY");
        console.log(data[i].products.length);
        for (var j = 0; j < data[i].products.length; j++) {
            sessionStorage.setItem("packed" + j + "_" + data[i].orderid, 0);
        }
    }

}


/**
 * Function get the orderid from the clicked row from MAIN ORDER TABLE and save it on the local storage 
 * @param {string} id 
 */
function newLocation(id) {
    var orderId = document.getElementById(id).childNodes[0].innerHTML;
    localStorage.setItem("orderid", orderId);
    document.location.href = "orderdetails.html";

}

/**
 * Login function
 * This function is calling another functions inside such us:
 * fetchOrder("status") - to create status database at sessionStorage
 * And it perform login function using array of users with passwords
 */
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

    login.onclick = () => {
        if ((input[0].value != "") && (input[1].value != "")) {
            var user_name = input[0].value;
            var pass = input[1].value;
            for (var i = 0; i < users.length; i++) {
                console.log(users[i].name == user_name);
                if ((users[i].name == user_name) && (users[i].password == pass)) {
                    sessionStorage.setItem("username", user_name);
                    sessionStorage.setItem("role", users[i].role);
                    document.location.href = "landing.html";
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



/**
 * Function for setting User name and user role on landing page
 */
function getUserData() {
    var username = sessionStorage.getItem("username");
    var role = sessionStorage.getItem("role");
    document.getElementById("user_name_landing").innerHTML = username;
    document.getElementById("user_role_landing").innerHTML = role;
}

/**
 * Function to check checkboxes if it where already selected during one session
 * and it will change a status of product( 1 - packed, 0 - not packed)
 * @param {number} id 
 */
function checkStatus(id) {
    var checkBox = document.getElementById(id);


    if (checkBox.checked) {
        sessionStorage.setItem(id, 1);
        showCheckBox();
    } else {
        sessionStorage.setItem(id, 0);
        showCheckBox();
    }

}


/**
 * Check if the checkbox was already selected (checked)
 */
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


/**
 * Change the status of ORDER if all products where packed
 */
function buttonReady() {
    var id = document.getElementById("ID_Status").innerHTML;
    var list_of_chckboxes = document.getElementById('list_of_chckboxes').innerHTML;
    var comment = document.getElementById('coment_area').value;
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

    sessionStorage.setItem("comment" + id, comment)
    document.getElementById('packing_comment').innerHTML = comment;

    console.log("Status for " + arr[i] + ": " + sessionStorage.getItem(arr[i]));

}

//** Product-list page */
function getUniqueProductsFromJson(orders) {
    var sumArr = [];
    for (i = 0; i < orders.length; i++) {
        sumArr = orders[i].products.concat(sumArr);
    }

    var result = [];
    for (j = 0; j < sumArr.length; j++) {
        var isExist = false;
        for (k = 0; k < result.length; k++) {
            if (sumArr[j].code == result[k].code) {
                isExist = true; break;
            }
        }
        if (isExist == false) {
            result.push(sumArr[j]);
        }
    }
    return result;
}

function generateTable(productList) {
    var table = document.getElementById("product-list");
    var tableHeader = table.children[0].children[0];

    var tbody = table.children[0];
    tbody.innerHTML = "";
    tbody.appendChild(tableHeader);

    for (k = 0; k < productList.length; k++) {
        var newRow = document.createElement("tr");
        var newCol6 = document.createElement("td");
        newCol6.innerHTML = productList[k].code;
        var newCol7 = document.createElement("td");
        newCol7.innerHTML = productList[k].suppliercode;
        var newCol8 = document.createElement("td");
        newCol8.innerHTML = productList[k].product;
        var newCol9 = document.createElement("td");
        newCol9.innerHTML = productList[k].unit_price;
        var newCol10 = document.createElement("td");
        newCol10.innerHTML = productList[k].shelf_pos;
        newRow.appendChild(newCol6);
        newRow.appendChild(newCol7);
        newRow.appendChild(newCol8);
        newRow.appendChild(newCol9);
        newRow.appendChild(newCol10);
        var tbody = table.getElementsByTagName("tbody")[0];
        newRow.setAttribute("id", productList[k].code);
        newRow.addEventListener("click", function (e) {
            document.location.href = "productdetails.html?code=" + e.currentTarget.id;
        });
        tbody.appendChild(newRow);
    }
}

function loadProducts() {
    fetch("/project.json")
        .then(res => res.json())
        .then(orders => {
            var uniqueProducts = getUniqueProductsFromJson(orders);
            generateTable(uniqueProducts);
        });
}

function filterProducts() {
    fetch("/project.json")
        .then(res => res.json())
        .then(orders => {
            var uniqueProducts = getUniqueProductsFromJson(orders);
            var productIdValue = document.getElementById("product-id").value;
            var supplierIdValue = document.getElementById("supplier-id").value;
            var shelfPositionValue = document.getElementById("shelf-position").value;

            var filteredById = [];
            for (i = 0; i < uniqueProducts.length; i++) {
                if (uniqueProducts[i].code.includes(productIdValue)) {
                    filteredById.push(uniqueProducts[i]);
                }
            }

            var filteredBySupplier = [];
            for (j = 0; j < filteredById.length; j++) {
                if (filteredById[j].suppliercode.includes(supplierIdValue)) {
                    filteredBySupplier.push(filteredById[j]);
                }
            }
            var filteredByShelfPosition = [];
            for (k = 0; k < filteredBySupplier.length; k++) {
                if (filteredBySupplier[k].shelf_pos.includes(shelfPositionValue)) {
                    filteredByShelfPosition.push(filteredBySupplier[k]);
                }
            }

            generateTable(filteredByShelfPosition);
        })
}
//* Product detail page */
function loadProduct() {
    var productCode = decodeURI(document.location.search.replace("?code=", ""));

    fetch("/project.json")
        .then(res => res.json())
        .then(orders => {
            var uniqueProducts = getUniqueProductsFromJson(orders);
            var product = uniqueProducts.filter(p => p.code === productCode)[0];
            
            document.getElementById("code").innerHTML = product.code;
            document.getElementById("name").innerHTML = product.product;
            document.getElementById("description").innerHTML = product.description;
            document.getElementById("supplier").innerHTML = product.suppliercode;
            document.getElementById("unit-price").innerHTML = product.unit_price;
            document.getElementById("shelf-position").innerHTML = product.shelf_pos;
        });
}