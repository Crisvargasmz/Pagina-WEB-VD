CREATE DATABASE VariedadesDuarte;
USE VariedadesDuarte;

CREATE TABLE Categorias(
id_Categoria INT AUTO_INCREMENT PRIMARY KEY,
nombre_Categoria VARCHAR (25)
);

CREATE TABLE Marcas(
id_Marca INT AUTO_INCREMENT PRIMARY KEY,
nombre_Marca VARCHAR (25)
);

CREATE TABLE Productos  (
id_Producto INT AUTO_INCREMENT PRIMARY KEY,
nombre_Producto VARCHAR (25) NOT NULL,
presentacion VARCHAR (25) NULL,
imagen VARCHAR (50) NOT NULL,
descripcion VARCHAR (250) NULL,
precio DECIMAL (12.4) NOT NULL,
cantidad INT NOT NULL,
id_Marca INT,
CONSTRAINT FK_Producto_Marca FOREIGN KEY (id_Marca) REFERENCES Marcas(id_Marca),
id_Categoria INT,
CONSTRAINT FK_Producto_Categoria FOREIGN KEY (id_Categoria) REFERENCES Categorias(id_Categoria) 
);

CREATE TABLE Usuarios(
id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre_Usuario VARCHAR(25),
correo_Electronico VARCHAR (150),
contrasena VARCHAR (15)
);

CREATE TABLE Comentarios(
id_Comentario INT AUTO_INCREMENT PRIMARY KEY,
calificacion INT,
fecha_Comentario DATE,
contenido_Comentario VARCHAR (250),
id_Usuario INT,
CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario),
id_Producto INT,
CONSTRAINT FK_Comentario_Producto FOREIGN KEY (id_Producto) REFERENCES Productos(id_Producto)
);

CREATE TABLE Compras(
id_Compra INT AUTO_INCREMENT PRIMARY KEY,
fecha_Compra DATE,
hora_Compra TIME,
estado VARCHAR(15),
fecha_Estimada DATE
);

CREATE TABLE Detalle_Compra(
id_Detallecompra INT AUTO_INCREMENT PRIMARY KEY,
cantidad_Compra INT,
precio_Compra DECIMAL (12.4),
id_Producto INT,
CONSTRAINT FK_DetalleCompra_Producto FOREIGN KEY (id_Producto) REFERENCES Productos(id_Producto),
id_Compra INT,
CONSTRAINT FK_DetalleCompra_Compras FOREIGN KEY (id_Compra) REFERENCES Compras(id_Compra)
);

CREATE TABLE Sesion_Administrador(
usuario VARCHAR (25),
contrasena VARCHAR(15)
);
