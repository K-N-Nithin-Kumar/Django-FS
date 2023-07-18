import  { useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom/cjs/react-router-dom"
import { authenticate, isAuthenticated, signin } from "../auth/helper"
import { Redirect } from 'react-router-dom';

const Signin = ()=>{

    const [values , setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        loading:false,
        didRedirect:false
    })
    
    const { email ,password ,error ,success , loading } = values;

    const handleChange = name =>
    (event)=>{
        setValues({...values ,error:false, [name]:event.target.value})
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values , error:false ,loading:true})
        signin({ email , password})
        .then((data)=>{
            if(data.token){
                //let sessionToken = data.token;
                authenticate(data , ()=>{
                    setValues({...values , success:true , didRedirect:true ,error:false})
                });
            }
            else{
                setValues({...values , error:data , loading:false ,success:false})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const perfromRedirect = () =>{
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    };
    
    const loadingMessage = ()=>{
        const hei = {
            height: '25px',
        };
        return (
          loading && (
            <div className="alert alert-info" style={hei}>
                 <h3 style={hei}>Loading...</h3>
            </div>
          ) 
        )
    }
    const successMessage=()=>{
        return (
          <div className="row">
              <div className='col-md-6 offset-sm-3 text-left'>
                 <div className='alert alert-success'
                       style={{display:""}}
                 >
                     Login Successful
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
                  Login Failure
               </div>
            </div>
        </div>
      )
  
    }

      const signInForm = () =>{
          return(
              <div className='row'>
                  <div className='col-md-6 offset-sm-3 text-left'>
                      <form>
                          <div className="form-group">
                            <label className='text-light'>Email</label>
                            <input type="text" value={email}  className="form-control"  onChange={handleChange("email")}/>                       
                          </div>

                          <div className="form-group">
                            <label className='text-light'>Password</label>
                            <input type="password" value={password}  className="form-control"  onChange={handleChange("password")}/>
                          </div>
                        
                          <button className='btn btn-success btn-block mt-2 'onClick={onSubmit}>Submit</button>
                      </form>
                  </div>
              </div>
          )
      }


    return (
        <Base title="Signin page" description="KNK stores">
            {loadingMessage()}
            
            {success && successMessage()}
            {error && errorMessage()}
            {signInForm()}
        
        <p className="text-center text-white">{JSON.stringify(values)}</p>
            {perfromRedirect()}
        </Base>
    )
}

export default Signin