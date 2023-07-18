import React from "react";

const ImageHelper=({product}) => {
    const imageurl = product ?  product.image:
    `https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`

    return(
        <div className="rounded border border-success p-2">
            <img src={imageurl}
                style = {{maxHeight:"100%" , maxWidth:"100%" }}
                className="mb3 rounded"
                alt=""
            /> 
        </div>
    );
};

export default ImageHelper;










