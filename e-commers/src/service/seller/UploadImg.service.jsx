import axios from "axios";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");

  console.log("formData", formData);
  const response = await axios.post("https://api.cloudinary.com/v1_1/dlpeqbowx/image/upload", formData);

  const data = response.data;
  return data.secure_url;
};
   