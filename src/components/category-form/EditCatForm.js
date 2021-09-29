import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import  {ModalBox} from "../modal-box/Modalbox";
import {onCategorySelect, catRespResest} from "../../pages/category/categoryslice"

import { Alert, Col, Form, Row, Spinner, Button } from "react-bootstrap";
import { updateCat } from "../../pages/category/categoryAction";


const initialState = {
  name: "",
  parentCat: null,
  _id:""
};


export const EditCatForm = () => {
    const dispatch = useDispatch();
    const[cat, setCat] = useState(initialState);
    const { isLoading, categoryResponse, categories, show, selectedCategory } = 
    useSelector(state =>state.category);

    console.log(selectedCategory);

    useEffect(() => {
      setCat({
        name: selectedCategory?.name,
        parentCat: null,
        _id: selectedCategory._id,
      })
    }, [selectedCategory]);
    
    const onHide = () => {
       dispatch(onCategorySelect());
       dispatch(catRespResest());

    };

    const handleOnChange = e =>{
      const {name, value} = e.target;
      setCat({
          ...cat,
          [name]: value,
      })
  };
  const handleOnSubmit = e =>{
    e.preventDefault();
    

    if(!cat.name){
      return alert("Please enter the category name")
    }
    
     dispatch(updateCat(cat));
};

    const parentCat = categories.filter(row => !row.parentCat);
    return (
        <div>
            <ModalBox show={show} onHide={onHide} title ="Edit Category">
              <div>


              
    
          {
            isLoading && <Spinner variant="primary" animation="border" />
          }
          {
            categoryResponse?.message && <Alert variant={categoryResponse?.status === "success" ? "success" : "danger"} 
            >{categoryResponse?.message}</Alert>
          }
           <Form onSubmit={handleOnSubmit}>
  <Row>
    <Col>
      <Form.Control 
      name="name"
      value={cat.name}
      onChange={handleOnChange} placeholder="Category name" />
    </Col>
    <Col>
    <Form.Select 
    name="parentCat"
    on Change={handleOnChange} aria-label="Default select example">
  <option value="">select Parent Category</option>
  {parentCat?.length && parentCat.map(row =><option key={row._id} value={row._id}>{row.name}</option>)}

</Form.Select>
    </Col>
    <Col>
      <Button type="submit">Update Category</Button>
    </Col>
  </Row>
</Form>
 
        </div>
    );
          
            </ModalBox>
        </div>
    );
};
