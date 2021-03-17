
import data from "./data.json"
import { useState } from "react";
import { Products } from "./components/Products";


function App() {
  
  const [dataBase, setDataBase] = useState({
    products: data.products,
    size: '',
    sort: '',

  })
 

  const { products, size, sort } = dataBase


  return (
    <div className="grid-container">

      <header>
        <a href="/">React Shopping cart</a>
      </header>

      <main>
          <div className="content">
    
            <div className="main">
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
