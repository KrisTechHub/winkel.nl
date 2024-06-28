import util from 'util';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const queryAsync = util.promisify(db.query).bind(db);

//view cart items
export const viewCartItems = async(req, res) => {
    const uuid = req.params.uuid;
    const q = `SELECT
            c.id AS cart_id,
            c.customer_uuid,
            c.quantity,
            c.prod_uuid,
            p.title AS product_title,
            p.description AS product_description,
            p.price AS product_price,
            p.thumbnail AS product_thumbnail,
            p.authorName AS product_authorName
        FROM
            cart c
        JOIN
            newdata p ON c.prod_uuid = p.uuid
        WHERE
            c.customer_uuid = '${uuid}'`;
    const data = await queryAsync(q);
    res.send(data);
};


//add to cart
export const addToCart = async(req, res) => {
    const cartId = uuidv4();
    const productId = req.params.uuid;
    const { customerId, quantity } = req.body;
    if (!customerId) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    const q = 'INSERT INTO cart (id, customer_uuid, quantity, prod_uuid) VALUES (?, ?, ?, ?)';
    await queryAsync(q, [cartId, customerId, quantity, productId])
    res.status(200).json({ message: "Product added to cart."});
};


export const updateCartItem = async(req, res) => {
    const { cartId, newQuantity } = req.body;
    const q = "UPDATE cart SET quantity = ? WHERE id = ?";
    const data = await queryAsync(q, [newQuantity, cartId])
    res.send(data);
};

export const deleteCartItem = async(req, res) => {
    const { cartId } = req.body;

    console.log({cartId});

    const q = `DELETE FROM cart WHERE id = '${cartId}'`;
    const data = await queryAsync(q);
    res.send(data);
}