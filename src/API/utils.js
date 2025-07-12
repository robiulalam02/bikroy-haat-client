import axios from "axios";

export const uploadImageToImgBB = async (imageFile) => {
    const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_API_KEY // Replace with your real key
    const formData = new FormData();
    formData.append("image", imageFile);

    const result = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

    return result;
};
