
import products from '../../schema/products.js';


//@description: Get all products
//@route: GET /api/products
//@access: Public

export const getProducts = async (req, res) => {
  const allProducts = await products.find({});
    res.json(allProducts);
};


//@description: Get product by ID
//@route: GET /api/products/:id
//@access: Public

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await products.findById(productId);
  
  if (!product) {
     res.status(404)
     throw new Error('Product not found');
  }
  
  res.json(product);
};


export const deleteProductById = async(req,res)=>{


  const productId = req.params.id;
  const product = await products.deleteOne({_id:String(productId)})

  res.status(201).json({
        product,
        message:"Successfully deleted"
    })
}

