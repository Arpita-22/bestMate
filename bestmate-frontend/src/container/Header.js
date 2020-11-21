//Login, SignUp(form)
import React from 'react';
import{store} from './MainContainer';



function Header(){
    return(
        <div className="nav-bar">
            {/* {store.getState().count} */}
        <button>signUp</button>
        <button>LogIn</button>
        </div>
    )
}

export default Header;