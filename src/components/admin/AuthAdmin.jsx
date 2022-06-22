import './AuthAdmin.css' 
import { useEffect, useState  } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../ApI/api';

import { useDispatch } from 'react-redux';

import { setUser } from '../../redux/user/user.actions';

//import { SwetAlertsucces } from '../SwetAlert';

const AuthAdmin = () => {
const [admin , setAdmin] = useState();
const history = useHistory();

const dispatch = useDispatch()

const Authentification = async(e)=>{

    

    //console.log(form);
    e.preventDefault();
    const formData = new FormData(e.target); 
    console.log(Object.fromEntries(formData));
    
            try{
                let res = await fetch(API_URL+'/admin/Authentification.php',{
                    method:'POST' , 
                    body:formData ,
                    credentials:"same-origin"
                });
                let resJson = await res.json();
                    if(res.status === 200){
                        localStorage.setItem("idSession", resJson.idSession);
                        dispatch(setUser({userInfos: {id: resJson.id}, type: 'admin'}))
                    }
                    else{
                        console.log(resJson);
                    }
           }
           catch(err){
               console.log(err);
           }
        
        
    
    
}

    return (  
     <div>
         {/* <SwetAlertsucces/> */}
            <div className="Auth-Content">
            
            <div className='box-left'>
               <p>Welcome admin</p>
            </div>
            
            <div className="box-right">
                <form className='formulaire' onSubmit={Authentification} >
                    <label>Username :</label>
                    <input type="text" name="user_name" />
                    <label >PassWord :</label>
                    <input type="password" name="password" />
                    <div className='btn-form-admin'>
                        <button className='btn-auth'> Login  </button>
                    </div>
                </form>
            
           </div>
           
        </div>
     </div>
    );
}
 
export default AuthAdmin;