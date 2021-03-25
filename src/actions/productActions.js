import { types } from "../types"


export const fetchProducts = () =>  async ( dispatch ) => {

  
  const res =  await fetch('localhost:5000/api/products');

  const data = await res.json();
  console.log(data)
  
  dispatch({ 
      type: types.FETCH_PRODUCTS,
      payload: data,
  });

};