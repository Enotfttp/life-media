const db = require('../../db');
const {v4: uuidv4} = require("uuid");
const {join} = require("node:path");
const path = require("node:path");
const fs = require('fs').promises;

class ProductController {
    async createProduct(req, res) {
        try {
            const {
                name_product, cost,
                count, description, weight, width, height, color, material, photo_link
            } = req.body;
            const uuidProduct = uuidv4();
            const uuidDescription = uuidv4();
            const uuidPhoto = uuidv4();

            const buffer = Buffer.from(photo_link[0], 'base64');
            // Сохранение изображения на диск
            const imagePath = join(process.cwd(), 'public/products', Date.now() + '.png');
            await fs.writeFile(imagePath, buffer);

            // Сохранение пути к изображению в базу данных
            const imageUrl = `/public/products/${path.basename(imagePath)}`;

            const {rows: rowsProduct} = await db.query(`INSERT INTO products (id, name_product, cost, count) values($1,$2, $3, $4) RETURNING *`, [uuidProduct, name_product, cost, count]);
            const {rows: rowsDescription} = await db.query(`INSERT INTO descriptions (id, description, weight, width, height, color, material, product_id ) values ($1,$2, $3, $4, $5, $6, $7, $8) RETURNING *`, [uuidDescription, description, weight, width, height, color, material, uuidProduct])
            const {rows: rowsPhoto} = await db.query(`INSERT INTO photos (id, photo_link, product_id) values ($1,$2, $3) RETURNING *`, [uuidPhoto, imageUrl, uuidProduct]);

            return res.json({...rowsProduct, ...rowsDescription, photo: rowsPhoto})
        } catch (e) {
            console.error('Ошибка во время создания товара:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getProducts(req, res) {
        try {
            const {search} = req.body

            if (search) {
                const {rows} = await db.query(`SELECT 
                                            p.id AS product_id,
                                            p.name_product,
                                            p.cost,
                                            p.count,
                                            d.description,
                                            d.weight,
                                            d.width,
                                            d.height,
                                            d.color,
                                            d.material,
                                            ph.photo_link
                                        FROM 
                                            products p
                                        INNER JOIN 
                                            descriptions d ON p.id = d.product_id
                                        LEFT JOIN 
                                            photos ph ON p.id = ph.product_id
                                        WHERE LOWER(p.name_product) LIKE $1`, [search])
                return res.json(rows);
            }
            const {rows} = await db.query(`SELECT 
                                            p.id AS product_id,
                                            p.name_product,
                                            p.cost,
                                            p.count,
                                            d.description,
                                            d.weight,
                                            d.width,
                                            d.height,
                                            d.color,
                                            d.material,
                                            ph.photo_link
                                        FROM 
                                            products p
                                        INNER JOIN 
                                            descriptions d ON p.id = d.product_id
                                        LEFT JOIN 
                                            photos ph ON p.id = ph.product_id`)
            const newRows = await Promise.all(rows.map(async (elem) => {
                const fileBuffer = await fs.readFile((process.cwd() + elem.photo_link));
                const base64String = fileBuffer.toString('base64');
                return ({...elem, photo_link: base64String})
            }))

            return res.json(newRows);
        } catch (e) {
            console.error('Ошибка во время получения товара:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getProduct(req, res) {
        try {
            const id = req.params.id
            const {rows} = await db.query(`SELECT p.id AS product_id, p.name_product, p.cost, p.count, d.id AS description_id,
            d.description, d.weight, d.width, d.height, d.color, d.material, d.photo FROM products p JOIN descriptions d ON p.description_id = d.id WHERE p.id = $1`, [id]);

            return res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время получения данных о товаре:', e);
            return res.status(400).json({error: e.message});
        }
    }

    // TODO.FIX Переписать
    async updateProduct(req, res) {
        try {
            const {id, firstname, surname} = req.body
            const {rows} = await db.query(`UPDATE users set firstName = $1, surname = $2 WHERE id = $3 RETURNING *`, [firstname, surname, id]);

            res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время обновления данных товара:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id
            const {rows} = await db.query(`DELETE FROM products WHERE id = $1`, [id]);

            res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время удаления товара:', e);
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = ProductController;