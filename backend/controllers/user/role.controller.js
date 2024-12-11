const db = require('../../db');

class RoleController {
    async createRole(req, res) {
        const {name_role} = req.body;
        const newRole = await db.query(`INSERT INTO roles (name_role) values($1) RETURNING *`, [name_role]);

        res.json(newRole.rows[0])
    }

    async getRoles(req, res) {
        const roles = await db.query(`SELECT * FROM roles`);

        res.json(roles.rows);
    }

    async getRole(req, res) {
        const id = req.params.id
        const role = await db.query(`SELECT * FROM roles`).where('id', '==', id);

        res.json(role.rows[0]);
    }

    async updateRole(req, res) {
        const {id, name_role} = req.body
        const role = await db.query(`UPDARE roles set name_role = $1 RETURNING *`, [name_role]).where('id', '==', id);

        res.json(role.rows[0]);
    }

    async deleteRole(req, res) {
        const id = req.params.id
        const role = await db.query(`DELETE FROM roles`).where('id', '==', id);

        res.json(role.rows[0]);
    }
}

module.exports = RoleController;