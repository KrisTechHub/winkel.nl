import axios from "axios";
const productServer = `${process.env.VITE_SERVER}/products`;


//fetch all products
export const ProductsService = async () => {
    try {
        const res = await axios.get(productServer)
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


//fetch selected product
export const ProductService = async (uuid) => {
    try {
        const res = await axios.get(`${productServer}/${uuid}`);
        return res.data[0]
    } catch (error) {
        console.log(error);
    }
};

//update selected product
export const UpdateProduct = async (uuid) => {
    try{
        const res = await axios.put(`${productServer}/${uuid}`);
        return res.data
    } catch (err) {
        console.log(err);
    }
}


//delete selected product
export const DeleteProduct = async (uuid) => {
    try {
        const res = await axios.delete(`${productServer}/${uuid}`);
        return res.data
    } catch (err) {
        console.log(err);
    }
};