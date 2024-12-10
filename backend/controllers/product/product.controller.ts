const db = require('../../db');

class UsersController {
    async createUser(req, res) {
        const {login, password} = req.body;
        const newUser = await db.query(`INSERT INTO user (login, password) values($1, $2) RETURNING *`, [login, password]);

        res.json(newUser.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM users`);

        res.json(users.rows);
    }

    async getUser(req, res) {
        const id = req.params.id
        const users = await db.query(`SELECT * FROM users`).where('id', '==', id);

        res.json(users.rows[0]);
    }

    async updateUser(req, res) {
        const {id, firstName, surname} = req.body
        const users = await db.query(`UPDARE users set firstName = $1, surname = $2 RETURNING *`, [firstName, surname]).where('id', '==', id);

        res.json(users.rows[0]);
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const users = await db.query(`DELETE FROM users`).where('id', '==', id);

        res.json(users.rows[0]);
    }
}

module.exports = UsersController;