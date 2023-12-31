export const addItemToCart = (item , next) =>{
    let cart = []
    if(typeof(window) !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push(
            {...item}
        );
        localStorage.setItem("cart" ,JSON.stringify(cart));
        next();
    }
}

export const loadCart = () =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const reomoveItemFromCart = productId =>{
    let cart = []
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product , index) =>{
            if(product.id === productId){
                cart.splice(index , 1)
            }
            return cart;
        });
        localStorage.setItem("cart" ,JSON.stringify(cart));
    }
    return cart;
}

export const emptyCart = (next) =>{
    if(typeof(window) !== "undefined"){
        localStorage.removeItem("cart");
        let cart =[]
        localStorage.setItem("cart" , JSON.stringify(cart));
        next();
    }
}
