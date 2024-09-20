CREATE TABLE IF NOT EXISTS user(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(120) NOT NULL,
    password VARCHAR(120) NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS  smartphone(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    serie VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT,
    user_id INT(11),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS shoppingcart(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    smartphone_id INT(11) NOT NULL,  
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (smartphone_id) REFERENCES smartphone(id)
);

CREATE TABLE IF NOT EXISTS orderStore(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    order_status ENUM('OK', 'Cancel'),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE IF NOT EXISTS orderSmartphone(
    id INT(11) NOT NULL AUTO_INCREMENT,
    quantity INT(11) NOT NULL,  
    user_id INT(11) NOT NULL,
    smartphone_id INT(11) NOT NULL,  
    order_id INT(11) NOT NULL,  
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (smartphone_id) REFERENCES smartphone(id),
    FOREIGN KEY (order_id) REFERENCES orderStore(id)
);

