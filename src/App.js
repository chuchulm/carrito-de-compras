
import data from "./data.json"
import { useState } from "react";
import { Products } from "./components/Products";
import { Filter } from "./components/Filter";
import { Cart } from "./components/Cart";


function App() {
  
  const [dataBase, setDataBase] = useState({
    products: data.products,
    cartItems:localStorage.getItem("cartI")? JSON.parse(localStorage.getItem("cartI")) : [],
    size: "",
    sort: "",

  })
 
  const { products, size, sort, cartItems } = dataBase

  console.log(cartItems)

  const addToCart = ( product ) => {
    
    const cartI = cartItems.slice(); 
     
    let alreadyInCart = false;

    cartI.forEach((item) => {
      if(item._id === product._id){
         item.count++;
         alreadyInCart = true;
      }
    });

    if(!alreadyInCart){
    
       cartI.push({ ...product, count: 1 });
    }

    setDataBase({...dataBase, cartItems: cartI});
    localStorage.setItem("cartI", JSON.stringify( cartI ));
  }

  
  const createOrder = ({ name }) =>{
    alert( "need to save order for"   +   name);
  }

  


  const removeFromCart = ( product ) => {
    const cartI = cartItems.slice(); 
     
    setDataBase({
      ...dataBase, cartItems: cartI.filter((x)=> x._id !== product._id),

    });
    localStorage.setItem("cartI", JSON.stringify( cartI.filter((x)=> x._id !== product._id) ));
  }
 

  const sortProducts = ( event ) => {

      const sort = event.target.value
      
      setDataBase((dataBase) =>({...dataBase,
          sort: sort,
          products: dataBase.products
          .slice()
          .sort((a, b) => (
           sort === "lowest"
            ? a.price > b.price
              ? 1
              :-1

            : sort === "highest"
            ? a.price < b.price
              ? 1
              :-1
            : a._id < b._id
              ? 1
              :-1
          ))
      }));
  };



  const filterProducts = ( event ) => {

    if(event.target.value === ""){
      setDataBase({...dataBase, size: event.target.value, products: data.products});
    } else{
      setDataBase({...dataBase,
        size: event.target.value,
        products: data.products.filter( (product) => product.availableSizes.indexOf(event.target.value) >= 0 )
      })

    }

    
  }


  return (
    <div className="grid-container">

      <header>
        <a href="/">React Shopping cart</a>
      </header>

      <main>
          <div className="content">
               
            <div className="main">
              
               <Filter count={ products.length } size={ size } sort={ sort } filterProducts={filterProducts} sortProducts={sortProducts}/>
               <Products products={ products } addToCart={ addToCart }/>

            </div>

            <div className="sidebar">
              <Cart cartItems={ cartItems } removeFromCart={ removeFromCart } createOrder ={ createOrder }/>

            </div>
      
          </div>
      </main>

      <footer>
        all right is reserved.
      </footer>
    </div>
  );
}

export default App;


