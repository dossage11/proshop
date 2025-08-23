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
      shippingAddress: [],
      paymentMethod:'',
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
  const { products } = get(); // Access current state
  const itemExists = products.some((p) => p.name === name);
  
  if (!itemExists) {
    toast.error('Item not found');
    return;
  }

  set((state) => ({
    products: state.products.filter((p) => p.name !== name),
    selectedItemList: state.selectedItemList.filter((p) => p.name !== name)
  }));
  
  toast.success(`${name} removed from cart`);
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
      AddShippingAddress: (address) => {
        if (!address) return;
        
        set(() => ({ shippingAddress: [address] }));
        // Optionally, you can show a success message
        toast.success('Shipping address updated');
      },

      
      PaymentMethod:(method)=>{
        set(() => ({ paymentMethod: method }));
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
        selectedItemList: state.selectedItemList,
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod 
      }),
    }
  )
);

export default useProductStore;