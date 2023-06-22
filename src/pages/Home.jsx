import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home=()=> {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

 React.useEffect(()=>{
   fetch  ('https://ff833aea4d6cb5ec.mokky.ru/items')
   .then(response=>response.json())
   .then(json=>{setItems(json);
     setIsLoading(false);
 });
}, []);

  return(
   <> 
    <div className="content__top">
   <Categories/>
     <Sort/>
   </div>
   <h2 className="content__title">Все пиццы</h2>
   <div className="content__items">
 {isLoading ? [...new Array(7)].map((_, index)=> <Skeleton key={index} />) :
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
</>
  );
}


export default Home;
