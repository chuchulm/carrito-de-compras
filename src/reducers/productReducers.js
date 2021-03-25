import { types } from "../types";





export const productsReducer = ( state = {}, action ) => {

    switch (action.type) {

        case types.FETCH_PRODUCTS:
            return { items: action.payload };
           
    
        default:
            return state;
    }

};