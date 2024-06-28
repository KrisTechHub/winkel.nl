import axios from "axios";
const userServer = `${import.meta.env.VITE_SERVER}/users`;



export const viewCart = async(uuid) => {
    try {
        const res = await axios.get(`${userServer}/${uuid}/cart`);
        return res.data;
    } catch (err) {
        console.error("Error fetching cart", err)
    }
};

export const updateCartItem = async(uuid, cartId, newQuantity) => {
    try {
        const res = await axios.put(`${userServer}/${uuid}/cart`, {cartId, newQuantity});
        return res.data;
    } catch (err) {
        console.error("Error udpating cart item", err)
    }
};

export const deleteCartItem = async(uuid, cartId) => {
    try {
        const res = await axios.delete(`${userServer}/${uuid}/cart`, { data: { cartId } });
        return res.data;
    } catch (err) {
        console.error("Error deleting cart item", err);
    }
};