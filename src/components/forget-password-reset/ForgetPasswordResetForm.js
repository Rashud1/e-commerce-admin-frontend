import { useState } from 'react'
import { Alert, Form, ListGroup, Spinner, Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword } from '../../pages/admin-auth-slice/userAction'

const initialPassword = {
    otp: "",
    password: "1Aa#5678",
    confirmPassword: "1Aa#5678",
}
const passErrorInitial = {
    isMatched: false,
    isLengthy: false,
    hasLowerCase: false,
    hasUppperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
}


export const ForgetPasswordResetForm = () =>{
    const dispatch = useDispatch()
    const[updatePass,  setUpdatePass] = useState(initialPassword)
    const[passError,  setPassError] = useState(passErrorInitial)

    const{  isPending, passwordResettingEmail, resetPasswordRequestResponse} = useSelector(state=> state.user)

    const handleOnSubmit = e =>{
        e.preventDefault();
        const {otp, password} = updatePass;
        const passObj = {
            otp,
            email: passwordResettingEmail,
            password,
          }
      
          dispatch(resetPassword(passObj))

        
    }
  


const handleOnChange = e =>{
    const {name, value} = e.target
    
    //validation testing
    
    
    let isMatched = false
    if(name === "password"){
        setPassError({
            ...passError,
            isMatched: updatePass.confirmPassword === value
        })
    }
   
   if(name === "confirmPassword"){
            isMatched = updatePass.password === value
    const isLengthy = value.length >= 8
    const hasLowerCase = /[a-z]/.test(value)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!, @, #, $, %, ^, &, *, (, ), _ ]/.test(value)
    
    setPassError({
        ...passError,
        isMatched,
           isLengthy,
           hasLowerCase,
           hasUpperCase,
           hasNumber,
           hasSpecialChar,
       })
    }
       setUpdatePass({
           ...updatePass,
           [name]: value,


       })
    }
return (
    <div>
    <Card className="p-3 reg-form">
        <h3 className="text-center py-2">Reset Passowrd</h3>
        {isPending && <Spinner variant="primary" animation="border" />}
        {resetPasswordRequestResponse.message && (
        <Alert variant = {resetPasswordRequestResponse.status === "success" ? "success" : "danger"}
        >
        {resetPasswordRequestResponse.message}
        </Alert>
)}
        
        <Form className="mt-3" onSubmit={handleOnSubmit}>
           <Form.Group className="mb-3">
             <Form.Label>Otp</Form.Label>
            <Form.Control name="otp" placeholder="Enter Otp" 
            required
            value={updatePass.otp}
            onChange={handleOnChange}
            minLength= "6"
             />
              </Form.Group>

             <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
               <Form.Control name="password" type="password"placeholder="secret" 
               required 
               value={updatePass.password}
               onChange={handleOnChange}
               minLength="8"
               />
               </Form.Group>
             

<Form.Group className="mb-3">
<Form.Label>Confirm Password *</Form.Label>
<Form.Control 
name="confirmPassword" 
type="password" 
onChange={handleOnChange}
value={updatePass.confirmPassword}
required />
{/* {passwordError && <Alert variant="danger">{passworderror}</Alert>} */}
</Form.Group>

<ListGroup>
<ListGroup.Item variant={passError.isMatched ? "success" : "danger"}>password match</ListGroup.Item>
  <ListGroup.Item variant={passError.isLengthy ? "success" : "danger"}>must be atleast 8 characters</ListGroup.Item>
  <ListGroup.Item  variant={passError.hasNumber ? "success" : "danger"}>must include number</ListGroup.Item>
  <ListGroup.Item variant={passError.hasUpperCase ? "success" : "danger"}>must include upper case</ListGroup.Item>
  <ListGroup.Item variant={passError.hasLowerCase ? "success" : "danger"}>must include lower case</ListGroup.Item>
  <ListGroup.Item variant={passError.hasSpecialChar ? "success" : "danger"}>must include one of the following special character i.e !@#$$%%</ListGroup.Item>
</ListGroup>

<div className="d-grid gap-2">

<Button variant="warning" type="submit" size="lg" disabled={Object.values(passError).includes(false)}>Reset Password</Button></div>
</Form>
</Card>
</div>

    )  
        }
 


               
        
