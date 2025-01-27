const db = require('../../db');
const bcrypt = require('bcrypt');
const {
    v4: uuidv4,
} = require('uuid');
const {join} = require("node:path");
const {promises: fs} = require("fs");
const path = require("node:path");

class UserController {
    async createUser(req, res) {
        try {
            const {
                email, firstname,
                patronymic, lastname, login, password
            } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const uuid = uuidv4();

            const {rows} = await db.query(`INSERT INTO users (id ,email, firstname, patronymic, lastname, login, password, role_id) values($1,$2, $3, $4,$5, $6, $7, $8) RETURNING *`, [uuid, email, firstname,
                patronymic, lastname, login, hashPassword, '1']);

            return res.json(rows[0])
        } catch (e) {
            console.error('Ошибка во время создания пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getUsers(_, res) {
        try {
            const {rows} = await db.query(`SELECT * FROM users`);

            return res.json(rows);
        } catch (e) {
            console.error('Ошибка во время получения пользователей:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id
            const {rows} = await db.query(`SELECT users.id,
                    email,
                    firstName,
                    patronymic,
                    lastName,
                    phone, 
                    login, 
                    password,
                    photo_link,
                    roles.name_role
                  FROM users
                  LEFT JOIN roles ON role_id = roles.id
                  WHERE users.id = $1`, [id]);

            if (rows[0]?.photo_link) {
                const fileBuffer = await fs.readFile((process.cwd() + rows[0]?.photo_link));
                const base64String = fileBuffer.toString('base64');

                return res.json({...rows[0], photo_link: base64String});
            }
            return res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время получения данных о пользователе:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const {email, firstname, lastname, patronymic, phone, photo_link} = req.body
            const id = req.params.id
            const buffer = Buffer.from(photo_link, 'base64');
            // Сохранение изображения на диск
            const imagePath = join(process.cwd(), 'public/userAvatar', Date.now() + '.png');
            await fs.writeFile(imagePath, buffer);

            // Сохранение пути к изображению в базу данных
            const imageUrl = `/public/userAvatar/${path.basename(imagePath)}`;

            const {rows} = await db.query(`UPDATE users set firstName = $1, lastname = $2, patronymic = $3 , phone = $4 , photo_link = $5 , email = $6  WHERE id = $7 RETURNING *`, [firstname, lastname, patronymic, phone, imageUrl, email, id]);

            res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время обновления данных пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const {rows} = await db.query(`DELETE FROM users WHERE id = $1`, [id]);

            res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время удаления пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async loginUser(req, res) {
        try {
            const {login, password} = req.body;
            const {rows, rowCount} = await db.query(`SELECT * FROM users WHERE login = $1`, [login])

            if (Boolean(rowCount)) {
                const passwordMatch = await bcrypt.compareSync(password, rows[0].password,);

                if (passwordMatch) return res.status(201).json(rows[0]);
                throw new Error('Не правильно введён пароль')
            }
            throw new Error('Не правильно введён логин или пароль')
        } catch (e) {
            console.error('Ошибка во время авторизации:', e);
            return res.status(400).json({error: e.message});
        }
    }


    async registrationUser(req, res) {
        try {
            const {email} = req.body;
            const {rows} = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

            if (Boolean(rows.length)) {
                throw new Error('Пользователь с таким email уже существует')
            }

            return await this.createUser(req, res);
        } catch (e) {
            console.error('Ошибка во время регистрации:', e);
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = UserController;
