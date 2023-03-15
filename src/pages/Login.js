import React, { useState } from "react";
import axios from "axios";
import {  useHistory } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("test@site.com");
    const [password, setPassword] = useState("123456");
    const history = useHistory();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const user = {
        email: email,
        password: password,
      };
      axios.post("http://127.0.0.1:8000/api/login", user).then((response) => {
        console.log(response.data);
        history.push("/expense"); // redirect to home page
        
      });
      
    };
   

    return (
            <div>
                	 
					 <div class="nk-content ">
                    <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
                        <div class="brand-logo pb-4 text-center">
                            
                        </div>
                        <div class="card card-bordered">
                            <div class="card-inner card-inner-lg">
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h4 class="nk-block-title">Sign-In</h4>
                                        <div class="nk-block-des">
                                          
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="default-01">Email</label>
                                        </div>
                                        <div class="form-control-wrap">
                                            <input type="text"  value={email}
                                             onChange={(event) => setEmail(event.target.value)} class="form-control form-control-lg" id="default-01"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                       
                                        <div class="form-control-wrap">
                                           
                                            <input  class="form-control form-control-lg" id="password" type="password"
                                                  value={password}
                                                     onChange={(event) => setPassword(event.target.value)}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
                                    </div>
                                </form>
                                
                               
                            
                            </div>
                        </div>
                    </div>
                   
                </div>
	 
	  
	 
            </div>
  );
}

export default Login;