/*import React from "react";
import {BrowserRouter  , Route , Switch} from "react-router-dom";



const Routes = () =>{
    return(
        <BrowserRouter>
          <Switch>
              <Route path="/"exact component={Home}/>
          </Switch>
        </BrowserRouter>
    );
};
export default Routes;
*/
import React from 'react';
import Home from "./core/Home";
import Signup from './user/signup';
import Signin from './user/signin';
import {Route} from "react-router-dom";
import UserDashboard from './user/Userdashboard';

import PrivateRoutes from './auth/helper/PrivateRouters';
import Cart from './core/Cart';

function Routes() {
    return (
      
        <div>
            <Route exact path="/"><Home/></Route>
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin}/>
            <Route path='/signin' exact component={Signin}/>
            <Route path='/cart' exact component={Cart}/>
            <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/>
        </div>
  
    );
  }
  
  export default Routes;