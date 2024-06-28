import util from 'util';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const queryAsync = util.promisify(db.query).bind(db);


export const index = async (req, res) => {
    const q = "SELECT * FROM newdata";
    const data = await queryAsync(q);
    res.send(data);
};

//view single product detail
export const showProduct = async (req, res) => {
    const uuid = req.params.uuid;
    const q = `SELECT * FROM newdata WHERE uuid = '${uuid}'`;
    const data = await queryAsync(q);
    res.send(data);
};


//create new product
export const addProduct = async (req, res) => {
    const productId = uuidv4(); //Generate UUID for product ID
    const { title, description, price, location, color, size, brand, category, stock, discount, author_id, author_name } = req.body;
    const thumbnailPath = req.files.thumbnail[0].path;
    const imagesPath = req.files.images.map(img => (img.path));
    const imagesPathString = JSON.stringify(imagesPath);
    const q = "INSERT INTO newdata (uuid, title, description, price, location, color, size, brand, category, stock, discount, thumbnail, images, author_id, authorName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [productId, title, description, price, location, color, size, brand, category, stock, discount, 
        thumbnailPath, imagesPathString, author_id, author_name];
    console.log('data', req.body, req.files);
    await queryAsync(q, values)
    res.status(201).json({ message: "Product added successfully."});
};

//update selected product
export const updateProduct = async (req, res) => {
    const uuid = req.params.uuid;
    const { title, description, price, location, color, size, brand, category, stock, discount } = req.body;
    const thumbnailPath = req.files.thumbnail ? req.files.thumbnail[0].path : null;

    // Fetch current images from the database
    const fetchImagesQuery = "SELECT * FROM newdata WHERE uuid = ?";
    const currentProduct = await queryAsync(fetchImagesQuery, [uuid]);

    let currentImages;
    if (typeof currentProduct[0].images === 'string') {
        try {
            currentImages = JSON.parse(currentProduct[0].images);
        } catch (error) {
            console.error("Error parsing current images:", currentProduct[0].images);
            return res.status(400).json({ message: "Invalid images data in database" });
        }
    } else {
        currentImages = currentProduct[0].images;
    }
    
    const imagesToDelete = JSON.parse(req.body.imagesToDelete || '[]');

    // Filter out images that need to be deleted
    const updatedImages = currentImages.filter(img => !imagesToDelete.includes(img));

    // Add New Images
    const newImages = req.files.images ? req.files.images.map(img => img.path) : [];
    const finalImages  = [...updatedImages, ...newImages];
    const imagesPathString = JSON.stringify(finalImages );

    const q = "UPDATE newdata SET title=?, description=?, price=?, location=?, color=?, size=?, brand=?, category=?, stock=?, discount=?, thumbnail=?, images=? WHERE uuid=?";
    const values = [
        title, description, price, location, color, size, brand, category, stock, discount,
        thumbnailPath || currentProduct[0].thumbnail, imagesPathString, uuid
    ];

    const data = await queryAsync(q, values);
    // res.status(201).json({ message: "Product details updated successfully."});
    res.send(data);
};

//delete product
export const deleteProduct = async (req, res) => {
    const uuid = req.params.uuid;
    const q = `DELETE FROM newdata WHERE uuid='${uuid}'`;
    const data = await queryAsync(q);
    res.send(data);
};