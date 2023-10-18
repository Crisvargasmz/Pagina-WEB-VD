USE  variedadesduarte;

CREATE TABLE bitacora(
id_bitacora INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
transaccion VARCHAR (10) NOT NULL,
usuario VARCHAR (40) NOT NULL,
fecha DATETIME NOT NULL,
tabla VARCHAR (20) NOT NULL

);

DELIMITER //

-- Categorias --
CREATE TRIGGER AuditInsertCategorias
AFTER INSERT ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'categorias');
//

CREATE TRIGGER AuditUpdateCategorias
AFTER UPDATE ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'categorias');
//

CREATE TRIGGER AuditDeleteCategorias
AFTER DELETE ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'categorias');
//


-- Comentarios --
CREATE TRIGGER AuditInsertComentarios
AFTER INSERT ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'comentarios');
//

CREATE TRIGGER AuditUpdateComentarios
AFTER UPDATE ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'comentarios');
//

CREATE TRIGGER AuditDeleteComentarios
AFTER DELETE ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'comentarios');
//


-- Compras --
CREATE TRIGGER AuditInsertCompras
AFTER INSERT ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'compras');
//

CREATE TRIGGER AuditUpdateCompras
AFTER UPDATE ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'compras');
//

CREATE TRIGGER AuditDeleteCompras
AFTER DELETE ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'compras');
//


-- Detalle Compra --
CREATE TRIGGER AuditInsertDetalleCompra
AFTER INSERT ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'detalle_compra');
//

CREATE TRIGGER AuditUpdateDetalleCompra
AFTER UPDATE ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'detalle_compra');
//

CREATE TRIGGER AuditDeleteDetalleCompra
AFTER DELETE ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'detalle_compra');
//


-- Marcas --
CREATE TRIGGER AuditInsertMarcas
AFTER INSERT ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'marcas');
//

CREATE TRIGGER AuditUpdateMarcas
AFTER UPDATE ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'marcas');
//

CREATE TRIGGER AuditDeleteMarcas
AFTER DELETE ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'marcas');
//


-- Productos --
CREATE TRIGGER AuditInsertProductos
AFTER INSERT ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'productos');
//

CREATE TRIGGER AuditUpdateProductos
AFTER UPDATE ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'productos');
//

CREATE TRIGGER AuditDeleteProductos
AFTER DELETE ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'productos');
//


-- Sesion Administrador --
CREATE TRIGGER AuditInsertSesionAdministrador
AFTER INSERT ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'sesion_administrador');
//

CREATE TRIGGER AuditUpdateSesionAdministrador
AFTER UPDATE ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'sesion_administrador');
//

CREATE TRIGGER AuditDeleteSesionAdministrador
AFTER DELETE ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'sesion_administrador');
//


-- Usuarios --
CREATE TRIGGER AuditInsertUsuarios
AFTER INSERT ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', USER(), NOW(), 'usuarios');
//

CREATE TRIGGER AuditUpdateUsuarios
AFTER UPDATE ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', USER(), NOW(), 'usuarios');
//

CREATE TRIGGER AuditDeleteUsuarios
AFTER DELETE ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', USER(), NOW(), 'usuarios');
//

DELIMITER ;


