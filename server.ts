import express from "express";
import { pool } from "./db.ts";
 import cors from "cors";

const VALID_STATUSES = ["Applied", "Interview", "Offer", "Rejected"];


const app = express();
 app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from my server!");
});

app.get("/applications", async (req, res) => {
  const result = await pool.query("SELECT * FROM applications ORDER BY id");
  res.json(result.rows);
});


app.post("/applications", async (req, res) => {
  const { userId, company, role } = req.body; // not null values in database
  if(!userId || !company || !role)
  {
    res.status(400).json({error : "There appears to be some missing information"});
    return ;
  }
  try{
  const result = await pool.query(
    "INSERT INTO applications (user_id, company, role) VALUES ($1, $2, $3) RETURNING *",
    [userId, company, role]
  );
  res.status(201).json(result.rows[0]);
}
  catch(err:any)
  {
    if(err.code==="23503"){
      res.status(400).json({ error: "User not found" });
      return;
    }
    console.error(err);
    res.status(500).json({error:"Something went wrong "});
  }
});



app.patch("/applications/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
  res.status(400).json({ error: "Invalid id" });
  return;
}

  const { status } = req.body;

  if(!VALID_STATUSES.includes(status))
  {
    res.status(400).json({error : "Invalid status"});
    return;
  }

  const result = await pool.query(
    "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json(result.rows[0]);

});

app.delete("/applications/:id",async (req,res) =>{
  const id=Number(req.params.id);
  if (!Number.isInteger(id)) {
  res.status(400).json({ error: "Invalid id" });
  return;
}
  const result =await pool.query("DELETE FROM applications WHERE id=$1",[id]);
  if(result.rowCount===0)
  {
    res.status(404).json({error : "Failed to Delete"});
    return;
  }
  res.status(204).send();
}
);

app.get("/applications/:id",async (req,res)=>{
  const id=Number(req.params.id);
  if (!Number.isInteger(id)) {
  res.status(400).json({ error: "Invalid id" });
  return;
}
  const result= await pool.query("SELECT * FROM applications WHERE id=$1",[id]);
  if(result.rowCount===0)
  {
    res.status(404).json({error : "NO application with this id"});
    return;
  }
  res.status(200).json(result.rows[0]);
})


app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});