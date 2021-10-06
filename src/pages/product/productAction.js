
import { getProduct, addProduct } from "../../api/productApi";
import { respondPending, getProductSuccess, respondFail, addProdSuccess } from "./productSlice";


export const fetchProduct = () => async dispatch =>{
    dispatch(respondPending())
const data = await getProduct()

if(data?.status === "success"){
data.products && dispatch(getProductSuccess(data))
return
}

dispatch(respondFail(data))
}
export const addProductAction = (prodObj) => async dispatch =>{
    dispatch(respondPending())
const data = await addProduct(prodObj)
console.log(data)

if(data?.status === "success"){
dispatch(addProdSuccess(data))
return
}

dispatch(respondFail(data))
}