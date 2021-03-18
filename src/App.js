
import data from "./data.json"
import { useState } from "react";
import { Products } from "./components/Products";
import { Filter } from "./components/Filter";


function App() {
  
  const [dataBase, setDataBase] = useState({
    products: data.products,
    size: "",
    sort: "",

  })
 
  const { products, size, sort } = dataBase


  const sortProducts = ( event ) => {

      const sort = event.target.value
      
      setDataBase((dataBase) =>({
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
      setDataBase({size: event.target.value, products: data.products});
    } else{
      setDataBase({
        size: event.target.value,
        products: data.products.filter( (product) => product.availableSizes.indexOf(event.target.value)>=0 ),
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
               <Products products={ products }/>

            </div>

            <div className="sidebar">
              Cart Items

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


// 1:04.38
