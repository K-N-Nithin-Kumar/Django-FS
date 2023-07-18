import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import  Card from "./Card";
import { useState ,useEffect } from "react";
import PaymentB from './PaymentB'


const Cart = () =>{
    const [reload , setReload] = useState(false)
    const [products ,setProducts] = useState([]);

    useEffect(()=>{
        setProducts(loadCart());
    },[reload])
    const loadAllProducts = (products) =>{
        
        return(
            <div>
                {products.map((product ,ind)=>(
                    <Card
                        key = {ind}
                        product={product}
                        removeFromCart = {true}
                        addtoCart = {false}
                        reload={reload}
                        setReload={setReload}
                    />
                ))}
            </div>
        )
    }
    
    const Checkout = () =>{
        return(
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }
    return(
        <Base title="cart page" description="my des">
           <div className="row text-center">
               <div className="col-6">
                   {loadAllProducts(products)}
               </div>
               <div className="col-6">
                   {products.length >0 ?
                   (
                      <PaymentB products={products}  setReload = {setReload}/>
                   ):
                   (
                       <h3>Cart is empty</h3>
                   )}
               </div>
           </div>
        </Base>  
    )
}

export default Cart;