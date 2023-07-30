import React from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';


const Home=()=> {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();
    const sortType = useSelector((state)=>state.filter.sort.sortProperty);

  const {searchValue} = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const  [currentPage, setCurrentPage]=React.useState(1);
  

  const onChangeCategory = (id) => {
     
      dispatch(setCategoryId(id));
  }
 


  
  React.useEffect(()=>{
    setIsLoading(true);

    const sortBy=sortType.replace('-', '');
    const order=sortType.includes('-') ? 'asc' : 'desc';
    const category=categoryId > 0 ? `category=${categoryId}`: ''
    const search = searchValue ? `&search=${searchValue}` : '';

   fetch  (`https://645e5a5412e0a87ac0ee299a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,)
   .then(response=>response.json())
   .then(json=>{setItems(json);
     setIsLoading(false);
 });
 window.scrollTo(0,0);
}, [categoryId, sortType, searchValue, currentPage]);

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
   <Categories value={categoryId}  onChangeCategory={onChangeCategory}/>
   <Sort/>
   </div>

   <h2 className="content__title">Все пиццы</h2>
   <div className="content__items">
 {isLoading ? skeletonos  : pizzas };
 <Pagination onChangePage={number=> setCurrentPage(number)}/>
</div>
</div>
  );
}


export default Home;
