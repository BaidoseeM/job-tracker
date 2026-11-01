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
}

function ApplicationCard({company,status}:CardProps)
{
return(
  <div>
    <p>{company}-{status}</p>
  </div>
);
}

function App()
{
  const name : string = "Mahmoud";

  const [applications,setApplications]=useState<Application[]>([]); //empty applications at first 
 
  useEffect(() => {
    async function load()
    {
      const result= await fetch("http://localhost:3000/applications");
      const data= await result.json();
      setApplications(data);
    }
    load();
  },[])


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
          {applications.map((app)=> <ApplicationCard key={app.id} company={app.company} status={app.status}/>)}
        </div>

        <div>

          <input value={company} onChange={(e)=> setCompany(e.target.value)}/>

          <button onClick={()=>{ setApplications([...applications,{id:applications.length+1,company:company,status:'Applied'}]); setCompany("")}}>
          Add application
          
          </button>
        </div>

      </div>

    
  );
}
export default App;