import { useState, useEffect } from "react";
import "./App.css";
type Status = "Applied" | "Interview" | "Offer" | "Rejected";

interface Application
{
  id :  number ,
  company : string , 
  status : Status, 
  role :string , 
}

interface CardProps
{
  company : string , 
  status : Status ,
  role : string , 
  onDelete : ()=> void,
  onStatusChange: (newStatus: Status) => void,
}

function ApplicationCard({company,status,role,onDelete,onStatusChange}:CardProps)
{
return(
  <div className="card"> 
        <span>
           {company} - <span className={`badge ${status}`} > {status}</span> - {role}
        </span>

        <div className="card-actions">
              <button  className="delete-btn" onClick={onDelete}>Delete</button>
              <select value={status} onChange={(e)=> onStatusChange(e.target.value as Status)}>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
              </select>
         </div>
  </div>
);
}

function App()
{
  const name : string = "Mahmoud";

  const [applications,setApplications]=useState<Application[]>([]); //empty applications at first 
 // useEffect is only when the page loads (fetch data using GET)
  useEffect(() => {
    async function load()
    {
      const result= await fetch("http://localhost:3000/applications");
      const data= await result.json();
      setApplications(data);
    }
    load();
  },[])

  async function addApplication()
  {
    const result = await fetch("http://localhost:3000/applications" , {
      method:"POST",
      headers:{ "Content-Type": "application/json"},
      body : JSON.stringify({
        userId:1,
        company:company,
        role:role,
      }),
    });
   
    if (!result.ok) {
  alert("Please fill in company and role");
  return;
    }

    const data=await result.json();
    setApplications([...applications,data]);
    setCompany("");
    setRole("");
  }

  async function deleteApplication(id : number)
  {
    const result =await fetch ("http://localhost:3000/applications/"+id ,{
      method : "DELETE",
    });
    if(!result.ok)
    {
      alert("Failed to delete application");
      return;
    }

    setApplications(applications.filter((app)=> app.id!==id));
  }

  async function updateStatus(id:number,newStatus:Status)
  {
    const result= await fetch("http://localhost:3000/applications/"+id ,{
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        status:newStatus,
      }),
    });

    if(!result.ok)
    {
      alert("Failed to edit status!");
      return;
    }
    // the condition means get all the applications and when u see one 
    //that matches app.id===id 'replace' it with a new object that has the same values but different status else return the same application
    setApplications(applications.map((app)=> app.id===id ? {...app,status:newStatus}: app))

  }


const [company,setCompany]= useState("");
const [role,setRole]= useState("");

  return (
    
      <div className="container">
        <h1>
          My Applications
        </h1>
        <p>
          Hi {name} you have {applications.length} Applications!
        </p>

        <div>
          {applications.map((app)=> <ApplicationCard key={app.id} company={app.company} status={app.status} role={app.role} onDelete={()=> deleteApplication(app.id)} onStatusChange={(status)=> updateStatus(app.id,status)}/>)}
        </div>

        <div className="form">
          <input value={company}  placeholder="Company" onChange={(e)=> setCompany(e.target.value)}/>
          <input value={role} placeholder="Role" onChange={(e)=>setRole(e.target.value)}/>
          <button onClick={addApplication}>
          Add application
          </button>
        </div>

      </div>

    
  );
}
export default App;