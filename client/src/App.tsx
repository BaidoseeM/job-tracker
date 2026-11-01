import { useState, useEffect } from "react";

interface Application
{
  id :  number ,
  company : string , 
  status : string, 
}

interface CardProps
{
  company : string , 
  status : string ,
  onDelete : ()=> void,
  onStatusChange: (newStatus: string) => void,
}

function ApplicationCard({company,status,onDelete,onStatusChange}:CardProps)
{
return(
  <div>
    <p> 
      {company}-{status}
      <button onClick={onDelete}>Delete</button>
      <select value={status} onChange={(e)=> onStatusChange(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
      </select>
    </p>
  </div>
);
}

function App()
{

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
        role:"Developer",
      }),
    });

    const data=await result.json();
    setApplications([...applications,data]);
    setCompany("");
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

  async function updateStatus(id:number,newStatus:string)
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

  return (
    
      <div>
        <h1>
          My Applications
        </h1>
        <p>
          Hi {name} you have {applications.length} Applications!
        </p>

        <div>
          {applications.map((app)=> <ApplicationCard key={app.id} company={app.company} status={app.status} onDelete={()=> deleteApplication(app.id)} onStatusChange={(status)=> updateStatus(app.id,status)}/>)}
        </div>

        <div>

          <input value={company} onChange={(e)=> setCompany(e.target.value)}/>

          <button onClick={addApplication}>
          Add application
          </button>
        </div>

      </div>

    
  );
}
export default App;