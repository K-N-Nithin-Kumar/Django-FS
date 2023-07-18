import Base from '../core/Base'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {signup} from "../auth/helper/index"
const Signup=()=>{

    const [values , setValues] =useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name , email ,password ,error ,success} = values;

    const handleChange = name =>
    (event)=>{
        setValues({...values ,error:false, [name]:event.target.value})
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        setValues({...values , error:false})
        signup({name , email , password})
        .then((data)=>{
            console.log("DATA" , data);
            if(data.email === email){
               setValues({
                   ...values,
                   name:"",
                   email:"",
                   password:"",
                   error:"",
                   success:true
               })
            }
            else{
                setValues({
                    ...values,
                    error:"Email already exists",
                    success:false
                })
            }
        })
        .catch(error=>{ 
            console.log(error)
            setValues({...values , error:error.message , success:false})
        })
    }

const successMessage=()=>{
    
      return (
        <div className="row">
            <div className='col-md-6 offset-sm-3 text-left'>
               <div className='alert alert-success'
                     style={{display:""}}
               >
                   New Account created succesfully please 
                   <Link to="/signin ">login now</Link>
               </div>
            </div>
        </div>
      )
}

const errorMessage=()=>{
    
    return (
      <div className="row">
          <div className='col-md-6 offset-sm-3 text-left'>
             <div className='alert alert-danger'
                   style={{display:""}}
             >
                {error}
             </div>
          </div>
      </div>
    )
}


    const signUpForm = () =>{
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className="form-group">
                          <label className='text-light'>Name</label>
                          <input type="text" value={name}  className="form-control"  onChange={handleChange("name")}/>
                        </div>

                        <div className="form-group">
                          <label className='text-light'>Email</label>
                          <input type="text" value={email}  className="form-control"  onChange={handleChange("email")}/>                       
                        </div>

                        <div className="form-group">
                          <label className='text-light'>Password</label>
                          <input type="password" value={password}  className="form-control"  onChange={handleChange("password")}/>
                          
                        </div>
                        <button className='btn btn-success btn-block mt-2 'onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Signup" description="Signup for user">
            {success && successMessage()}
            {error && errorMessage()}
            {signUpForm()}
            <p className='text-white text-center'>
               {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signup;