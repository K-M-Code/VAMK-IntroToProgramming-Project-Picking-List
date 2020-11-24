# Picking List
## Requirements

- Mockup Design
- Functionality
    - Login
        - User login details saved in JSON
    - List of Orders
    - Search Criteria for orders - customer number, order id, delivery date
        - List of Products
        - {"code":"584-237", "product":"Pulley", "description":"7.75 O.D. 5/8 bore 1 groove", "suppliercode":"R1734", "qty":"1", "unit_price":"22.95", "shelf_pos":"M59.57"},
        - Search Criteria for products - product name, shelf pos, supplier
        - Product Comments
            - Save comment, user, and product ID
    - Order details
        - Order ID, Customer ID, Customer Name, InvAddr, DelivAddr, Delivery Date, Sales Rep, Comment, Total Price, Products [Code, Product, Description, Supplier Code, Quantity, Unit Price, Shelf Pos]
        - Order Status [Received, Packing, Ready, Shipped, Delivered]
        - All Products have to be ticked off for Shipped
        - Print List of Products to place with order
        - Write Comment on Order, Incase product missing or something