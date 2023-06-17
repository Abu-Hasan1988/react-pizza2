import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';






function App() {
   const [items, setItems] = React.useState([]);

  React.useEffect(()=>{
    fetch  ('https://ff833aea4d6cb5ec.mokky.ru/items')
    .then(response=>response.json())
    .then(json=>{setItems(json);
  });
}, []);

  return (
    <div className="wrapper">
    <Header/>
    <div className="content">
      <div className="container">
        <div className="content__top">
        <Categories/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
      {
        items.map((obj)=>(
        <PizzaBlock 
        key={obj.imageUrl}
        title={obj.title}
        price={obj.price} 
        image={obj.imageUrl} 
        size={obj.sizes}
        xxx={obj.types}
        />
        ))
      };
     
</div>
        </div>
      </div>
    </div>
    
  
  );
}

export default App;
