import axios from "axios";
const productServer = process.env.PRODUCT_SERVER

//fetch reviews selected product
export const ReviewService = async (uuid) => {
    try {
        const res = await axios.get(`${productServer}/${uuid}/reviews`);
        return res.data
    } catch (error) {
        console.log(error);
    }
};

export const DeleteReview = async (uuid, review_id) => {
    try {
        const res = await axios.delete(`${productServer}/${uuid}/reviews`, {
            data: {review_id: review_id }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}