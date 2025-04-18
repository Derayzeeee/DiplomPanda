export const handleApiError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Произошла ошибка');
    }
    return response.json();
  };
  
  // Использование в компонентах:
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await handleApiError(response);
      setProducts(data);
    } catch (error) {
      // Показать уведомление об ошибке
      console.error('Error:', error.message);
    }
  };