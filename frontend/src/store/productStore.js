import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import zustyMiddleware from "zustymiddleware";

const useProductStore = create(
  persist(
    zustyMiddleware((set,get) => ({
      products: [], // This is just the default/initial value
      totalCartPrice:0,
      selectedItemList:[],
      addProduct: (product) => {
        set((state) => {
          const updateProducts = [...state.products, product];
          if (updateProducts.length > 0) {
            toast.success(`${product.name} added to cart`);
          }
          return { products: updateProducts };
        });
      },
      
      removeProduct: (name) => {
        set((state) => {
          const product = state.products.filter((p) => p.name !== name);
          const selectedItem = state.selectedItemList.filter((p) => p.name !== name);
          
          if (product && selectedItem) {
            toast.success(`${name} Remove from cart`);
          }
          return { products: product,selectedItemList:selectedItem };
        });
      },
      
      increaseQuantity: (name) => {

      
    set((state) => {

      const updatedProducts = state.products.map((item) =>
        item.name === name? {...item, quantity: item.quantity += 1, totalPrice:item.quantity * item.price } : item
       ).filter((item)=>item.quantity > 0
       );


         // Update selectedItemList to reflect changes in products
    const updatedSelectedItems = state.selectedItemList.map((selectedItem) => {
      const updatedProduct = updatedProducts.find(product => product.name === selectedItem.name);
      return updatedProduct ? updatedProduct : selectedItem;
    })
  
 
     
     return { products: updatedProducts,selectedItemList:updatedSelectedItems };
    });
  },

    totalAmount:()=>{
          set((state)=>({
            

        totalCartPrice:state.selectedItemList.reduce((acc,item)=>acc + item.totalPrice,0)
        }))
    },


  toggleItem: (idname)=>{
      set((state) => {
        const isSelected = state.selectedItemList.some((item) => item.name === idname);
        
        if (isSelected) {
          // Remove item if already selected
          return {
            selectedItemList: state.selectedItemList.filter((item) => item.name !== idname)
          };
        } else {

          return  {selectedItemList: [...state.selectedItemList,...state.products.filter((item) => item.name === idname)
        ]}
        
        }
      });
  },


  

      decreaseQuantity: (name) => {

       
        set((state) => {

          const updatedProducts = state.products.map((item) =>
            item.name === name
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price
                }
              : item
          )
            .filter((item) => item.quantity > 0);
            
                // Update selectedItemList properly
    const productStillExists = updatedProducts.some(product => product.name === name);
    
    const updatedSelectedItems = productStillExists 
      ? state.selectedItemList.map((selectedItem) => {
          const updatedProduct = updatedProducts.find(product => product.name === selectedItem.name);
          return updatedProduct || selectedItem;
        })
      : state.selectedItemList.filter(selectedItem => selectedItem.name !== name);



          return { products: updatedProducts,selectedItemList:updatedSelectedItems};
        });
      }
    })),

   
  
    {
      name: 'cartItems', // matches your original localStorage key
      // Optional: you can specify which parts of the state to persist
       partialize: (state) => ({ 
        products: state.products,
        selectedItemList: state.selectedItemList 
      }),
    }
  )
);

export default useProductStore;