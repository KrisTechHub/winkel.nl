import axios from "axios";
const userServer = `${import.meta.env.VITE_SERVER}/users`;

export const viewFaves = async(uuid) => {
    try {
        const res = await axios.get(`${userServer}/${uuid}/favorites`);
        return res.data
    } catch (err) {
        console.error("Error fetching favorites", err)
    }
};


export const deleteFavoriteItem = async(uuid, favoriteId) => {
    try {
        const res = await axios.delete(`${userServer}/${uuid}/favorites`, { data: { favoriteId } });
        return res.data;
    } catch (err) {
        console.error("Error deleting favorite item", err);
    }
};