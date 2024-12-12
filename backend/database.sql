create TABLE users(
    id Serial PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    firstName VARCHAR(255),
    patronymic VARCHAR(255),
    lastName VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    photo VARCHAR(255),
    chat_id INTEGER,
    order_id INTEGER,
    role_id INTEGER
);

create TABLE roles(
    id Serial PRIMARY KEY,
    name_role VARCHAR(255)
);

create TABLE orders(
    id Serial PRIMARY KEY,
    order_statuses_id INTEGER,
    product_id INTEGER
);

create TABLE order_statuses(
    id Serial PRIMARY KEY,
    name_status VARCHAR(255)
);

create TABLE products(
    id Serial PRIMARY KEY,
    name_product VARCHAR(255),
    cost INTEGER,
    count INTEGER,
    description_id INTEGER
);

create TABLE descriptions(
    id Serial PRIMARY KEY,
    description VARCHAR(255),
    weight INTEGER,
    width INTEGER,
    height INTEGER,
    color VARCHAR(255),
    material VARCHAR(255),
    photo VARCHAR(255)
);

create TABLE chats(
    id Serial PRIMARY KEY,
--     Пользователь, который учавстует в переписке
    user_id INTEGER
);

create TABLE chat_message(
    id Serial PRIMARY KEY,
    message VARCHAR(300),
    date_message TIMESTAMP,
    file VARCHAR(300),
--     Пользователь, который добавил сообщение
    user_id INTEGER,
    chat_id INTEGER
);


create TABLE chat_statuses(
    id Serial PRIMARY KEY,
    is_read boolean,
--     Пользователь с которым происходит общение
    user_id INTEGER
);


ALTER TABLE users
ADD CONSTRAINT fk_users_chats FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_users_orders FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_statuses FOREIGN KEY (order_statuses_id) REFERENCES order_statuses(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE products
ADD CONSTRAINT fk_products_description FOREIGN KEY (description_id) REFERENCES descriptions(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chats
ADD CONSTRAINT fk_chats_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chat_message
ADD CONSTRAINT fk_chat_message_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_chat_message_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE chat_statuses
ADD CONSTRAINT fk_chat_statuses_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;







