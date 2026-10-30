import {pool} from "./db.ts";
type Status = "Applied" | "Interview" | "Offer" | "Rejected";
interface Application{
    company:string;
    role:string;
    status:Status;
    salary:number |null;
    id:number;
}


async function addApplication(company :string ,role : string ,userId: number) : Promise<void> 
{
    const result = await pool.query<Application>
    ("INSERT INTO applications (user_id, company, role) VALUES($1,$2,$3)",
        [userId,company,role]
    );
    
    if(result.rowCount===0)
    {
        console.log(`Failed to Add!`);
    }
}
async function updateStatus(newStatus:Status,id:number) : Promise<void>
{
    const result = await pool.query
    ("UPDATE applications SET status=$1 WHERE id=$2",
        [newStatus,id],
    );
    if(result.rowCount===0)
    {
        console.log(`${id} not found !`);
    }
    
}


async function countByStatus(status:Status) : Promise<number>
{
    const result = await pool.query
    ("SElECT Count(*) FROM applications WHERE status = $1",
        [status]
    );
   return Number(result.rows[0].count);
}


async function printAll() : Promise<void>
{
    const result =await pool.query<Application>
    ("SELECT * FROM applications ORDER BY id ASC");
    for(const app of result.rows)
    {
        
        console.log(` (${app.id})${app.company} - ${app.role} (${app.status}) - ${app.salary ?? " no salary"}`);
    }
}


await printAll();
console.log(await countByStatus("Applied"));
console.log("Yes");
await pool.end();