export const get_products = ()=>{

    return {method:'GET', endpoint:'/products' }
    }

export const get_product_by_id = (id)=>{
    return {method:'GET',endpoint:`/products/${id}`}
}

export const delete_product_by_id = (id)=>{
    return {method:'DELETE',endpoint:`/product/${id}`}}


export const  auth_user = ({email, password})=>{
    return {method:'POST', endpoint:'/auth/login', body: {email, password}}
}

export const register_user = ()=>{
    // return {method:'POST', endpoint:'/auth/registration', body: {name, email, password}}
    return {method:'POST', endpoint:'/auth/registration'}
}


export const get_user = (id)=>{
    return {method:'GET', endpoint:`/user/${id}`}
}

export const get_users = ()=>{
    return {method:'GET', endpoint:'/users'}
}

export const update_user_profile = (id)=>{
 return {method:'PATCH', endpoint:`/user/update/${id}`}
}