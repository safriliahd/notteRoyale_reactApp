import httpClient from "../../../../api/httpClient";

export const clearCart = async (setCartProducts) => {
    try {
        const token = localStorage.getItem("token");
        const response = await httpClient.post('/user/cart/clear', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Cart cleared successfully!');

        // Clear the frontend cart state
        setCartProducts([]);  // Reset the cart items in the frontend

    } catch (error) {
        console.error('Error clearing cart:', error.response ? error.response.data.message : error.message);
    }
};

