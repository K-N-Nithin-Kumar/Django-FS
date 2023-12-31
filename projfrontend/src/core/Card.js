import React, { useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import {Redirect} from "react-router-dom"
import { addItemToCart  , reomoveItemFromCart} from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';


//TODO:Deal with this later

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = f => f
  //simplified version is function(f){return f}
}) =>{

     const [redirect , setRedirect] = useState(false);

     const title = product ? product.name : "Cloth"
     const description = product ? product.description : "I am default description"
     const price = product ? product.price : "100"

     const AddtoCart = ()=>{
      if(isAuthenticated()){
        addItemToCart(product ,()=>{
          setRedirect(true)
         console.log("Added to cart");
      })
       
      }
      else{   
        alert("Login Required");
      }
     }

     const getRedirect = redirect =>{
      if(redirect){
        return <Redirect to="/cart"/>
      }
     }

     const showAddTOCart = addtoCart =>{
         return(
             addtoCart && (
                <button
                onClick={AddtoCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                Add to Cart
              </button>
             )
         )
     }

     const showRemoveFromCart = removeFromCart =>{
         return(
             removeFromCart && (
              <button
              onClick={() => {
                reomoveItemFromCart(product.id);
                setReload(!reload)
                getRedirect(true);
                console.log("Product removed from cart");
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
             )
         )
     }
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{title}</div>
        <div className="card-body">
          {getRedirect(redirect)}
          <ImageHelper product={product} />  
          <p className="lead bg-success font-weight-normal text-wrap p-2 mt-4">
            {description}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{price}</p>
          <div className="row">
            <div className="col-12">
              {showAddTOCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;