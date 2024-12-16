const db = require('../../db');
const bcrypt = require('bcrypt');
const {
    v4: uuidv4,
} = require('uuid');

class UserController {
    async createUser(req, res) {
        try {
            const {
                id,
                email, firstname,
                patronymic, lastname, login, password
            } = req.body;
            const {rows} = await db.query(`INSERT INTO users (id,email, firstname, patronymic, lastname, login, password) values($1,$2, $3, $4,$5, $6, $7) RETURNING *`, [id, email, firstname,
                patronymic, lastname, login, password]);

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
            const {rows} = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

            return res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время получения данных о пользователе:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const {id, firstname, surname} = req.body
            const {rows} = await db.query(`UPDATE users set firstName = $1, surname = $2 WHERE id = $3 RETURNING *`, [firstname, surname, id]);

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
            const {password, email} = req.body;
            const {rows} = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

            if (Boolean(rows.length)) {
                throw new Error('Пользователь с таким email уже существует')
            }
            const hashPassword = await bcrypt.hash(password, 10);

            return await this.createUser({...req, body: {...req.body, password: hashPassword, id: uuidv4()}}, res);
        } catch (e) {
            console.error('Ошибка во время регистрации:', e);
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = UserController;
