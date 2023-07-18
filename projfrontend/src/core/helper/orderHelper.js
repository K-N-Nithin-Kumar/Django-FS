import {API} from "../../backend"
import {Redirect} from "react-router-dom"

export const createOrder = (userId ,token , orderData) =>{
    const formData = new FormData();
    for(let key in orderData){
        formData.append(key, orderData[key]);
        console.log(key, orderData[key]);
    }
    return fetch(`${API}order/add/${userId}/${token}/` ,{
        method: "POST",
        body: formData
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    })
}