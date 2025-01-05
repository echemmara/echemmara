const fetchProducts = async (halalOnly) => {
  const response = await axios.get('/api/products', {
    params: { halal: halalOnly },
  });
  setProducts(response.data);
};
