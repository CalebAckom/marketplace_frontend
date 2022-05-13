import React, {  useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./assets/css/custom.css";
import "./assets/css/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../src/Views/auth/Login";
import Footer from "../src/components/footer/Footer";
import HomePage from "../src/Views/Homepage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";
import Profile from "../src/components/Profile";
import EditProfile from "../src/components/EditProfile";
import SignUp from "./Views/auth/Signup/SignUp.jsx";
import Confirm from "./Views/auth/Signup/Confirm";
import BusinessPage from "./Views/Business/BusinessPage";
import SignupAuthContext from "./Context/SignupAuthContext";
import AccountSettings from "./Views/auth/account-settings";
import BusinessPageEdit from "./Views/Business/BusinessPageEdit.jsx";
import NavigationBar from "./Views/NavigationBar";
import ProductPost from "./Views/Business/Products/ProductPost";
import MyProducts from "./Views/Business/Products/MyProducts";
import CartList from "./Views/Business/Cart/CartList"
import ProductDetail from "../src/components/Products/ProductDetail";
import BusinessNotification from "./Views/Business/Notification/BusinessNotification";
import Superadmin from "../src/components/Admin/Superadmin";
import PersonaOrders from "./Views/Personal/PersonaOrders";
import Businesspp from "../src/components/BusinessPP";



function App() {
  const [uImg, setUimg] = useState(
    "../images/user.png"
  );
  const [isLoggin, setIsLoggin] = useState(false);


  return (
    <SignupAuthContext>
      <div
        className="app"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width:" 100%"
          // paddingTop:'14vh'
        }}
      >
        <Router>
          <AuthProvider>
            <NavigationBar uImg={uImg} isLog={isLoggin} setUimg={setUimg} />
            <div className="" style={{width:"100vw", height:"14vh"}}></div>
            <Switch>
              <Route path="/login">
                <Login setIsLog={setIsLoggin} />
              </Route>
              <Route exact path="/">
                <HomePage setIsLog={setIsLoggin} />
              </Route>
              <Route exact path="/business-profile-view">
                <Businesspp setIsLog={setIsLoggin} />
              </Route>
              <Route exact path="/business-profile-view/:slug">
                <Businesspp setIsLog={setIsLoggin} />
              </Route>
              <PrivateRoute path="/profile">
                <Profile setIsLog={setIsLoggin} setUimg={setUimg} />
              </PrivateRoute>
              <Route exact path="/signup" component={SignUp} />
              <Route path="/signup/confirm" component={Confirm} />
              <PrivateRoute path="/account-settings">
                <AccountSettings setIsLog={setIsLoggin} />
              </PrivateRoute>
              <PrivateRoute exact path="/edit-profile"
              >
              <EditProfile setIsLog={setIsLoggin} setUimg={setUimg} />
              </PrivateRoute>
              <PrivateRoute path="/business-page">
                <BusinessPage setUimg={setUimg} setIsLog={setIsLoggin} />
              </PrivateRoute>
              <Route path="/amali-tech-adminpage">
                <Superadmin setIsLog={setIsLoggin} />
              </Route>
              <PrivateRoute path="/business-page-edit">
                <BusinessPageEdit setIsLog={setIsLoggin} />
              </PrivateRoute>
              <PrivateRoute exact path="/post-product/">
                <ProductPost setIsLog={setIsLoggin}/>
              </PrivateRoute>
              <PrivateRoute path="/post-product/:product">
                <ProductPost setIsLog={setIsLoggin}/>
              </PrivateRoute>
              <Route path="/my-products">
                <MyProducts setIsLog={setIsLoggin}/>
              </Route>
              <Route path="/products/:productId">
               <ProductDetail />
             </Route>
             <Route path="/products/:category/:productId">
               <ProductDetail />
             </Route>
             <Route path="/products/:userid/:productId">
               <ProductDetail />
             </Route>
              <Route path="/cart-list">
                <CartList />
              </Route>
              <Route path="/business-notification">
                <BusinessNotification />
              </Route>
              <Route path="/my-orders">
                <PersonaOrders />
              </Route>
            </Switch>
            <Footer />
          </AuthProvider>
        </Router>
      </div>
    </SignupAuthContext>
  );
}

export default App;
