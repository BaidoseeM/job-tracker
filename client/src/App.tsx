import { useState } from "react"

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

  const [applications,setApplications]=useState<Application[]>
  ([
  { id: 1, company: "Google", status: "Applied" },
  { id: 2, company: "Wix", status: "Interview" },
  { id: 3, company: "Monday", status: "Offer" }
  ]);

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