const applications=[];
function addApplication(company,role)
{
    const app=
    {
        company:company,
        role:role,
        status:"Applied"
    };
    applications.push(app);
}
function updateStatus(company,newStatus)
{
    const changeApp=applications.find((app) => app.company===company);
    changeApp.status=newStatus;
}
function printAll()
{
    for( const app of applications)
    {
        console.log(`${app.company} - ${app.role} (${app.status})`);
    }
}

function countByStatus(status)
{
    const filteredStatuses=applications.filter((app)=> app.status===status);
    return filteredStatuses.length;
}

addApplication("Google","Junior Dev");
addApplication("Amazon","senior SWE");
addApplication("Apple","Student SWE");

updateStatus("Google","Interview");
printAll();
console.log(countByStatus("Applied"));
 
console.log("-----------------------------------");

