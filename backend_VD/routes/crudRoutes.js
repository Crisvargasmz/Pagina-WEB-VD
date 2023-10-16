const express = require('express');
const router = express.Router();

module.exports = (db) => {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 // Ruta para consultar Categoria

  router.get('/readcategoria', (req, res) => {

    const sql = 'SELECT * FROM Categorias';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });
  
  //Ruta para consultar comentarios

  router.get('/readcomentarios', (req, res) => {

    const sql = 'SELECT * FROM comentarios';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar compras

  router.get('/readcompras', (req, res) => {

    const sql = 'SELECT * FROM compras';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

    //Ruta para consultar Detalle compra

  router.get('/readDetalleCompras', (req, res) => {

    const sql = 'SELECT * FROM detalle_compra';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar marcas

  router.get('/readmarcas', (req, res) => {

    const sql = 'SELECT * FROM marcas';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar Producto

  router.get('/readproducto', (req, res) => {

    const sql = 'SELECT * FROM productos';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar sesion_administrador

  router.get('/readSesionAdministrador', (req, res) => {

    const sql = 'SELECT * FROM sesion_administrador';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar usuarios

  router.get('/readusuarios', (req, res) => {

    const sql = 'SELECT * FROM usuarios';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Ruta para insertar Categoria

  router.post('/createcategoria', (req, res) => {
    const { nombre_Categoria } = req.body;
  
    // Verifica si se proporcionó el nombre de la categoría
    if (!nombre_Categoria) {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }
  
    // Consulta SQL para insertar una nueva categoría
    const sql = 'INSERT INTO categorias (nombre_Categoria) VALUES (?)';
    const values = [nombre_Categoria];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar categoría:', err);
        res.status(500).json({ error: 'Error al insertar categoría' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'Categoría insertada con éxito' });
      }
    });
  });

  //Ruta para insertar comentarios

  router.post('/createcomentarios', (req, res) => {
    const { calificacion, fecha_comentario, contenido_comentario, id_usuario } = req.body;
  
    // Verifica si se proporcionó el nombre de la categoría
    if (!calificacion ||!fecha_comentario ||! contenido_comentario ||! id_usuario ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para insertar una nueva categoría
    const sql = 'INSERT INTO comentarios (calificacion, fecha_comentario, contenido_comentario, id_usuario) VALUES (?,?,?,?)';
    const values = [calificacion, fecha_comentario, contenido_comentario, id_usuario];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar comentario:', err);
        res.status(500).json({ error: 'Error al insertar comentarios' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'Comentario insertado con exito' });
      }
    });
  });

  //Ruta para insertar compras

// Definir la ruta para insertar compra y detalle
router.post('/createcompras', (req, res) => {
  const { fecha_compra, hora_compra, estado, fecha_estimada, cantidad_Compra, precio_Compra, id_Producto } = req.body;

  if (!fecha_compra || !hora_compra || !estado || !fecha_estimada || !cantidad_Compra || !precio_Compra || !id_Producto) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const compraSql = 'INSERT INTO compras (fecha_compra, hora_compra, estado, fecha_estimada) VALUES (?,?,?,?)';
  const compraValues = [fecha_compra, hora_compra, estado, fecha_estimada];

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      res.status(500).json({ error: 'Error al iniciar la transacción' });
      return;
    }

    db.query(compraSql, compraValues, (err, compraResult) => {
      if (err) {
        db.rollback(() => {
          console.error('Error al insertar compra:', err);
          res.status(500).json({ error: 'Error al insertar compra' });
        });
      } else {
        const idCompra = compraResult.insertId;

        const detalleCompraSql = 'INSERT INTO detalle_compra (cantidad_Compra, precio_Compra, id_Producto, id_Compra) VALUES (?,?,?,?)';
        const detalleCompraValues = [cantidad_Compra, precio_Compra, id_Producto, idCompra];

        db.query(detalleCompraSql, detalleCompraValues, (err, detalleCompraResult) => {
          if (err) {
            db.rollback(() => {
              console.error('Error al insertar detallecompra:', err);
              res.status(500).json({ error: 'Error al insertar detallecompra' });
            });
          } else {
            db.commit((err) => {
              if (err) {
                db.rollback(() => {
                  console.error('Error al confirmar la transacción:', err);
                  res.status(500).json({ error: 'Error al confirmar la transacción' });
                });
              } else {
                res.status(201).json({ message: 'Compra y detallecompra insertados con éxito' });
              }
            });
          }
        });
      }
    });
  });
});

  

  //Ruta para insertar Marca

  router.post('/createmarca', (req, res) => {
    const {nombre_Marca} = req.body
  
    // Verifica si se proporcionó el nombre de la categoría
    if (!nombre_Marca) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para insertar una nueva categoría
    const sql = 'INSERT INTO marcas (nombre_Marca) VALUES (?)';
    const values = [nombre_Marca];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar Marca:', err);
        res.status(500).json({ error: 'Error al insertar Marca' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'Marca insertada con éxito' });
      }
    });
  });

  // Ruta para insertar Producto

  router.post('/createproducto', (req, res) => {
    const {nombre_Producto,presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria} = req.body;
  
    // Verifica si se proporcionó el nombre de la categoría
    if (!nombre_Producto ||!presentacion ||!imagen ||!descripcion ||!precio ||!cantidad ||!id_Marca ||!id_Categoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para insertar una nueva categoría
    const sql = 'INSERT INTO productos (nombre_Producto,presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria) VALUES (?,?,?,?,?,?,?,?)';
    const values = [nombre_Producto,presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar producto:', err);
        res.status(500).json({ error: 'Error al insertar producto' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'producto insertado con éxito' });
      }
    });
  });


//Ruta para insertar Usuarios


router.post('/createusuarios', (req, res) => {
  const {nombre_Usuario,correo_Electronico,contrasena} = req.body

  // Verifica si se proporcionó el nombre de la categoría
  if (!nombre_Usuario,correo_Electronico,contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Consulta SQL para insertar una nueva categoría
  const sql = 'INSERT INTO usuarios (nombre_Usuario,correo_Electronico,contrasena) VALUES (?)';
  const values = [nombre_Usuario,correo_Electronico,contrasena];

  // Ejecuta la consulta SQL
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar Usuario:', err);
      res.status(500).json({ error: 'Error al insertar Usuario' });
    } else {
      // Devuelve una respuesta exitosa
      res.status(201).json({ message: 'usuario insertado con éxito' });
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Ruta para actualizar un registro existente por ID (categoria)
     

      router.put('/updatecategoria/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const { nombre_Categoria} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!nombre_Categoria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE categorias
        SET nombre_Categoria = ?
        WHERE id_Categoria = ?
      `;
  
      const values = [nombre_Categoria,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    //Ruta para actualizar un registro existente por ID(comentarios)

    router.put('/updatecomentarios/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {calificacion, fecha_comentario, contenido_comentario, id_usuario} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!calificacion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE comentarios
        SET calificacion = ?, fecha_comentario = ?, contenido_comentario = ?, id_usuario = ?
        WHERE id_Comentario = ?
      `;
  
      const values = [calificacion, fecha_comentario, contenido_comentario, id_usuario,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    //Ruta para actualizar un registro existente por ID (compra)

    router.put('/updatecompras/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {fecha_compra,hora_compra,estado,fecha_estimada} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!fecha_compra) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE compras
        SET fecha_compra,hora_compra,estado,fecha_estimada = ?,?,?,?
        WHERE id_Compra = ?
      `;
  
      const values = [fecha_compra,hora_compra,estado,fecha_estimada,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    //Ruta para actualizar un registro exitente por ID (Detalle_Compra)

    router.put('/updateDetalleCompra/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {cantidad_Compra, precio_Compra, id_Producto, id_Compra} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!cantidad_Compra) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE detalle_compra
        SET cantidad_Compra = ?, precio_Compra = ?, id_Producto = ?, id_Compra = ?
        WHERE id_Detallecompra = ?
      `;
  
      const values = [cantidad_Compra, precio_Compra, id_Producto, id_Compra,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    //Ruta para actualizar un registro existente por ID (Marca)

    router.put('/updatemarca/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {nombre_Marca} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!nombre_Marca) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE marcas
        SET nombre_Marca = ?
        WHERE id_Marca = ?
      `;
  
      const values = [nombre_Marca,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    // Ruta para actualizar un registro existente por ID (producto)

    router.put('/updateproducto/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {nombre_Producto,presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!nombre_Producto) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
  UPDATE productos
  SET nombre_Producto = ?, presentacion = ?, imagen = ?, descripcion = ?, precio = ?, cantidad = ?, id_Marca = ?, id_Categoria = ?
  WHERE id_Producto = ?
`;

  
      const values = [nombre_Producto,presentacion,imagen,descripcion,precio,cantidad,id_Marca,id_Categoria,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

        //Ruta para actualizar un registro existente por ID (Marca)

        router.put('/updateusuario/:id', (req, res) => {
          // Obtén el ID del registro a actualizar desde los parámetros de la URL
          const id = req.params.id;
      
          // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
          const {nombre_Usuario, correo_Electronico, contrasena} = req.body;
      
          // Verifica si se proporcionaron los datos necesarios
          if (!nombre_Usuario) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
          }
      
          // Realiza la consulta SQL para actualizar el registro por ID
          const sql = `
            UPDATE usuarios
            SET nombre_Usuario = ?, correo_Electronico = ?, contrasena = ?
            WHERE id_Usuario = ?
          `;
      
          const values = [nombre_Usuario, correo_Electronico, contrasena,id];
      
          // Ejecuta la consulta
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error('Error al actualizar el registro:', err);
              res.status(500).json({ error: 'Error al actualizar el registro' });
            } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Registro actualizado con éxito' });
            }
          });
        });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Ruta para eliminar un registro existente por ID (categoria)

  router.delete('/deletecategoria/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM categorias WHERE ID = ?';

    // Ejecuta la consulta
    db.query(sql, [id_Categoria], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  //Ruta para eliminar un registro existente por ID (comentarios)

  router.delete('/deletecomentarios/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM comentarios WHERE id_Comentario = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  //Ruta para eliminar un registro existente por ID (compras)

  router.delete('/deletecompras/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM compras WHERE id_Compra = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (Detalle_compra)
  
  router.delete('/deleteDetalleCompra/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM detalle_compra WHERE id_Detallecompra = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  //Ruta para eliminar un registro existente por ID (marcas)

  router.delete('/deletemarcas/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM marcas WHERE id_Marca = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (producto)
  
  router.delete('/deleteproducto/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM productos WHERE id_Producto = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });
    
    //Ruta para eliminar un registro existente por ID (Usuario)

    router.delete('/deleteusuario/:id', (req, res) => {
      // Obtén el ID del registro a eliminar desde los parámetros de la URL
      const id = req.params.id;
  
      // Realiza la consulta SQL para eliminar el registro por ID
      const sql = 'DELETE FROM usuarios WHERE id_Usuario = ?';
  
      // Ejecuta la consulta
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error al eliminar el registro:', err);
          res.status(500).json({ error: 'Error al eliminar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro eliminado con éxito' });
        }
      });
    });

    return router;
};

//Probar en la terminal para insertar un dato.
//curl -X POST -H "Content-Type: application/json" -d "{\"id\":51004,\"name\":\"Managua\",\"countrycode\":\"IDN\",\"district\":\"Distrito 9\",\"population\":1000000}" http://localhost:5000/crud/create


//Probar en la terminal para actualizar un registro existente.
//curl -X PUT -H "Content-Type: application/json" -d "{\"name\":\"NuevoNombre\",\"countrycode\":\"CO\",\"district\":\"NuevoDistrito\",\"population\":2000000}" http://localhost:5000/crud/update/51003

//Probar en la terminal para eliminar un registro, empleado un id existente.
//curl -X DELETE http://localhost:5000/crud/delete/51003



