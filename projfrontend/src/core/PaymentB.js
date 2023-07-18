import DropIn from "braintree-web-drop-in-react";
import { useState  ,useEffect } from "react";
import {emptyCart} from './helper/cartHelper'
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated , signout   } from "../auth/helper/index"
import {Redirect} from "react-router-dom"
const PaymentB = ({
    products,
    reload = undefined,
    setReload = (f )=> f
})=>{

    const [info , setInfo] = useState({
        loading : false,
        success :false,
        clientToken  :null,
        error:"",
        instance:{}
    })
    const userId =isAuthenticated && isAuthenticated().user.id;
    const token =isAuthenticated && isAuthenticated().token;

    const getToken = ()=>{
        getmeToken(userId , token).then(info=>{
            if(info.error){
                setInfo({...info , error : info.error})

                signout(()=>{
                    return <Redirect to="/" />
                })

            }else{
               const clientToken = info.clientToken;
               setInfo({clientToken});
            }
        })
    }
    useEffect (()=>getToken(userId , token),[])

    const getAmount = ()=>{
       let amount = 0;
       products.map(p=>{
           amount+=parseInt(p.price)
       })
       return amount
    }

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then((data) => {
          console.log("MYDATA", data);
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount(),
          };
          processPayment(userId, token, paymentData)
            .then((response) => {
              console.log("POINT-1", response);
              if (response.error) {
                if (response.code == "1") {
                  console.log("PAYMENT Failed!");
                  signout(() => {
                    return <Redirect to="/" />;
                  });
                }
              } else {
                setInfo({ ...info, success: response.success, loading: false });
                console.log("PAYMENT SUCCESS");
    
                let product_names = "";
                products.forEach(function (item) {
                  product_names += item.name + ", ";
                });
    
                const orderData = {
                  products: product_names,
                  transaction_id: response.transaction.id,
                  amount: response.transaction.amount,
                };
                createOrder(userId, token, orderData)
                  .then((response) => {
                    if (response.error) {
                      if (response.code == "1") {
                        console.log("Order Failed!");
                        signout(() => {
                          return <Redirect to="/" />;
                        });
                      }
                    } else {
                      if (response.success == true) {
                        console.log("ORDER PLACED!!");
                      }
                    }
                  })
                  .catch((error) => {
                    setInfo({ loading: false, success: false });
                    console.log("Order FAILED", error);
                  });
                emptyCart(() => {
                  console.log("Did we got a crash?");
                });
    
                setReload(!reload);
              }
            })
            .catch((error) => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED", error);
            });
        });
      };
    



    const showDropin = () =>{
            return(
                <div>
                    {
                        info.clientToken !== null && products.length > 0 ? 
                        (
                             <div>
                                 <DropIn
                                     options={{
                                         authorization: info.clientToken
                                     }}
                                     onInstance={(instance)=>(info.instance = instance)}
                                  />
                                  <button onClick={onPurchase} className="btn btn-block btn-success">Checkout</button>  
                              </div>
                        ) : 
                        (
                           <h3>Please login or add products to your cart</h3>
                        )
                    }
                </div>
            )
           
        
    }


    return(
        <div>
            <div>
                <h3>Your bill is <span className="badge bg-secondary">{getAmount()} ₹ </span></h3>
                {showDropin()}
            </div>
        </div>
    )
}

export default PaymentB