import axios from "axios";
const userServer = process.env.VITE_USER_SERVER

export const viewFaves = async(uuid) => {
    try {
        const res = await axios.get(`${userServer}/${uuid}/favorites`);
        return res.data
    } catch (err) {
        console.error("Error fetching favorites", err)
    }
};


//delete a user profile
export const deleteProfile = async (uuid) => {
    try {
        const res = await axios.delete(`${userServer}/profile/${uuid}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
};


//fetch all users
// export const UserService = async() => {
//     try {
//         const response = await axios.get(userServer)
//         return response.data;
//     } catch (err ) {
//         console.log(err);
//     }
// };

// //fetch profile for selected user
// export const ProfileService = async (uuid) => {
//     try {
//         const res = await axios.get(`${userServer}/profile/${uuid}`);
//         return res.data[0]
//     } catch (error) {
//         console.log(error);
//     }
// };

