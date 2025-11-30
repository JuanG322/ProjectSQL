const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,              // Agregar puerto explícitamente
  user: 'root',
  password: 'sql123',
  database: 'inventario_almacen'
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
    console.error('Detalles del error:', err);
    return;
  }
  console.log('✅ Conectado a MySQL exitosamente');
});

module.exports = connection;