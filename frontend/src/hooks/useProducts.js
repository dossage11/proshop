
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Products } from '../services/products'
import toast from 'react-hot-toast'


export const getProducts = () =>{


    return useQuery ({

        queryKey:['products'],
        queryFn:Products.getProducts

    })
}


export const getProductById = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => Products.getProductById(id),
    })
}

export const deleteProductById=()=>{

const queryClient = useQueryClient()

const {mutate:deleteProduct,isLoading:isDeleting} = useMutation({

    mutationFn:(id)=>Products.deleteProductById(id),
    onSuccess:()=>{

        toast.success(`Product successfully deleted`);
        queryClient.invalidateQueries({
            queryKey:['products']
        })
    },
    onError:(err)=>toast.error(err.message)
})

return {deleteProduct,isDeleting}

}