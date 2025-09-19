import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager('carts.json');

// POST /api/carts/
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado o error al agregar producto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export default router;
