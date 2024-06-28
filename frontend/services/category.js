import axios from "axios";
const categoryServer = `${import.meta.env.VITE_SERVER}/category`;

// fetch products by category
export const FetchByCategory = async (category) => {
    try {
        const res = await axios.get(`${categoryServer}/${category}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};