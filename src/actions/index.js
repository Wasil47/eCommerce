export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

// export const showAllProducts = (products) => ({});

export const productsFetch = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  }
};