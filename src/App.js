

import './App.css';
import Register from "./pages/register/Register";
import Login  from "./pages/login/Login";
import Dashboard  from "./pages/dashboard/Dashboard";
import Product  from "./pages/product/Product";
import NewProduct  from "./pages/product/NewProduct";
import Order  from "./pages/order/Order";
import Customer  from "./pages/customer/Customer";
import Payment from "./pages/payments/Payment";
import { PrivateRoute } from './components/private-route/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route }
 from "react-router-dom";
import { PageNotFound } from './components/page-not-found/404-PageNotFound';
import  EmailVerification  from './pages/email-verification/EmailVerification';
import  Category  from "./pages/category/Category";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import ResetPassPage from './components/password-reset/ResetPassword';





function App () {
 return (
 <div>
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute path="/categories">
          <Category />
        </PrivateRoute>

        <PrivateRoute exact path="/products">
          <Product />
        </PrivateRoute>
        <PrivateRoute exact path="/products/:slug">
          <NewProduct />
        </PrivateRoute>

        <PrivateRoute path="/orders">
          <Order />
        </PrivateRoute>

        <PrivateRoute path="/customers">
          <AdminProfile />
        </PrivateRoute>

        <PrivateRoute path="/admin-profile">
          <Customer />
        </PrivateRoute>
        
        <PrivateRoute path="/payments">
          <Payment />
        </PrivateRoute>
        <PrivateRoute path="/registration">
          <Register />
        </PrivateRoute>

     
        
        <Route path="/registration" children={<Register />}/>
     
        <Route path="/ email-verification" children={<EmailVerification />}/>
        <Route path="/ reset-password" children={<ResetPassPage />}/>
      
        <Route exact path="/" children={<Login />}/>
        <Route path="*" children={<PageNotFound />}/>
      </Switch>
    </Router>
    </div>  
   
  );
};

export default App;