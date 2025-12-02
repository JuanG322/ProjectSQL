const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sql123',
  database: 'inventario_almacen'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    console.error('Detalles del error:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;