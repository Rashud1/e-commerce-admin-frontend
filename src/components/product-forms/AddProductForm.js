import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Spinner, Form, Button, Alert } from "react-bootstrap";
import { fetchCat } from "../../pages/category/categoryAction";
import { addProductAction } from "../../pages/product/productAction";
const initialState=
    {
         status:"",
        title: "",
        price: 0,
       salePrice:0,
        saleStartDate: "",
        saleEndDate: "",
        brand:"",
        qty : 50,
        description:"",
        category: [],
    }

export const AddProductForm = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(initialState)
    const [images, setImages] = useState([])
    const {categories} = useSelector(state => state.category)
    const {isPending, productResponse} = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCat)
    }, [dispatch])

    const handleOnChange = e =>{
const {checked ,name, value} = e.target
console.log(checked ,name, value)
if(name === "status"){
    setProduct({
        ...product,
        status:checked,
    })
    return
}
if(name === "category"){
    setProduct({
        ...product,
        category: [...product.category, value],
    });
    return
}
    
    setProduct({
        ...product,
        [name]: value,
    });
  }

   const handleOnImageSelect =(e)=>{
       const { files} = e.target
       setImages(files)


   }


    const handleOnSubmit = e =>{
        e.preventDeafault();
        console.log(images)
        //combine the form data and teh image data
        const formData= new FormData()
        
        for (const key in product){
            console.log(key, product[key])
            formData.append(key, product[key])
        }

        console.log([...images])
          
        images.length && [...images].map(img =>formData.append(images, img))


            console.log(formData)

        dispatch(addProductAction(formData))
       

    }


    return (
        <div>
            {
            isPending && <Spinner variant="primary" animation="border" />
          }
          {
            productResponse?.message && 
            <Alert variant={productResponse?.status === "success" ? "success" : "danger"} 
            >
                {productResponse?.message}</Alert>
          }
            <Form onSubmit={handleOnSubmit}>
  <Form.Group className= "mb-3">          
  <Form.Check 
  name="status"
    type="switch"
    id="custom-switch"
    label="Status"
    onChange={handleOnChange}
    required
  />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Title*</Form.Label>
    <Form.Control  placeholder="product name" 
    onChange={handleOnChange}
    required/>
    
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Price*</Form.Label>
    <Form.Control type="number" placeholder="50" 
    onChange={handleOnChange}
    required/>
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Sale Price</Form.Label>
    <Form.Control name="salePrice" type="number" placeholder="50" 
    onChange={handleOnChange}/>
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Sale starts date</Form.Label>
    <Form.Control name="saleStartDate" type="date" placeholder="50"
    onChange={handleOnChange} />
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Sale end date</Form.Label>
    <Form.Control name="saleEndDate" type="date" placeholder="50" 
    onChange={handleOnChange}/>
  </Form.Group>


  <Form.Group>
    <Form.Label>Qty</Form.Label>
    <Form.Control name="qty" type="nunmber" 
    onChange={handleOnChange}/>
 </Form.Group>



  <Form.Group>
    <Form.Label>Select categories</Form.Label>
 

<Form.Select 
    name="category"
    on Change={handleOnChange} multiple aria-label="Default select example">

  <option value="">select Category</option>
  {categories?.length && categories.map (row => <option key= {row._id} value={row._id}>{row.name}</option> )}
</Form.Select>
</Form.Group>


 <Form.Group>
    <Form.Label>Brand</Form.Label>
    <Form.Control name="brand" type="date" placeholder="Nike" />
  </Form.Group>


 <Form.Group>
    <Form.Label>Description</Form.Label>
    <Form.Control name="description" />
  </Form.Group>



 {/* {/*image uploadre} */}

 <Form.Group className="mb-3">
    <Form.Label>Upload Images</Form.Label>
    <Form.Control
    name="images"  
    type="file"
    onChange={handleOnImageSelect}
    required
    multiple
    accept="image/*"
    />
    </Form.Group>




  <Button variant="primary" type="submit">
    Add Product
  </Button>
</Form>
            
        </div>
    )
    
}
