import React, { useState } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Zoon from 'react-reveal/Zoom'
import Modal from 'react-modal' 



export const Products = ({ products, addToCart }) => {

  
   const [stateModal, setStateModal] = useState({
       productos: null,
   })

   const { productos } = stateModal


   const openModal = ( product ) => {

    setStateModal( {productos: product })
   }
   console.log(productos)

   const closeModal = () => {
       setStateModal({ productos:null})
   }

    return (
        <div>
            <Fade bottom cascade>
                <ul className="products">
                    {
                        products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={'#' + product._id} onClick={()=> openModal(product) }>
                                        <img src={product.image} alt={product.title}/>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price) }
                                        </div>
                                        <button className="button primary" onClick={() => addToCart( product ) }>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Fade>

            {
                productos && (

                   
                    <Modal isOpen={true} onRequestClose={closeModal}  >
                        <Zoon>
                            <button className="close-modal" onClick={()=> closeModal()}>
                                 X
                            </button>
                                    <div className="product-details" key={productos._id}>
                                        <img src={productos.image} alt={productos.title}/>

                                        <div className="product-details-description">
                                            <p>
                                                <strong>{productos.title}</strong>
                                            </p>
    
                                            <p>
                                                <strong>{productos.description}</strong>
                                            </p>
    
                                            <p>
                                                Avaiable Sizes{" "}
                                                {productos.availableSizes.map((x) =>(
                                                <span>
                                                    {" "}

                                                    <button className="button">
                                                         {x}
                                                    </button>
                                                </span>
                                                ))}
                                            </p>
                                            <div className="product-price">
                                                <div>
                                                    {formatCurrency(productos.price)} 
                                                </div>
                                                <button className="button primary" onClick={()=>{ addToCart(productos);  closeModal();}}>
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                        </Zoon>
                    </Modal>
                        
                 

                )
            }
        </div>
    )
}
