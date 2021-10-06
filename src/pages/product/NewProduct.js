import React from 'react'

import { AddProductForm } from "../../components/product-forms/AddProductForm";
import  AdminLayout  from "../layout/AdminLayout";
export const NewProduct = () => {
    
    return (
        <div>
          <AdminLayout>
        <h2>Add new Product</h2>
        <hr />
        <AddProductForm />
      </AdminLayout>
        </div>
    )
}
export default NewProduct