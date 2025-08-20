
import { Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Products from '../features/product/Products';
import { getProducts } from "../hooks/useProducts";

export default function Home() {

 const {data:products, isLoading,error} = getProducts()


 // Use this in your component temporarily:

  
if (isLoading) return <div><Loader/></div>;
  if (error) return <div><Message variant="danger">{error}</Message></div>;
  if (!products) return <Alert>No product found.</Alert>;

 
    
  return (
    <div>
<h1>Latest products</h1>

<Products products={products} />
    </div>
  )
}
