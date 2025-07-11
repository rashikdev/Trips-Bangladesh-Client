import axios from "axios";

export const getImgUrl = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const getCloudinaryImgUrl = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );
    return data.secure_url;
  } catch (err) {
    console.error(
      "Cloudinary Upload Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};
