import { api } from "../api/client";
import { delete_product_by_id, get_product_by_id, get_products } from "../utils/endpoint";


export const Products = {


    getProducts : async () => {
    const response = await api.get(get_products().endpoint);
    if (response.status !== 200) throw new Error(response.statusText);
    return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(get_product_by_id(id).endpoint);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    },

    deleteProductById: async(id) =>{
       const response = await api.delete(delete_product_by_id().endpoint);
       if (response.status !== 200) throw new Error(response.statusText);
        return response.data;

    }
}


