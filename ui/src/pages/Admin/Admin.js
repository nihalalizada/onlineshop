import React from 'react';
import AdminConsole from "../../components/AdminConsole/AdminConsole";
import AdminPrompt from "../../components/AdminPrompt/AdminPrompt";
function AdminPage(){
    const [isAdmin, setIsAdmin] = React.useState(false);

    return(
        isAdmin ? 
        <AdminConsole />:
        <AdminPrompt setIsAdmin={setIsAdmin} />
     

    )
}

export default AdminPage;