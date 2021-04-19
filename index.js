//variables y declaraciones de variables
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const path = require("path");
//configuracion del server
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
 app.use(bodyParser.json());
//conexion a la base de datos
const db_name = path.join(__dirname, "data", "restaurant.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Conexion exitosa base restaurant.db");
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Creacion de la tabla comidaCategoria(id, nombre)
const sql_create = `CREATE TABLE IF NOT EXISTS comidaCategoria(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL
);`;
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("tabla de categoria de comida creada exitosamente");

// Semilla para la base de datos de comidaCategoria
  const sql_insert = `INSERT INTO comidaCategoria (id, nombre) VALUES
  (1, 'china'),
  (2, 'mexicana'),
  (3, 'indu');`;
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Creacion de categorias");
  });
});
//creacion de tabla de restaurante
  const sql_create_restaurant = `CREATE TABLE IF NOT EXISTS restaurant(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(250) NOT NULL,
    descripcion TEXT,
    logo VARCHAR(250) NOT NULL,
    rating FLOAT NOT NULL
  );`;
  db.run(sql_create_restaurant, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("tabla de restaurante creada exitosamente");
    //semillas para restaurantes
    const sql_insertr = `INSERT INTO restaurant (id, nombre,descripcion,logo,rating) VALUES
    (1, 'Cocina Rosa','cocina tipica mexicana','logo1.png',0.0),
    (2, 'tajmahal','cocina tipica indu','logo2.png',0.0),
    (3, 'linling','cocina tipica china','logo3.png',0.0);`;
    db.run(sql_insertr, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Creacion de restaurantes");
    });
});

//creacion de tabla intermedia mucho a muchos resturantes y categorias
  const sql_create_restaurant_categoria = `CREATE TABLE IF NOT EXISTS restaurant_categorias(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_restaurant INTEGER,
    id_categoria INTEGER,
    FOREIGN KEY(id_restaurant) REFERENCES restaurant(id),
    FOREIGN KEY(id_categoria) REFERENCES comidaCategoria(id)
  );`;
  db.run(sql_create_restaurant_categoria, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("tabla de restaurante categoria creada exitosamente");
    //semillas para restaurantes
    const sql_insertcr = `INSERT INTO restaurant_categorias(id, id_restaurant,id_categoria) VALUES
    (1,1,2),
    (2,1,1),
    (3,2,3),
    (4,3,1);`;
    db.run(sql_insertcr, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Creacion de categorias y restaurantes");
    });
});

//creacion de la base de datos de resenias
const sql_create_resenias = `CREATE TABLE IF NOT EXISTS resenias(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_restaurant INTEGER,
  email VARCHAR(250) NOT NULL,
  coments TEXT,
  rating INTEGER,
  Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_restaurant) REFERENCES restaurant(id)
);`;
db.run(sql_create_resenias, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("tabla de resenias creada exitosamente");
  //semillas para resenia
  const sql_insertre = `INSERT INTO resenias(id, id_restaurant,email,coments,rating) VALUES
  (1,1,'test@gmail.com','Prueba prueba prueba',1),
  (2,1,'test@gmail.com','Prueba prueba prueba',1),
  (3,2,'test@gmail.com','Prueba prueba prueba',1),
  (4,3,'test@gmail.com','Prueba prueba prueba',1);`;
  db.run(sql_insertre, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Creacion de reseniuas");
  });
});


//server levantado en el puierto 3000
app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
app.get("/", (req, res) => {
  res.send ("Prueba de server activo...");
});


//Listado de restaurantes
app.get("/getRestaurantes", async (req, res) => {
  var   sql =  "SELECT * FROM restaurant ";
  const json = await dball(sql);
   for (const cat in json) {
     //Se obtienen las categorias
     sql = "SELECT comidaCategoria.nombre FROM restaurant_categorias JOIN comidaCategoria ON restaurant_categorias.id_categoria = comidaCategoria.id where restaurant_categorias.id_restaurant = "+ json[cat].id;
     json[cat].tiposComida = await dball(sql);
     //se obtiene las resenias
     sql = "SELECT * FROM resenias where id_restaurant = "+ json[cat].id;
     json[cat].resenias = await dball(sql);
   }
  res.json(json);
});

//funcion para obtener data de forma asyncrona
async function dball(query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

//funcion para crear y oobtener id
async function addrun(query,data){
    return new Promise(function(resolve,reject){
        db.run(query,data, function(err,rows){
           if(err){return reject(err);}
           resolve(this.lastID);
         });
    });
}

//eliminar restaurante
app.post("/deleteRestaurant", async (req, res) => {
  const id = req.body.id;
  let sql = "DELETE FROM resenias WHERE id_restaurant = ?";
  let statement = db.prepare(sql);
  statement.run(id, function (err) {
      if (err) throw err;
  });
  sql = "DELETE FROM restaurant_categorias WHERE id_restaurant = ?";
  statement = db.prepare(sql);
  statement.run(id, function (err) {
      if (err) throw err;
  });
   sql = "DELETE FROM restaurant WHERE id = ?";
  statement = db.prepare(sql);
  statement.run(id, function (err) {
      if (err) throw err;
  });
res.json({exito:'restaurante eliminado'});
});

//edicion  de restaurantes
app.post("/editarRestaurant", async (req, res) => {
  //UPDATE comidaCategoria SET nombre = ? WHERE (id = ?)
  let sql = "UPDATE restaurant SET nombre = ? , descripcion = ? , logo = ? WHERE (id = ?)";
  let restaurant = [req.body.nombre,req.body.descripcion,req.body.logo,req.body.id];
  let statement = db.prepare(sql);
  statement.run(restaurant, function (err) {
      if (err) throw err;
  });
  sql = "DELETE FROM restaurant_categorias WHERE id_restaurant = ?";
  statement = db.prepare(sql);
  statement.run(req.body.id, function (err) {
      if (err) throw err;
  });
  sql = "INSERT INTO restaurant_categorias(id_restaurant,id_categoria) VALUES (?,?)";
  statement = db.prepare(sql);
  let catrest;
  //creacion de categorias y restaurantes
  let categorias = req.body.categorias;
  for(const n in categorias){
    catrest = [req.body.id,categorias[n]];
    statement.run(catrest, function (err) {
        if (err) throw err;
    });
  }
      res.json({exito:'restaurante cambiado'});
});



//creacion  de restaurantes
app.post("/crearRestaurant", async (req, res) => {
  //creacion del restaurante y se oobtiene el id
  let sql = "INSERT INTO restaurant ( nombre,descripcion,logo,rating) VALUES (?,?,?,?)";
  let restaurant = [req.body.nombre,req.body.descripcion,req.body.logo,1];
  let id = await addrun(sql,restaurant);
  let id_cat_res, catrest;
  sql = "INSERT INTO restaurant_categorias(id_restaurant,id_categoria) VALUES (?,?)";
  let statement = db.prepare(sql);
  //creacion de categorias y restaurantes
  let categorias = req.body.categorias;
  for(const n in categorias){
    catrest = [id,categorias[n]];
    statement.run(catrest, function (err) {
        if (err) throw err;
    });
  }
    res.json({exito:'restaurnate creado'});
});


//creacion de resenia
app.post("/crearResenia", (req, res) => {
  const sql = "INSERT INTO resenias(id_restaurant,email,coments,rating) VALUES (?,?,?,?)";
  const resenia = [req.body.id_restaurant,req.body.email,req.body.coments,req.body.rating];
    db.run(sql, resenia, err => {
      if (err) {
        return console.error(err.message);
      }
      res.json({exito:'resenia registrada exitosamente'});
    });
  });


//listado de categorias
app.get("/getCategorias", (req, res) => {
  const sql = "SELECT * FROM comidaCategoria";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

// crear categorias
app.post("/crearCategoria", (req, res) => {
  const sql = "INSERT INTO comidaCategoria(nombre) VALUES (?)";
  const categoria = [req.body.nombre];
    db.run(sql, categoria, err => {
      if (err) {
        return console.error(err.message);
      }
      res.json({exito:'categoria registrada exitosamente'});
    });
  });


  // categoria data edit
  app.get("/editCategoria/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM comidaCategoria WHERE id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(row);
    });
  });

// Editar categoria
app.post("/updateCategoria/:id", (req, res) => {
  const id = req.params.id;
  const categoria = [req.body.nombre , id];
  const sql = "UPDATE comidaCategoria SET nombre = ? WHERE (id = ?)";
  db.run(sql, categoria, err => {
    if (err) {
      return console.error(err.message);
    }
    res.json({exito:'categoria cambiado exitosamente'});
  });
});

//eliminar categoria
app.post("/deleteCategoria", (req, res) => {
  const id = req.body.id;
  const sql = "DELETE FROM comidaCategoria WHERE id = ?";
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message);
    }
      res.json({exito:'categoria borrada exitosamente'});
  });
});
