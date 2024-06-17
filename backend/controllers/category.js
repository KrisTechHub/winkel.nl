import { db } from '../db.js';

//get product by category
export const categorizedProducts = async (req, res) => {
        const category = req.params.category;
        const q = "SELECT * FROM products WHERE category = ?";

        db.query(q, [category], (err, data) => {
            if (err) res.send(err);
            return res.send(data)
        })
}