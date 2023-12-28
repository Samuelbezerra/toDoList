const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/todos", async (req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0])
    } catch(err) {
        console.log(err.message);
    }
});

app.get("/todos", async (req,res)=>{
    try {
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    }catch(err){
        console.log(err.message);
        
    }
});

app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const toDo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(toDo.rows[0])
    }catch(err){
        console.log(err.message);
        
    }
})

app.put("/todos/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        res.json("todo updated!");
    } catch(err){
        console.log(err.message);
    }
});

app.delete("/todos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("Todo was deleted")
    } catch(err) {
        console.log(err.message);
    }
})

app.listen(5000, ()=>{
    console.log("Server has started in port 5000");
})