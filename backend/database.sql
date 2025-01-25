create TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    firstName VARCHAR(255),
    patronymic VARCHAR(255),
    lastName VARCHAR(255),
    phone VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    photo_link VARCHAR(255),
    chat_id VARCHAR(255),
    order_id VARCHAR(255),
    role_id VARCHAR(255)
);

create TABLE roles(
    id VARCHAR(255) PRIMARY KEY,
    name_role VARCHAR(255)
);

create TABLE orders(
    id VARCHAR(255) PRIMARY KEY,
    order_statuses_id VARCHAR(255),
    product_id VARCHAR(255),
    count INTEGER
);

create TABLE order_statuses(
    id VARCHAR(255) PRIMARY KEY,
    name_status VARCHAR(255)
);

create TABLE products(
    id VARCHAR(255) PRIMARY KEY,
    name_product VARCHAR(255),
    cost INTEGER,
    count INTEGER
);

create TABLE descriptions(
    id VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255),
    weight INTEGER,
    width INTEGER,
    height INTEGER,
    color VARCHAR(255),
    material VARCHAR(255),
    product_id VARCHAR(255)
);

-- Несколько фоток у одного описания
create TABLE photos(
    id VARCHAR(255) PRIMARY KEY,
    photo_link VARCHAR(255),
    product_id VARCHAR(255)
);

create TABLE chats(
    id VARCHAR(255) PRIMARY KEY,
--     Пользователь, который учавстует в переписке
    user_id VARCHAR(255)
);

create TABLE chat_message(
    id VARCHAR(255) PRIMARY KEY,
    message VARCHAR(300),
    date_message TIMESTAMP,
    file VARCHAR(300),
--     Пользователь, который добавил сообщение
    user_id VARCHAR(255),
    chat_id VARCHAR(255),
    chat_status_id VARCHAR(255)
);

create TABLE chat_statuses(
    id VARCHAR(255) PRIMARY KEY,
    is_read boolean
);


ALTER TABLE users
ADD CONSTRAINT fk_users_chats FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_users_orders FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_statuses FOREIGN KEY (order_statuses_id) REFERENCES order_statuses(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE descriptions
ADD CONSTRAINT fk_descriptions_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE photos
ADD CONSTRAINT fk_photos_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chats
ADD CONSTRAINT fk_chats_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chat_message
ADD CONSTRAINT fk_chat_message_chat_status_id FOREIGN KEY (chat_status_id) REFERENCES chat_statuses(id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_chat_message_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Заготовленные статусы
INSERT INTO roles (id, name_role) VALUES ('1', 'user'), ('2', 'admin');
INSERT INTO order_statuses (id, name_status) VALUES ('1', 'Создан'), ('2', 'Принят в работу'), ('3', 'Готов к доставке'), ('4', 'Завершен');
-- Заготовленный пользователь админ
INSERT INTO users (id ,email, firstname, patronymic, lastname, login, password, role_id) values('1','dima.lepahin@mail.ru', 'Дмитрий', 'Лепахин','Владимирович', 'dlepakhin', '$2b$10$lSsVGCQEpd0Fm1468EWh8umq.SKKwRCRid0ed51qlrbTPwciB0uai', '2')

