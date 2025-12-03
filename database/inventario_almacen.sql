CREATE DATABASE IF NOT EXISTS inventario_almacen;
USE inventario_almacen;

CREATE TABLE Tipo_Producto (
                               ID_Tipo_Producto INT AUTO_INCREMENT PRIMARY KEY,
                               Descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE Talla (
                       ID_Talla INT AUTO_INCREMENT PRIMARY KEY,
                       Descripcion_Talla VARCHAR(10) NOT NULL
);

CREATE TABLE Color (
                       ID_Color INT AUTO_INCREMENT PRIMARY KEY,
                       Nombre_Color VARCHAR(30) NOT NULL
);

CREATE TABLE Producto (
                          ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
                          Nombre VARCHAR(100) NOT NULL,
                          ID_Tipo_Producto INT NOT NULL,
                          ID_Talla INT NOT NULL,
                          ID_Color INT NOT NULL,
                          Precio DECIMAL(10, 2) NOT NULL,
                          Cantidad_Stock INT NOT NULL DEFAULT 0,
                          FOREIGN KEY (ID_Tipo_Producto) REFERENCES Tipo_Producto(ID_Tipo_Producto),
                          FOREIGN KEY (ID_Talla) REFERENCES Talla(ID_Talla),
                          FOREIGN KEY (ID_Color) REFERENCES Color(ID_Color)
);

CREATE TABLE Proveedor (
                           ID_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
                           Nombre VARCHAR(100) NOT NULL,
                           Telefono VARCHAR(20),
                           Correo VARCHAR(100)
);

CREATE TABLE Producto_Proveedor (
                                    ID_Producto INT,
                                    ID_Proveedor INT,
                                    PRIMARY KEY (ID_Producto, ID_Proveedor),
                                    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto),
                                    FOREIGN KEY (ID_Proveedor) REFERENCES Proveedor(ID_Proveedor)
);

CREATE TABLE Cliente (
                         ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
                         Nombre VARCHAR(100) NOT NULL,
                         Direccion VARCHAR(200) NOT NULL,
                         Telefono VARCHAR(20),
                         Correo VARCHAR(100)
);

CREATE TABLE Venta (
                       ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
                       Fecha_Venta DATETIME DEFAULT CURRENT_TIMESTAMP,
                       ID_Cliente INT NOT NULL,
                       FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

CREATE TABLE Detalle_Venta (
                               ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
                               ID_Venta INT NOT NULL,
                               ID_Producto INT NOT NULL,
                               Cantidad_Vendida INT NOT NULL,
                               Precio_Unitario DECIMAL(10, 2) NOT NULL,
                               Total_Detalle DECIMAL(10, 2) NOT NULL,
                               FOREIGN KEY (ID_Venta) REFERENCES Venta(ID_Venta),
                               FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

INSERT INTO Tipo_Producto (Descripcion) VALUES
                                            ('Chaqueta'),
                                            ('Pantalón'),
                                            ('Camiseta'),
                                            ('Zapato');

INSERT INTO Talla (Descripcion_Talla) VALUES
                                          ('XS'),
                                          ('S'),
                                          ('M'),
                                          ('L'),
                                          ('XL'),
                                          ('XXL');

INSERT INTO Color (Nombre_Color) VALUES
                                     ('Negro'),
                                     ('Blanco'),
                                     ('Azul'),
                                     ('Rojo'),
                                     ('Verde'),
                                     ('Gris'),
                                     ('Amarillo'),
                                     ('Café');