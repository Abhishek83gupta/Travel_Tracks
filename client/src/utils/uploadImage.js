import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post("/image-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Store both the URL and public_id
    return {
      imageUrl: response.data.imageUrl,
      public_id: response.data.public_id
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export default uploadImage;