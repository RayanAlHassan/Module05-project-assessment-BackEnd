import OrderSchema from '../models/orderModel.js';
import ProductSchema from '../models/productModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { productID, quantity } = req.body;

  try {
    // Fetch product details to include in the order
    const product = await ProductSchema.findById(productID);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate total price based on product unit price and quantity
    const totalPrice = product.price * quantity;

    // Create the order
    const order = new OrderSchema({
      productID,
      title: product.title,
      description: product.description,
      quantity,
      unitePrice: product.price,
      totalPrice,
      userID: req.user._id,
      status: 'Pending', 
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all orders for a specific user
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find({ userID: req.user._id }); 
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update the status of a specific order (for admin use)
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await OrderSchema.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific order (for admin use)
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderSchema.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete the order
    await order.remove();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
