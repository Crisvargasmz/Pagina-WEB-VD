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
CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario)
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

-- CONSULTAS SQL

-- Mostrar Tablas Pruevas

SELECT * FROM Productos;
SELECT * FROM Categorias;
SELECT * FROM Marcas;
SELECT * FROM Usuarios;
SELECT * FROM Comentarios;
SELECT * FROM Compras;
SELECT * FROM Detalle_Compra;

-- Insertar Categorias
INSERT INTO Categorias (nombre_Categoria) VALUES ('Salsa');

-- Actualizar Categorias

UPDATE Categorias SET nombre_Categoria='Ranchitas' WHERE  id_Categoria=1;

-- Eliminar Categorias 

DELETE FROM Categorias WHERE id_Categoria=1;

-- Insertar Marcas

INSERT INTO Marcas (nombre_Marca) VALUES ('Natura');

-- Actualizar Marcas

UPDATE Marcas SET nombre_Marca='Mcgregor' WHERE id_Marca=1;d

-- Eliminar Marca

DELETE FROM Marcas WHERE id_Marca=1;

-- Insertar Usuarios

INSERT INTO Usuarios (nombre_Usuario,correo_Electronico,contrasena) VALUES ('Cristhian1320','cristhianvargas12@gmail.com','cris2004@');

-- Actualizar Usuarios 

UPDATE Usuarios SET nombre_Usuario='Marcosdiaz2030',correo_Electronico='marcodiaz253@gmail.com',contrasena='null2030' WHERE id_Usuario=1;

-- Eliminar Usuarios

DELETE FROM Usuarios WHERE id_Usuario=1;

-- Insertar Comentarios

INSERT INTO Comentarios (calificacion,fecha_Comentario,contenido_Comentario,id_Usuario) VALUES (5,'2023-09-14','Ese producto me parece perfecto me gusta
se los recomiendo me ha favorecido en muchas cosas y lo mejor es de calidad',1);

-- Actualizar Comentarios

UPDATE Comentarios SET calificacion='5',fecha_Comentario='2023-05-31',contenido_Comentario='DDDDD',id_Usuario=1 WHERE id_Comentario=1;

-- Eliminar Comentarios

DELETE FROM Comentarios WHERE id_Comentario=1;

-- Insertar Compras

INSERT INTO Compras (fecha_Compra,hora_Compra,estado,fecha_Estimada) VALUES ('2023-05-09',STR_TO_DATE('02:30 PM', '%h:%i %p'),'Entregado','2023-05-10');

-- Actualizar Compras 

UPDATE Compras SET fecha_Compra='2024-09-24',hora_Compra='13:20:00',estado='En proceso', fecha_Estimada='2024-09-12' WHERE id_Compra=1;

-- Eliminar Compras

DELETE FROM Compras WHERE id_Compra=1;

-- Insertar Detalle_Compra

INSERT INTO Detalle_Compra (cantidad_Compra,precio_Compra,id_Producto,id_Compra) VALUES (50,2500,1,1);

-- Actualizar Detalle_Compra 

UPDATE Detalle_Compra SET cantidad_Compra='20', precio_Compra=2300,id_Producto=1,id_Comprlima=1 WHERE id_Detallecompra=1;

-- Eliminar Detalle_Compra

DELETE FROM Detalle_Compra WHERE id_Detallecompra=1;

-- Insertar Productos

INSERT INTO Productos (nombre_Producto, presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria) VALUES ('Salsa de tomate', 
'Grande','asdfasdf','Salsa de tomate 50mg',50,100,1,1);

-- Procedimientos Almacenados

-- Procedimiento Almacenado de INSERTAR

-- INSERTAR CATEGORIAS

DELIMITER //

CREATE PROCEDURE InsertarCategorias(
IN c_nombre_Categoria VARCHAR (25)
)
BEGIN
INSERT INTO Categorias (nombre_Categoria) VALUES (c_nombre_Categoria);
END //

DELIMITER ;

-- INSERTAR Marcas

DELIMITER //

CREATE PROCEDURE InsertarMarcas(
IN m_nombre_Marca VARCHAR (25)
)
BEGIN
INSERT INTO Marcas (nombre_Marca) VALUES (c_nombre_Marca);
END //

DELIMITER ;

-- INSERTAR PRODUCTOS

DELIMITER //

CREATE PROCEDURE InsertarProductos(
    IN p_nombre_Producto VARCHAR(25),
    IN p_presentacion VARCHAR(25),
    IN p_imagen VARCHAR(50),
    IN p_descripcion VARCHAR(250),
    IN p_precio DECIMAL(12, 4),
    IN p_cantidad INT,
    IN p_id_Marca INT,
    IN p_id_Categoria INT
)
BEGIN
    INSERT INTO Productos (nombre_Producto, presentacion, imagen, descripcion, precio, cantidad, id_Marca, id_Categoria)
    VALUES (p_nombre_Producto, p_presentacion, p_imagen, p_descripcion, p_precio, p_cantidad, p_id_Marca, p_id_Categoria);
END //

DELIMITER ;

-- INSERTAR COMENTARIOS 

DELIMITER //

CREATE PROCEDURE InsertarComentarios(
    IN c_calificacion INT,
    IN c_fecha_Comentario DATE,
    IN c_contenido_Comentario VARCHAR(250),
    IN c_id_Usuario INT

)
BEGIN
    INSERT INTO Comentarios (calificacion,fecha_Comentario,contenido_Comentario,id_Usuario)
    VALUES (c_calificacion,c_fecha_Comentario,c_contenido_Comentario,c_id_Usuario);
END //

DELIMITER ;

-- INSERTAR COMPRAS

DELIMITER //

CREATE PROCEDURE InsertarCompras(
    IN c_fecha_Compra DATE,
    IN c_hora_Compra TIME,
    IN c_estado VARCHAR(15),
    IN c_fecha_Estimada date

)
BEGIN
    INSERT INTO Compras (fecha_Compra,hora_compra,estado, fecha_Estimada)
    VALUES (c_fecha_Compra,c_hora_Compra,c_estado,c_fecha_Estimada);
END //

DELIMITER ;

-- INSERTAR DETALLE

DELIMITER //

CREATE PROCEDURE InsertarDetalleCompra(
    IN dc_producto INT,
    IN dc_compra INT,
    IN dc_cantidad_Compra INT,
    IN dc_precio_Compra DECIMAL(12,4)

)
BEGIN
    INSERT INTO detalle_compra (producto,compra,cantidad_Compra, precio_Compra)
    VALUES (dc_producto,dc_compra,dc_cantidad_Compra,dc_precio_Compra);
END //

DELIMITER ;

-- INSERTAR LAS DOS TABLAS EN UN SOLO PROCEDIMIENTO

DELIMITER //

CREATE PROCEDURE InsertarCompraCompleta(
    IN c_fecha_Compra DATE,
    IN c_hora_Compra TIME,
    IN c_estado VARCHAR(15),
    IN c_fecha_Estimada DATE,
    IN dc_producto INT,
    IN dc_cantidad_Compra INT,
    IN dc_precio_Compra DECIMAL(12,4)
)
BEGIN
    DECLARE compra_id INT;

    -- Insertar en la tabla Compras
    INSERT INTO Compras (fecha_Compra, hora_compra, estado, fecha_Estimada)
    VALUES (c_fecha_Compra, c_hora_Compra, c_estado, c_fecha_Estimada);

    -- Obtener el ID de la compra insertada
    SET compra_id = LAST_INSERT_ID();

    -- Insertar en la tabla DetalleCompra
    INSERT INTO DetalleCompra (producto, compra, cantidad_Compra, precio_Compra)
    VALUES (dc_producto, compra_id, dc_cantidad_Compra, dc_precio_Compra);
END //

DELIMITER ;

-- INSERTAR USUARIOS

DELIMITER //

CREATE PROCEDURE InsertarUsuarios(
    IN c_nombre_Usuario VARCHAR(25),
    IN c_correo_Electronico VARCHAR(25),
    IN c_contraseña VARCHAR(15)

)
BEGIN
    INSERT INTO Compras (nombre_Usuario, correo_Electronico, contraseña)
    VALUES (c_nombre_Usuario,c_correo_Electronico,c_contraseña);
END //

DELIMITER ;

-- PROCEDIMIENTOS ACTUALIZAR


-- ACTUALIZAR CATEGORIA

DELIMITER //

CREATE PROCEDURE ActualizarCategorias(
    IN c_id_Categoria INT,
    IN c_nombre_Categoria VARCHAR(25)
)
BEGIN
    UPDATE Categorias
    SET nombre_Categoria = c_nombre_Categoria
    WHERE id_Categoria = c_id_Categoria;
END //

DELIMITER ;


-- ACTUALIZAR MARCA

DELIMITER //

CREATE PROCEDURE ActualizarMarcas(
    IN m_id_Marca INT,
    IN m_nombre_Marca VARCHAR(25)
)
BEGIN
    UPDATE Marcas
    SET nombre_Marca = m_nombre_Marca
    WHERE id_Marca = m_id_Marca;
END //

DELIMITER ;

-- ACTUALIZAR PRODUCTOS

DELIMITER //

CREATE PROCEDURE ActualizarProductos(
    IN p_id_Producto INT,
    IN p_nombre_Producto VARCHAR(25),
    IN p_presentacion VARCHAR(25),
    IN p_imagen VARCHAR(50),
    IN p_descripcion VARCHAR(250),
    IN p_precio DECIMAL(12, 4),
    IN p_cantidad INT,
    IN p_id_Marca INT,
    IN p_id_Categoria INT
)
BEGIN
    UPDATE Productos
    SET
        nombre_Producto = p_nombre_Producto,
        presentacion = p_presentacion,
        imagen = p_imagen,
        descripcion = p_descripcion,
        precio = p_precio,
        cantidad = p_cantidad,
        id_Marca = p_id_Marca,
        id_Categoria = p_id_Categoria
    WHERE id_Producto = p_id_Producto;
END //

DELIMITER ;

-- ACTUALIZAR COMENTARIOS

DELIMITER //

CREATE PROCEDURE ActualizarComentarios(
    IN c_id_Comentario INT,
    IN c_calificacion INT,
    IN c_fecha_Comentario DATE,
    IN c_contenido_Comentario VARCHAR(250),
    IN c_id_Usuario INT
)
BEGIN
    UPDATE Comentarios
    SET
        calificacion = c_calificacion,
        fecha_Comentario = c_fecha_Comentario,
        contenido_Comentario = c_contenido_Comentario,
        id_Usuario = c_id_Usuario
    WHERE id_Comentario = c_id_Comentario;
END //

DELIMITER ;

-- ACTUALIZAR USUARIO

DELIMITER //

CREATE PROCEDURE ActualizarUsuario(
    IN au_id_Usuario INT,
    IN au_nombre_Usuario VARCHAR(25),
    IN au_correo_Electronico VARCHAR(25),
    IN au_contraseña VARCHAR(15)
)
BEGIN
    UPDATE Usuarios
    SET
        nombre_Usuario = au_nombre_Usuario,
        correo_Electronico = au_correo_Electronico,
        contraseña = au_contraseña
    WHERE id_Usuario = au_id_Usuario;
END //

DELIMITER ;



-- ACTUALIZAR DETALLECOMPRA

DELIMITER //

CREATE PROCEDURE ActualizarCompraCompleta(
    IN ac_compra_id INT,
    IN ac_fecha_Compra DATE,
    IN ac_hora_Compra TIME,
    IN ac_estado VARCHAR(15),
    IN ac_fecha_Estimada DATE,
    IN ac_dc_cantidad_Compra INT,
    IN ac_dc_precio_Compra DECIMAL(12, 4)
)
BEGIN
    -- Actualizar la tabla Compras
    UPDATE Compras
    SET
        fecha_Compra = ac_fecha_Compra,
        hora_compra = ac_hora_Compra,
        estado = ac_estado,
        fecha_Estimada = ac_fecha_Estimada
    WHERE id_Compra = ac_compra_id;

    -- Actualizar la tabla DetalleCompra
    UPDATE DetalleCompra
    SET
        cantidad_Compra = ac_dc_cantidad_Compra,
        precio_Compra = ac_dc_precio_Compra
    WHERE id_Detallecompra = ac_compra_id; 
END //

DELIMITER ;

-- PROCEDIMIENTOS ALMACENADO ELIMINAR 

-- ELIMINAR CATEGORIA

DELIMITER //

CREATE PROCEDURE EliminarCategoriaPorID(
    IN ec_id_Categoria INT
)
BEGIN
    DELETE FROM Categorias WHERE id_Categoria = ec_id_Categoria;
END //

DELIMITER ;

-- ELIMINAR MARCA

DELIMITER //

CREATE PROCEDURE EliminarMarcaPorID(
    IN em_id_Marca INT
)
BEGIN
    DELETE FROM Marcas WHERE id_Marca = em_id_Marca;
END //

DELIMITER ;

-- ELIMINAR PRODUCTO 

DELIMITER //

CREATE PROCEDURE EliminarProductoPorID(
    IN ep_id_Producto INT
)
BEGIN
    DELETE FROM Productos WHERE id_Producto = ep_id_Producto;
END //

DELIMITER ;


-- ELIMINAR COMENTARIO

DELIMITER //

CREATE PROCEDURE EliminarComentarioPorID(
    IN ec_id_Comentario INT
)
BEGIN
    DELETE FROM Comentarios WHERE id_Comentario = ec_id_Comentario;
END //

DELIMITER ;


-- ELIMINAR USUARIO

DELIMITER //

CREATE PROCEDURE EliminarUsuarioPorID(
    IN eu_id_Usuario INT
)
BEGIN
    DELETE FROM Usuarios WHERE id_Usuario = eu_id_Usuario;
END //

DELIMITER ;


-- ELIMINAR DETALLECOMPRA 

DELIMITER //

CREATE PROCEDURE EliminarCompraCompleta(
    IN ec_compra_id INT
)
BEGIN
    -- Eliminar el registro de la tabla DetalleCompra
    DELETE FROM DetalleCompra WHERE compra = ec_compra_id; 

    -- Eliminar el registro de la tabla Compras
    DELETE FROM Compras WHERE id_Compra = ec_compra_id;
END //

DELIMITER ;

-- Triggers

-- Trigger Registro cambios

DELIMITER //
CREATE TRIGGER Registro_Cambios_Producto
AFTER UPDATE ON Productos
FOR EACH ROW
BEGIN
    INSERT INTO Cambio_Productos (id_Producto, cambio, fecha_cambio)
    VALUES (OLD.id_Producto, 'Actualización de datos', NOW());
END;
//
DELIMITER ;

-- Trigger Registro nuevos comentarios

DELIMITER //
CREATE TRIGGER Registro_nuevo_comentario
AFTER INSERT ON Comentarios
FOR EACH ROW
BEGIN
    INSERT INTO Registro_Comentarios (id_Comentario, id_Usuario, fecha_Comentario)
    VALUES (NEW.id_Comentario, NEW.id_Usuario, NEW.fecha_Comentario);
END;
//
DELIMITER ;

-- Registro de compras completadas

DELIMITER //
CREATE TRIGGER Compras_completadas
AFTER INSERT ON Compras
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Completada' THEN
        INSERT INTO Registro_Compras (id_Compra, fecha_Compra, hora_Compra)
        VALUES (NEW.id_Compra, NEW.fecha_Compra, NEW.hora_Compra);
    END IF;
END;
//
DELIMITER ;























