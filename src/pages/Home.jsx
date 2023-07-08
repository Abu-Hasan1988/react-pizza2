import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home=({searchValue})=> {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const  [categoryId, setCategoryId]=React.useState(0);
  const  [sortType, setSortType]=React.useState({
    name:'популярности',
    sortProperty:'rating',
  });

  React.useEffect(()=>{
    setIsLoading(true);

    const sortBy=sortType.sortProperty.replace('-', '');
    const order=sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category=categoryId > 0 ? `category=${categoryId}`: ''
    const search = searchValue ? `&search=${searchValue}` : '';

   fetch  (`https://645e5a5412e0a87ac0ee299a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,)
   .then(response=>response.json())
   .then(json=>{setItems(json);
     setIsLoading(false);
 });
 window.scrollTo(0,0);
}, [categoryId, sortType, searchValue]);

const pizzas = items.map((obj)=>(
  <PizzaBlock 
  key={obj.imageUrl}
  title={obj.title}
  price={obj.price} 
  image={obj.imageUrl} 
  size={obj.sizes}
  xxx={obj.types}
  />
  ));

  const skeletonos =  [...new Array(7)].map((_, index)=> <Skeleton key={index} />);

  return(
   <div className="container">
    <div className="content__top">
   <Categories value={categoryId}  onChangeCategory={(i)=>setCategoryId(i)}/>
   <Sort  value2={sortType}  onChangeSort={(i)=>setSortType(i) } />
   </div>

   <h2 className="content__title">Все пиццы</h2>
   <div className="content__items">
 {isLoading ? skeletonos  : pizzas };

</div>
</div>
  );
}


export default Home;
