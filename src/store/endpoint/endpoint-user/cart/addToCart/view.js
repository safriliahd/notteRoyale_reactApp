import httpClient from '../../../../api/httpClient'; // Ensure your httpClient is set up correctly

export const addToCart = async (cartData) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Adding to cart with token:", token); // Log token for debugging
    console.log("Payload being sent:", cartData); // Log payload for debugging

    const response = await httpClient.post('/user/addcart', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Add to cart response:", response); // Log response from server
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error.response || error.message); // Log error for debugging
    throw new Error(error.response?.data?.message || 'Failed to add product to cart');
  }
};


