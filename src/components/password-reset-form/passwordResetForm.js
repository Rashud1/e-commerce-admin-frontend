import React, { useState, useEffect } from "react";
import { Card, Form, Button, Spinner, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
// import { useHistory, useLocation } from "react-router-dom";
// import {switchLoginResetPassForm} from '../../pages/admin-auth-slice/userSlice'
import { requestPassResetOtp } from "../../pages/admin-auth-slice/userAction";






const PasswordResetForm = () => {
  // const history = useHistory();
  // const location = useLocation();
  const dispatch = useDispatch();
 
  const { isPending, resetPasswordRequestResponse} = useSelector(state => state.user);

  const [email, setEmail] = useState("")
  


  
  useEffect(()=>{

  }, []);

  const handleOnChange = e =>{
    const {value} = e.target;
    setEmail(
     value,
    );

  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if(!email){
      return alert("email required")
    }
    
    
    dispatch(requestPassResetOtp(email))
   
    

  };
 
return (
    
    <Card className="p-3 reg-form">
        <h2>Reset Passowrd</h2>
        {isPending && <Spinner variant="primary" animation="border" />}
        {resetPasswordRequestResponse.message && (
        <Alert variant = {resetPasswordRequestResponse.status === "success" ? "success" : "danger"}
        >
        
      
    
        
        {resetPasswordRequestResponse.message}
        </Alert>
)}
        <hr />
        
        <Form className="mt-3" onSubmit={handleOnSubmit}>
           <Form.Group className="mb-3">
             <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="youremail@email.com" 
            required
            value={email}
            onChange={handleOnChange}
             />
              </Form.Group>
             {/* <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
               <Form.Control name="password" type="password"placeholder="secret" 
               required 
               value={loginInfo.email}
               onChange={handleOnChange}
               />
               </Form.Group> */}


               <Button type="submit"> Request OTP </Button>

               <a href="/registration">Register now</a>
       </Form>
       <div className = "mt-3 text-end"> 
     <a href ="/">Login Now</a>
    
     </div>
   </Card>
   
   );
};

export default PasswordResetForm;




