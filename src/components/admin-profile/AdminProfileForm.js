
import React, {useState, useEffect} from 'react';
import { Form, InputGroup, Spinner, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { updateProfileUser } from "../../pages/admin-auth-slice/userAction";

const initialprofileState = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",

};
export const AdminProfileForm = () =>{
    const dispatch = useDispatch()
const [adminProfile, setAdminProfile] = useState(initialprofileState);

const{userInfo, isPending} = useSelector(state=> state.user);

useEffect(() => {
  setAdminProfile(userInfo);
    
}, [userInfo]);


const handleOnSubmit = e =>{
    e.preventDefault();


const {email, phone, address} = adminProfile

if(userInfo.email !== email || userInfo.phone !== phone || userInfo.address !== address)
{
    if(window.confirm("Are you sure you want to update the profile info?")){
        console.log("TO DO call api to update the user");

        const update = {
            email, phone, address
        }

        dispatch(updateProfileUser(update))
    }
    return; 
}
alert("No information is changed")
};

const handleOnChange = e =>{
const {name, value} = e.target

setAdminProfile({
    ...userInfo,
    [name]: value,
})
}



    return (
    <div className="admin-profile-page">
        <hr />

        {isPending && <Spinner variant="primary" animation="border" />}
   
    {/* <Card className="p-3 reg-form">
    <h2>Register new admin user</h2>
    <hr /> */}
   

    <Form action="/" className="mt-3" onSubmit={handleOnSubmit}>
<Form.Group className="mb-3">
<Form.Label>First Name *</Form.Label>
<Form.Control name="fname" 

// onChange={handleOnChange}
placeholder="Sam" 
required
value={adminProfile.fname}
disabled
readOnly
 />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Last Name *</Form.Label>
<Form.Control name="lname" 
// onChange={handleOnChange}
placeholder="Smith" 
required 
value={adminProfile.lname}
disabled
readOnly
/>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Email</Form.Label>
<Form.Control name="email" 
type="email" 
onChange={handleOnChange}
placeholder="youremail@email.com" 
required
value={adminProfile.email}
 />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Password *</Form.Label>
<Form.Control name="password" type="password"
onChange={handleOnChange}
minLength="8"
placeholder="secret" required />
</Form.Group>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>DOB</Form.Label>
<Form.Control name="dob" 
// onChange={handleOnChange}
type="date" 
value={adminProfile?.dob.substr(0, 10)}
disabled = {!adminProfile.dob}/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Phone</Form.Label>
<Form.Control name="phone" 
onChange={handleOnChange}
placeholder="045xxxxxxx" 
value={adminProfile.phone} />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Address</Form.Label>
<Form.Control name="address" 
onChange={handleOnChange}
placeholder="i.e. 3 george street,NSW,2210" 
value={adminProfile.address}/>
</Form.Group>
<Form.Group className="mb-3" >
<Form.Label>Gender</Form.Label>
<InputGroup>
<InputGroup.Radio name="gender" onChange={handleOnChange} checked={adminProfile.gender === "male"} aria-label="Male" defaultValue="male" disabled/>
Male
<InputGroup.Radio name="gender" onChange={handleOnChange} checked={adminProfile.gender === "female"} aria-label="Female" className="ml-3" defaultValue="female" disabled/>
Female

</InputGroup>
</Form.Group>

<div className="d-grid gap-2">

<Button type="submit" variant="success" size="lg">Update Profile </Button>
</div>

</Form>
{/* </Card> */}
</div>
  );
}


export const AdminPasswordResetForm = () =>{
    const dispatch = useDispatch()
    const{adminProfile, isPending} = useSelector(state=> state.user)

    const handleOnSubmit = e =>{
        e.preventDefault()
    }
    
    const handleOnChange = e =>{
    const {name, value} = e.target
    }
    
    return (
    <div>
<Form onSubmit ={handleOnSubmit}>
<Form.Group className="mb-3">
<Form.Label>Password *</Form.Label>
<Form.Control 
name="password" 
type="password"
onChange={handleOnChange}
minLength="8"
placeholder="secret" 
required />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Confirm Password *</Form.Label>
<Form.Control 
name="confirmPassword" 
type="password" 
onChange={handleOnChange}
required />
{/* {passwordError && <Alert variant="danger">{passworderror}</Alert>} */}
</Form.Group>
<div className="d-grid gap-2">

<Button variant="warning" type="submit">Update Password</Button></div>
</Form>


    </div>
    )   
};