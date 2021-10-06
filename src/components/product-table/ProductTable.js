
import {Table, Button} from "react-bootstrap"
import { fetchProduct } from "../../pages/product/productAction";

import { useSelector, useDispatch } from "react-redux";
import React, {useEffect} from 'react'


export const ProductTable = () => {
    const dispatch = useDispatch()
const {productList} =useSelector((state)=> state.product)

useEffect(() => {
   !productList?.length && dispatch(fetchProduct())
}, [ dispatch])
console.log(productList)


return (
 <div>
<Table striped bordered hover size="sm" className="text-center">
  <thead>
    <tr>
      <th>#</th>
      <th>STATUS</th>
      <th> Name</th>
      <th>PRICE</th>
      <th>EDIT</th>
      <th>DELETE</th>
    </tr>
  </thead>
  <tbody>
      {!productList?.length ? ( <tr>
          <td colSpan="6" className="text-center">"No product to show" 

          </td>
          </tr>

      ): (  productList.map((row, i) =>(
        <tr key={row._id}>
          <td>{i+1}</td>
          <td>Online</td>
          <td className="text-start">{row.title}</td>
          <td>${row.price}</td>
          <td>
            <Button variant="info">Edit
            </Button>
            </td>
            <td>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      )))}  
   </tbody>
  </Table>
 </div>
    )
}
