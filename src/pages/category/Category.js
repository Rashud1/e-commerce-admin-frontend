import React from 'react'

import { Categoryform } from '../../components/category-form/CategoryForm';
import { CategoryList } from './category-lists/CategoryLists';
import AdminLayout from "../layout/AdminLayout";
import { BreadcrumbComp } from "../../components/breadcrumb/Breadcrumb";


const Category = () => {
    return (
        <div>
            <AdminLayout>
                <BreadcrumbComp page="Category"></BreadcrumbComp>
                <div className="content">
                    <div className= "category-form">
                        <h2>Add new category</h2>
                    <Categoryform />
                    </div>
                    <hr/>
                    <div className="cat-list mt-5">
                        <h2>Category Lists</h2>
                        <CategoryList />

                        
                

                </div>
                </div>
            </AdminLayout>
            
        </div>
    );
};





export default Category;

