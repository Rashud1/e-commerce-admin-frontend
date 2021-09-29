import { catRequestPending, catRespSuccess, catRequestFail, fetchCatRespSuccess } from "./categoryslice";
import { createCategory, fetchCategory, deleteCategory, updateCategory } from "../../api/categoryApi";
import { updateNewAccessJWT } from "../../api/tokenAPI";
import { userLogOut } from "../admin-auth-slice/userAction";



export const createCat = newCat => async dispatch => {
dispatch(catRequestPending());
///call the api
 const data = await createCategory(newCat);
 
 if(data?.message === "jwt expired"){
    //request for new accessJWT
    const token = await updateNewAccessJWT()
    if(token){
        return dispatch(createCat(newCat))

    }else{
       dispatch(userLogOut())
    }
    //then re call the function to refetch it.
}


 if(data?.status === "success"){
     dispatch(fetchCat());
     return dispatch(catRespSuccess(data))

}
    dispatch(catRequestFail(data));

    //dispatch success/fail
};


export const fetchCat = newCat => async dispatch => {

    dispatch(catRequestPending());
   
   
    ///call the api
    const { status, message, categories } = await fetchCategory();
   

    if(message === "jwt expired"){
        //request for new accessJWT
        const token = await updateNewAccessJWT()
        if(token){
            return dispatch(fetchCat())

        }else{
           dispatch(userLogOut())
        }
        //then re call the function to refetch it.
    }

   
    if(status === "success"){
        return dispatch(fetchCatRespSuccess(categories))

   
       //dispatch success/fail
   }
   dispatch(catRequestFail({ status, message}));
   };
   
   
   
export const deleteCat = (_id) => async dispatch => {

    dispatch(catRequestPending());
   
   
    ///call the api
    const data  = await deleteCategory(_id);

    if(data?.message === "jwt expired"){
        //request for new accessJWT
        const token = await updateNewAccessJWT()
        if(token){
            return dispatch(deleteCat(_id))
    
        }else{
           dispatch(userLogOut())
        }
        //then re call the function to refetch it.
    }

    
    console.log(data, "from cat delete");
   
    if(data.status === "success") {
        dispatch(fetchCat());
        return dispatch(catRespSuccess(data));

   
       //dispatch success/fail
   }
   dispatch(catRequestFail( data ));
   };

   export const updateCat = catObj => async dispatch => {

    dispatch(catRequestPending());
   
   
    ///call the api
    const data  = await updateCategory(catObj);

    if(data?.message === "jwt expired"){
        //request for new accessJWT
        const token = await updateNewAccessJWT()
        if(token){
            return dispatch(updateCat(catObj))
    
        }else{
           dispatch(userLogOut())
        }
        //then re call the function to refetch it.
    }
    console.log(data, "from cat update");
   
    if(data.status === "success") {
        dispatch(fetchCat());
        return dispatch(catRespSuccess(data))

   
       //dispatch success/fail
   }
   dispatch(catRequestFail( data ));
   };
   
   


