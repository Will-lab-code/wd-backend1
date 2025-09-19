import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('products.json');

// GET /api/products/
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// POST /api/products/
router.post('/', async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updated = await productManager.updateProduct(pid, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Producto no encontrado para actualizar' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const deleted = await productManager.deleteProduct(pid);
  if (deleted) {
    res.json({ message: 'Producto eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado para eliminar' });
  }
});

export default router;
