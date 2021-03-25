import React, { useEffect, useState } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Zoon from 'react-reveal/Zoom';
import Modal from 'react-modal' ;
import { connect } from 'react-redux';
import { fetchProducts as fetchProductsAction } from '../actions/productActions';
import { bindActionCreators } from 'redux';


 

 export const  Products = ({ products, addToCart, fetchProducts}) => {


    
  
   const [stateModal, setStateModal] = useState({
       productos: null,
   })

   const { productos } = stateModal

   useEffect(() => {
       
    fetchProducts()
      
   }, [])


   const openModal = ( product ) => {

    setStateModal( {productos: product })
   }
  

   const closeModal = () => {
       setStateModal({ productos:null})
   }

    return (
        <div>
            <Fade bottom cascade>
                {
                    !products ? <div>Loading...</div> :

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
                }
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




export default connect( (state) => ({ products: state.products.items }),
                        (dispatch) => ({fetchProducts: bindActionCreators(fetchProductsAction, dispatch)}) )( Products );


