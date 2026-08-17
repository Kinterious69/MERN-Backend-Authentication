
import Home from "./components/Home"
import SignUp from "./pages/SignUp"
import { Routes,Route } from "react-router-dom"
import VerifyEmail from "./pages/VerifyEmail"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./routeGaurds/ProtectedRoute"


function App() {
    
 

  return (
    <div >
       
     
      
 
      
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/verifyEmail" element={<ProtectedRoute ><VerifyEmail/></ProtectedRoute>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
       
        
        
      


      </Routes>
    
  
    </div>
 
  )
}

export default App
