-- update previously set values 
UPDATE "products" 
SET price = 1000
WHERE name = "iPhone";

-- add new columns by altering the table
-- this will add new col to table 
ALTER TABLE "products"
ADD stocks INT ;

-- populating the stocks column
UPDATE "products" 
SET stocks = 500
WHERE name = "iPhone";
UPDATE "products" 
SET stocks = 900
WHERE name = "Macbook";




