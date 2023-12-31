import React from "react";
import Menu from "./Menu"
const Base= ({
    title="My Title",
    description = "My description",
    className = "bg-dark text-white p-4",
    children
}) =>{
    return(
        <div>
                 <Menu/>
                <div className="container-fluid">
                        <div className="jumbotron bg-dark text-white text-center">
                            <h2 className="display-3">{title}</h2>
                            <p className="lead">{description}</p>
                        </div>
                        <div className={className}>{children}</div>     
                 </div>
                <footer className="footer bg-dark mt-auto py-3">
                    <div className="container-fluid bg-success text-white text-center py-3">
                        <h4>If you any queries contact us</h4>
                        <div className="d-grid gap-2">
                           <button className="btn btn-primary btn-lg" type="button">Contact us</button>
                        </div>
                         
                         <div className="container">
                             <span className="text-white">K N Nithin stores</span>
                         </div>
                    </div>
                </footer>
        </div>
       
    );
}

export default Base;