import util from 'util';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const queryAsync = util.promisify(db.query).bind(db);

//fetch user data'
export const userData = async (req, res) => {
    const {uuid} = req.params;
    const q = `SELECT * FROM users WHERE uuid = '${uuid}'`;
    const data = await queryAsync(q);
    res.send(data);
};

//delete user profile
export const deleteProfile = async(req, res) => {
    const uuid = req.params.uuid;
    const q = `DELETE FROM users WHERE uuid = '${uuid}'`;
    const data = await queryAsync(q);
    res.send(data);
};

//register as seller
export const sellerRegister = async(req, res) => {
    const {sellerId, isSeller} = req.body;
    const isSellerBool = Boolean(isSeller);  // Ensure isSeller is boolean
    const q = 'UPDATE users SET isSeller=? WHERE uuid=?';
    const data = await queryAsync(q, [isSellerBool, sellerId]);
    res.send(data);
};



//view all users
// export const users = async (req, res) => {
//     const q = "SELECT * FROM users";
//     const data = await queryAsync(q);
//     res.json({ message: "Here is your data", user: data});
// };


//view user profile
// export const userProfile = async(req, res) => {
//     const uuid = req.params.uuid;
//     const q = `SELECT * FROM users WHERE uuid = '${uuid}'`;
//     const data = await queryAsync(q);
//     res.send(data);
// };

