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
}

function ApplicationCard({company,status,onDelete}:CardProps)
{
return(
  <div>
    <p> 
      {company}-{status}
      <button onClick={onDelete}>Delete</button>
    </p>
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
          {applications.map((app)=> <ApplicationCard key={app.id} company={app.company} status={app.status} onDelete={()=> deleteApplication(app.id)}/>)}
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