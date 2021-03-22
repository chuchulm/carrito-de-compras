import React, { useEffect, useState } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade';




export const Cart = ({ cartItems, removeFromCart ,createOrder}) => {
  

  const [state, setState] = useState({
    showCheckout: false,
    name: '',
    email: '',
    address: '',

  })
 
  

  const{ showCheckout, name, email, address } = state





  const handleInput = ({ target }) => {

    setState({
        ...state,
         [target.name]: target.value
    })

  };

  


  
    const handleSubmit = ( e ) => {
        e.preventDefault();
        
        
        createOrder({name, email, address, cartItems})
       
    };

     
     
    



    
    return (
        <div>
            {cartItems.length === 0? (

                <div className="cart cart-header">
                   Cart is empty
                </div>
            ) : (

                <div className="cart cart-header">
                   You have {cartItems.length} in the cart{" "}
                </div>

                )}

                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                               {
                                   cartItems.map(item =>(
                                       <li key={item.id}>
                                            <div>
                                                <img src={item.image} alt={item.title}/>
                                            </div>
                                            <div>
    
                                                <div>{item.title}</div>
    
                                                <div className="right" >
                                                    { formatCurrency(item.price) } x {item.count} {" "}
                                                    <button className="button" onClick={()=> removeFromCart(item)}>
                                                         Remove
                                                    </button>
                                                </div>
                                                
                                            </div>
        
                                       </li>
                                    ))
                                }
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !==0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total: {" "}
                                        {formatCurrency( 
                                            cartItems.reduce((a,c) => a + (c.price*c.count ), 0 )
                                        )}
                                    </div>
                                    <button className=" button primary " onClick={() => {setState({showCheckout: true }); }}> Proceed</button>
                                </div>
                            </div>
    
                            {showCheckout && (
                                <Fade right cascade>
                                    <div className="cart">
                                        <form onSubmit={ handleSubmit }>
                                            <ul className="form-container">
                                                <li>
                                                     <label>Email</label>
                                                     <input
                                                      type="email"
                                                      required 
                                                      onChange={handleInput}
                                                      name="email"
                                                      value={email}
                                                      />
                                                </li>
    
                                                <li>
                                                     <label>Name</label>
                                                     <input
                                                      type="text"
                                                      required 
                                                      placeholder=""
                                                      onChange={handleInput}
                                                      name="name"
                                                      value={name}
                                                      />
                                                </li>
    
                                                <li>
                                                     <label>Address</label>
                                                     <input
                                                      type="text"
                                                      required 
                                                      onChange={handleInput}
                                                      name="address"
                                                      value={address}
                                                      />
                                                </li>
    
                                                <li>
                                                    <button className="button primary" type="submit" >Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                    
                </div>
                
        </div>
    )
}


