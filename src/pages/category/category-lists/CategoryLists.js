import React, {useEffect} from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCat, deleteCat } from "../../../pages/category/categoryAction";
import { onCategorySelect } from '../categoryslice';
import { EditCatForm } from "../../../components/category-form/EditCatForm";
    

export const CategoryList = () =>{
    const dispatch = useDispatch();

    const { categories } = useSelector(state => state.category);

    useEffect(() => {
    dispatch(fetchCat());

    // return () => categoryResponse.status && dispatch(catRespReset(0));
 }, [dispatch]);

 const handleOnEdit = cat => {
     dispatch(onCategorySelect(cat));
   
 };
 

 //parent cat only
 const parentCat = categories.filter(row => !row.parentCat);

 //child cat only
 const handleOnDelete = _id => {

    if(!window.confirm("Are you sure you want to delete this category")){
        return;

    }
    const hasChildCategory = childCat.filter(item => item.parentCat === _id)

    if (hasChildCategory.length){
        return alert("This Category has child categories, please re-allocate child category to another parent category before deleting this category");
    }
    dispatch(deleteCat(_id))
};

 const childCat = categories.filter(row => !row.parentCat);

 return (
     <div>
         <EditCatForm/>
         <ListGroup>
         {
                 parentCat?.length && parentCat.map((row, i)=> { 
                 return <div>
                     <ListGroup.Item key={row._id} className="d-flex justify-content-between">
                         <span>{row.name}</span>
                     <span className="ml-5">
                     <Button 
                     onClick={handleOnEdit(row)}
                     variant="primary">Edit</Button>{" "}
                     <Button variant="danger" onClick ={() => handleOnDelete(row._id)}>Delete</Button>
                     </span>w._
                     </ListGroup.Item>
                     {childCat.map(item => 
                     item.parentCat === row._id ? 
                         <ListGroup.Item 
                         key={item._id} className="d-flex justify-content-between">
                             <span>
                                 { " ===> " }
                                 {item.name}
                                 </span>
                              {" ==> "} {item.name}
                              <span className="ml-5">
                     <Button
                      onClick={handleOnEdit(item)}
                       variant="primary">Edit</Button>{" "}
                     <Button variant="danger" onClick ={() =>dispatch(deleteCat(item._id))}>Delete</Button>
                     </span>
                      </ListGroup.Item> : null
                         )}
                 </div> 
             })}
             
       
        
        
         </ListGroup>
            
         
     </div>

 );
            };
 
           