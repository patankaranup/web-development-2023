-- create orders table 
CREATE TABLE orders {
    id INT NOT NULL,
    order_num INT,
    customer_id INT,
    product_id INT,
    PRIMARY KEY (id),
    -- foreign key is used to link two tables to establish relationship
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
};
-- insert into table 
INSERT INTO orders 
VALUES (1, 562, 2, 1);

-- innner join 
SELECT orders.order_num, customers.first_name , customers.last_name, customers.address
from orders
INNER JOIN customers ON orders.customer_id = customers.id

-- another join 
SELECT orders.order_num, products.name , products.stocks, products.price
from products
INNER JOIN products on products.id = orders.product_id
