import util from 'util';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const queryAsync = util.promisify(db.query).bind(db);

//show review of a selected product
export const reviews = async (req, res) => {
    const { product_id } = req.params;
    const q = 'SELECT * FROM reviews WHERE product_id = ?';
    const data = await queryAsync(q, [product_id]); // Use parameterized query to avoid SQL injection
    res.send(data);
};

//add a new review for a product
export const newReview = async (req, res) => {
    const reviewId = uuidv4(); //Generate UUID for review ID
    const { body, rating, author_id, author_name, product_id } = req.body;
    const q = "INSERT INTO reviews ( uuid, body, rating, author_id, author_name, product_id ) VALUES (?, ?, ?, ?, ?, ? )";
    await queryAsync(q, [reviewId, body, rating, author_id, author_name, product_id]);
    res.status(201).json({ message: "Thank you for your feedback. You review has been posted!"});
};

//delete a review
export const deleteReview = async(req, res) => {
    // const { product_id } = req.params;
    const { review_id } = req.body;
    const q = "DELETE FROM reviews WHERE uuid = ?";
    await queryAsync(q, [review_id]);
    res.status(201).json({ message: "Your review has been successfully deleted."});
};
