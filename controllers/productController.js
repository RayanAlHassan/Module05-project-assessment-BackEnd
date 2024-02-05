import ProductSchema from '../models/productModel.js'; 

// Get one product by ID
export const getOne = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductSchema.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
export const getAll = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const image= req.file ? req.file.path : '';

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      productId,
      req.body,
      image,

      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new product

export const createProduct = async (req, res) => {
  try {
    const product = await ProductSchema.create({
      title: req.body.title,
      price: req.body.price,
      image: req.file ? req.file.path : '', 
      description: req.body.description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete all products
export const deleteAll = async (req, res) => {
  try {
    await ProductSchema.deleteMany({});
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Search for products
export const searchProduct = async (req, res) => {
  const { query } = req.body;

  try {
    const products = await ProductSchema.find({
      title: { $regex: new RegExp(query, 'i') }, 
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


