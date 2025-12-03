const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Productos

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    // Se hace un join
    const query = `
        SELECT p.*, tp.Descripcion as Tipo, t.Descripcion_Talla as Talla, c.Nombre_Color as Color
        FROM Producto p
                 JOIN Tipo_Producto tp ON p.ID_Tipo_Producto = tp.ID_Tipo_Producto
                 JOIN Talla t ON p.ID_Talla = t.ID_Talla
                 JOIN Color c ON p.ID_Color = c.ID_Color
    `;
// Ejecuta la consulta en SQL
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Compra de productos
app.post('/api/productos', (req, res) => {
    const { nombre, tipo, talla, color, precio, cantidad, id_proveedor } = req.body;

    // Se insertar el producto (? es un placeholder)
    const queryProducto = 'INSERT INTO Producto (Nombre, ID_Tipo_Producto, ID_Talla, ID_Color, Precio, Cantidad_Stock) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(queryProducto, [nombre, tipo, talla, color, precio, cantidad], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const idProducto = result.insertId;

        // Luego insertar la relación con el proveedor
        const queryRelacion = 'INSERT INTO Producto_Proveedor (ID_Producto, ID_Proveedor) VALUES (?, ?)';

        db.query(queryRelacion, [idProducto, id_proveedor], (err2) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }
            // El mensaje de agregado con exito
            /* res.status(201).json({
                 message: 'Producto y proveedor asociados exitosamente',
                 id: idProducto
             });*/
        });
    });
});

// Actualizar producto
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, talla, color, precio, cantidad } = req.body;

    const query = 'UPDATE Producto SET Nombre=?, ID_Tipo_Producto=?, ID_Talla=?, ID_Color=?, Precio=?, Cantidad_Stock=? WHERE ID_Producto=?';

    db.query(query, [nombre, tipo, talla, color, precio, cantidad, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //res.json({ message: 'Producto actualizado exitosamente' });
    });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Producto WHERE ID_Producto=?';

    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    });
});

// Clientes

// Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
    const query = 'SELECT * FROM Cliente';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear cliente
app.post('/api/clientes', (req, res) => {
    const { nombre, direccion, telefono, correo } = req.body;

    const query = 'INSERT INTO Cliente (Nombre, Direccion, Telefono, Correo) VALUES (?, ?, ?, ?)';

    db.query(query, [nombre, direccion, telefono, correo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            //message: 'Cliente creado exitosamente',
            id: result.insertId
        });
    });
});

// Actualizar cliente
app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, correo } = req.body;

    const query = 'UPDATE Cliente SET Nombre=?, Direccion=?, Telefono=?, Correo=? WHERE ID_Cliente=?';

    db.query(query, [nombre, direccion, telefono, correo, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //res.json({ message: 'Cliente actualizado exitosamente' });
    });
});

// Eliminar cliente
app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Cliente WHERE ID_Cliente=?';

    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //res.json({ message: 'Cliente eliminado exitosamente' });
    });
});

//Provedors

// Obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedor';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear proveedor
app.post('/api/proveedores', (req, res) => {
    const { nombre, telefono, correo } = req.body;

    const query = 'INSERT INTO Proveedor (Nombre, Telefono, Correo) VALUES (?, ?, ?)';

    db.query(query, [nombre, telefono, correo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            //message: 'Proveedor creado exitosamente',
            id: result.insertId
        });
    });
});

// Actualizar proveedor
app.put('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;

    const query = 'UPDATE Proveedor SET Nombre=?, Telefono=?, Correo=? WHERE ID_Proveedor=?';

    db.query(query, [nombre, telefono, correo, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //res.json({ message: 'Proveedor actualizado exitosamente' });
    });
});

// Eliminar proveedor
app.delete('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Proveedor WHERE ID_Proveedor=?';

    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //res.json({ message: 'Proveedor eliminado exitosamente' });
    });
});

// Ventas

// Obtener todas las ventas con detalles
app.get('/api/ventas', (req, res) => {
    const query = `
        SELECT v.ID_Venta, v.Fecha_Venta, c.Nombre as Cliente,
               p.Nombre as Producto, dv.Cantidad_Vendida, dv.Total_Detalle
        FROM Venta v
                 JOIN Cliente c ON v.ID_Cliente = c.ID_Cliente
                 JOIN Detalle_Venta dv ON v.ID_Venta = dv.ID_Venta
                 JOIN Producto p ON dv.ID_Producto = p.ID_Producto
        ORDER BY v.Fecha_Venta DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Registrar una venta
app.post('/api/ventas', (req, res) => {
    const { id_cliente, id_producto, cantidad } = req.body;

    // Primero verificar el stock disponible
    db.query('SELECT Cantidad_Stock, Precio FROM Producto WHERE ID_Producto = ?', [id_producto], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const stockDisponible = result[0].Cantidad_Stock;
        const precio = result[0].Precio;

        if (stockDisponible < cantidad) {
            return res.status(400).json({
                error: 'Stock insuficiente',
                disponible: stockDisponible
            });
        }

        // Crear la venta
        db.query('INSERT INTO Venta (ID_Cliente) VALUES (?)', [id_cliente], (err, ventaResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const idVenta = ventaResult.insertId;
            const total = precio * cantidad;

            // Crear el detalle de venta
            db.query(
                'INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad_Vendida, Precio_Unitario, Total_Detalle) VALUES (?, ?, ?, ?, ?)',
                [idVenta, id_producto, cantidad, precio, total],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    // Actualizar el stock del producto
                    db.query(
                        'UPDATE Producto SET Cantidad_Stock = Cantidad_Stock - ? WHERE ID_Producto = ?',
                        [cantidad, id_producto],
                        (err) => {
                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }

                            res.status(201).json({
                                //message: 'Venta registrada exitosamente',
                                id_venta: idVenta,
                                total: total
                            });
                        }
                    );
                }
            );
        });
    });
});

//Inventario

// Obtener inventario actual
app.get('/api/inventario', (req, res) => {
    const query = `
        SELECT p.ID_Producto, p.Nombre, tp.Descripcion as Tipo,
               t.Descripcion_Talla as Talla, c.Nombre_Color as Color,
               p.Cantidad_Stock /* <-- Se elimina la logica del CASE 'Estado' */
        FROM Producto p
                 JOIN Tipo_Producto tp ON p.ID_Tipo_Producto = tp.ID_Tipo_Producto
                 JOIN Talla t ON p.ID_Talla = t.ID_Talla
                 JOIN Color c ON p.ID_Color = c.ID_Color
        ORDER BY p.Cantidad_Stock ASC
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Opciones de los dropdowns

app.get('/api/tipos', (req, res) => {
    db.query('SELECT * FROM Tipo_Producto', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/tallas', (req, res) => {
    db.query('SELECT * FROM Talla', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/colores', (req, res) => {
    db.query('SELECT * FROM Color', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// INICIAR SERVIDOR

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api`);
});