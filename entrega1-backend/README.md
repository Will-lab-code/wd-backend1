# 🛒 Entrega N°1 - Backend API REST con Node.js y Express

Este proyecto consiste en el desarrollo de un servidor con Node.js y Express, que gestiona productos y carritos de compra mediante una API REST. La información se persiste en archivos JSON utilizando el sistema de archivos (`fs/promises`).

---

## 🚀 Cómo ejecutar el servidor

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor:
   ```bash
   node src/app.js
   ```

El servidor estará disponible en:
```
http://localhost:8080
```

---

## 📦 Estructura del proyecto

```
src/
├── app.js
├── routes/
│   ├── products.routes.js
│   └── carts.routes.js
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
├── data/
│   ├── products.json
│   └── carts.json
```

---

## 📘 Endpoints disponibles

### Productos (`/api/products/`)
| Método | Ruta                   | Descripción                       |
|--------|------------------------|-----------------------------------|
| GET    | `/api/products/`       | Lista todos los productos         |
| GET    | `/api/products/:pid`   | Devuelve un producto por su ID    |
| POST   | `/api/products/`       | Agrega un nuevo producto          |
| PUT    | `/api/products/:pid`   | Actualiza un producto existente   |
| DELETE | `/api/products/:pid`   | Elimina un producto               |

### Carritos (`/api/carts/`)
| Método | Ruta                                           | Descripción                                     |
|--------|------------------------------------------------|-------------------------------------------------|
| POST   | `/api/carts/`                                  | Crea un nuevo carrito vacío                     |
| GET    | `/api/carts/:cid`                              | Devuelve el carrito por ID                      |
| POST   | `/api/carts/:cid/product/:pid`                 | Agrega un producto al carrito (o suma cantidad) |

---

## 🧪 Requisitos técnicos

- Node.js + Express
- Módulos ES (con `"type": "module"` en `package.json`)
- Persistencia en archivos locales (`products.json` y `carts.json`)
- Routers organizados por recurso (products y carts)

---

## 📝 Notas

- Los IDs de productos y carritos se autogeneran y no se repiten.
- Los archivos `products.json` y `carts.json` actúan como base de datos.
- La API puede probarse con Postman, Insomnia u otra herramienta similar.
- **No incluir `node_modules` en el repositorio** (`.gitignore` ya configurado).

---

## 🔗 Autor

Will Descarrega – [@tu-usuario](https://github.com/Will-lab-code)