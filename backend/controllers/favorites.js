import util from 'util';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const queryAsync = util.promisify(db.query).bind(db);

//view all favorites of a user
export const viewFavorites = async(req, res) => {
    const uuid = req.params.uuid;
    const q = `SELECT
            f.id AS favorite_id,
            f.customer_uuid,
            f.product_uuid,
            p.title AS product_title,
            p.description AS product_description,
            p.price AS product_price,
            p.thumbnail AS product_thumbnail
        FROM
            favorites f
        JOIN
            newdata p ON f.product_uuid = p.uuid
        WHERE
            f.customer_uuid = '${uuid}'`;
    const data =  await queryAsync(q);
    res.send(data);
};

//add a product to favorites
export const addFavorite = async(req, res) => {
    const favoriteId = uuidv4();
    const productId = req.params.uuid;
    const { customerId } = req.body;
    if (!customerId) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    const q = 'INSERT INTO favorites (id, customer_uuid, product_uuid) VALUES (?, ?, ?)';
    await queryAsync(q, [favoriteId, customerId, productId])
    res.status(200).json({ message: "Product added to favorites."});
};


export const deleteFavoriteItem = async(req, res) => {
    const { favoriteId } = req.body;

    const q = `DELETE FROM favorites WHERE id = '${favoriteId}'`;
    const data = await queryAsync(q);
    res.send(data);
}