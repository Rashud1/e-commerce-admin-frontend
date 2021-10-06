import React from 'react'
import  AdminLayout  from '../layout/AdminLayout'
import {Button} from "react-bootstrap"
import { ProductTable } from '../../components/product-table/ProductTable';
import { Link } from "react-router-dom";
 const Product = () => {
    return (
        <div>
            <AdminLayout>
                <h2>Product page</h2>
                <div className="top-btn text-end">
                    <Link to ="/prodcuts/new" />
                    <Button variant="primary">
                        {""}
                        Add new product
                    </Button>
                    <div className="product-list">
                      <ProductTable />

                    </div>

                </div>
            </AdminLayout>
        </div>
    );
};
export default Product;