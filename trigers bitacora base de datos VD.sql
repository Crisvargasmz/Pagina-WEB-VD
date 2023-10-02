USE  variedadesduarte;

CREATE TABLE bitacora(
id_bitacora INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
transaccion VARCHAR (10) NOT NULL,
usuario VARCHAR (40) NOT NULL,
fecha DATETIME NOT NULL,
tabla VARCHAR (20) NOT NULL

);

-- INSERTS --
CREATE TRIGGER InsertCategorias
AFTER INSERT ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'categorias');

CREATE TRIGGER InsertComentarios
AFTER INSERT ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'comentarios');

CREATE TRIGGER InsertCompras
AFTER INSERT ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'compras');

CREATE TRIGGER InsertDetalleCompra
AFTER INSERT ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'detalle_compra');

CREATE TRIGGER InsertMarcas
AFTER INSERT ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'marcas');

CREATE TRIGGER InsertProducto
AFTER INSERT ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'productos');

CREATE TRIGGER InsertSesionAdministrador
AFTER INSERT ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'sesion_administrador');

CREATE TRIGGER InsertUsuarios
AFTER INSERT ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('INSERT',current_user(),NOW(),'usuarios');

-- UPDATES--

CREATE TRIGGER UpdateCategorias
AFTER INSERT ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'categorias');

CREATE TRIGGER UpdateComentarios
AFTER INSERT ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'comentarios');

CREATE TRIGGER UpdateCompras
AFTER INSERT ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'compras');

CREATE TRIGGER UpdateDetalleCompra
AFTER INSERT ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'detalle_compra');

CREATE TRIGGER UpdateMarcas
AFTER INSERT ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'marcas');

CREATE TRIGGER UpdateProducto
AFTER INSERT ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'productos');

CREATE TRIGGER UpdateSesionAdministrador
AFTER INSERT ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'sesion_administrador');

CREATE TRIGGER UpdateUsuarios
AFTER INSERT ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('UPDATE',current_user(),NOW(),'usuarios');

-- DELETES--

CREATE TRIGGER DeleteCategorias
AFTER INSERT ON categorias
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'categorias');

CREATE TRIGGER DeleteComentarios
AFTER INSERT ON comentarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'comentarios');

CREATE TRIGGER DeleteCompras
AFTER INSERT ON compras
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'compras');

CREATE TRIGGER DeleteDetalleCompra
AFTER INSERT ON detalle_compra
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'detalle_compraa');

CREATE TRIGGER DeleteMarcas
AFTER INSERT ON marcas
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'marcas');

CREATE TRIGGER Deleteproductos
AFTER INSERT ON productos
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'productos');

CREATE TRIGGER DeleteSesionAdministrador
AFTER INSERT ON sesion_administrador
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'sesion_administrador');

CREATE TRIGGER DeleteUsuarios
AFTER INSERT ON usuarios
FOR EACH ROW 
INSERT INTO bitacora (transaccion,usuario,fecha,tabla)
VALUES('DELETE',current_user(),NOW(),'usuarios');

