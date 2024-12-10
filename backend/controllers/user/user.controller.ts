const db = require('../../db');
const bcrypt = require('bcrypt');

class UserController {
    async createUser(req, res) {
        try {
            const {email, firstName, surname, lastName, login, password} = req.body;
            const newUser = await db.query(`INSERT INTO users (email, firstName, surname,lastName, login, password) values($1, $2, $3,$4, $5, $6) RETURNING *`, [email, firstName, surname, lastName, login, password]);

            return res.json(newUser.rows[0])

        } catch (e) {
            console.error('Ошибка во время создания пользователя:', e);
            return res.status(400).json({error: e.message});
        }

    }

    async getUsers(_, res) {
        try {
            const users = await db.query(`SELECT * FROM users`);

            return res.json(users.rows);
        } catch (e) {
            console.error('Ошибка во время получения пользователей:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id
            const users = await db.query(`SELECT * FROM users`).where('id', '==', id);

            return res.json(users.rows[0]);
        } catch (e) {
            console.error('Ошибка во время получения данных о пользователе:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const {id, firstName, surname} = req.body
            const user = await db.query(`UPDATE users set firstName = $1, surname = $2 RETURNING *`, [firstName, surname]).where('id', '==', id);

            res.json(user.rows[0]);
        } catch (e) {
            console.error('Ошибка во время обновления данных пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM users`).where('id', '==', id);

            res.json(user.rows[0]);

        } catch (e) {
            console.error('Ошибка во время удаления пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async registrationUser(req, res) {
        try {
            const {password, email} = req.body;
            const candidate = await db.query(`SELECT * FROM users`).where('email', '==', email);

            if (Boolean(candidate.row.length)) {
                throw new Error('Пользователь с таким email уже существует')
            }
            const hashPassword = await bcrypt.hash(password, 10);

            return await this.createUser({...req.body, password: hashPassword}, res);
        } catch (e) {
            console.error('Ошибка во время регистрации:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async loginUser(req, res) {
        try {
            const {email, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const candidate = await db.query(`SELECT * FROM users`).where('email', '==', email).where('password', '==', hashPassword);

            if (Boolean(candidate.row.length)) {
                return res.status(201).json(candidate.row[0]);
            }
            throw new Error('Не правильно введён логин или пароль')
        } catch (e) {
            console.error('Ошибка во время регистрации:', e);
            return res.status(400).json({error: e.message});
        }
    }

    // /**
    //  * Задел на будущее
    //  * Нужен будет для удления acces_token
    //  */
    // async logoutUser(_, res) {
    //     try {
    //     } catch (e) {
    //         console.error('Ошибка во время выхода:', e);
    //         return res.status(400).json({error: e.message});
    //     }
    // }
    //
    // /**
    //  * Задел на будущее
    //  * Нужен будет для удления acces_token
    //  */
    // async refresh(_, res) {
    //     try {
    //     } catch (e) {
    //         console.error('Ошибка во время регистрации:', e);
    //         return res.status(400).json({error: e.message});
    //     }
    // }


}

module.exports = UserController;