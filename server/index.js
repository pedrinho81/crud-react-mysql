const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

// conexão com db

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pedro2030@",
    database:"crudgames"
});

app.use(cors())
app.use(express.json())

//ADICIONANDO DADOS NO DB
app.post("/register", (req, res) => {
    const { name } = req.body
    const { cost } = req.body
    const { category } = req.body
    const { url } = req.body

    let SQL = "INSERT INTO games ( name, cost, category, url ) VALUES ( ?,?,?,? )";
        db.query(SQL, [name, cost, category, url], (err, result) => {
            if(err) console.log(err)
                else  res.send(result);
        });
    });


app.get("/getCards", (req, res) => {
    let SQL = "SELECT * FROM games";
       
        db.query(SQL, (err, result) => {
            if(err) console.log(err)
                else  res.send(result)
        }) 
    })

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { url } = req.body;

    SQL = "UPDATE games SET name = ?, cost = ?, category = ?, url = ? WHERE id = ?";

           db.query(SQL,[name, cost, category, url, id],(err,result) => {
           if(err) console.log(err)
                else res.send(result) 
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM games WHERE id = ?";
    db.query(SQL, id, (err, result) => {
      if(err) console.log(err);
        else res.send(result);
    });
  });

app.listen(3001, () => {
    console.log("SERVIDOR RODANDO NA PORTA 3001")
}) 