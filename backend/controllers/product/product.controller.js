const db = require('../../db');
const {v4: uuidv4} = require("uuid");
const {join} = require("node:path");
const path = require("node:path");
const bcrypt = require("bcrypt");
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
            const {search} = req.body;
            let resultRows;
            if (search) {
                const {rows} = await db.query(`SELECT 
                                            p.id,
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
                                        WHERE LOWER(p.name_product) LIKE LOWER($1)
                                        ORDER BY p.id
                                        `, ['%' + search + '%'])
                resultRows = rows;
            }else{
            const {rows} = await db.query(`SELECT 
                                            p.id,
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
                                        ORDER BY p.id`)
                resultRows = rows;
            }

            const newRows = await Promise.all(resultRows.map(async (elem) => {
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
            const {rows} = await db.query(`SELECT 
                                            p.id,
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
                                        WHERE p.id = $1`, [id]);
            if (rows[0]?.photo_link) {
                const fileBuffer = await fs.readFile((process.cwd() + rows[0]?.photo_link));
                const base64String = fileBuffer.toString('base64');

                return res.json({...rows[0], photo_link: base64String});
            }
            return res.json(rows[0]);

        } catch (e) {
            console.error('Ошибка во время получения данных о товаре:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id
            const {
                name_product,
                cost,
                count,
                description,
                weight,
                width,
                height,
                color,
                material,
                photo_link
            } = req.body
            const buffer = Buffer.from(photo_link, 'base64');
            // Сохранение изображения на диск
            const imagePath = join(process.cwd(), 'public/products', Date.now() + '.png');
            await fs.writeFile(imagePath, buffer);

            // Сохранение пути к изображению в базу данных
            const imageUrl = `/public/products/${path.basename(imagePath)}`;

            const {rows: rowsProduct} = await db.query(`UPDATE products p
                                        SET 
                                            name_product = $1,
                                            cost = $2,
                                            count = $3
                                        WHERE p.id = $4;`, [name_product, cost, count, id]);

            const {rows: rowsDescription} = await db.query(`UPDATE descriptions d
                                        SET 
                                            description = $1,
                                            weight = $2,
                                            width = $3,
                                            height = $4,
                                            color = $5,
                                            material = $6
                                        WHERE d.product_id = $7;`, [description, weight, width, height, color, material, id]);

            const {rows: rowsPhoto} = await db.query(`UPDATE photos ph
                                        SET photo_link = $1
                                        WHERE ph.product_id = $2;`, [imageUrl, id]);

            return res.json({...rowsProduct, ...rowsDescription, photo: rowsPhoto})
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