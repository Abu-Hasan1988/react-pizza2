import React from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { List } from 'react-content-loader';


const Home=()=> {
  const navigate = useNavigate();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const sortType = useSelector((state)=>state.filter.sort.sortProperty);
    const currentPage= useSelector((state)=>state.filter.currentPage);
const isMounted = React.useRef(false);

    console.log('sportType', sortType);

  const {searchValue} = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
 
  

  const onChangeCategory = (id) => {
     
      dispatch(setCategoryId(id));
  }
 
 const onChangePage = number => {
  dispatch(setCurrentPage(number));
 };

 const fetchPizzas = () => {
  setIsLoading(true);

  const sortBy=sortType.replace('-', '');
  const order=sortType.includes('-') ? 'asc' : 'desc';
  const category=categoryId > 0 ? `category=${categoryId}`: ''
  const search = searchValue ? `&search=${searchValue}` : '';

  axios
  .get(
    `https://645e5a5412e0a87ac0ee299a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  )
  .then((hasan)=>
    {
    setItems(hasan.data);
    setIsLoading(false);
    
  });
 }
// Если изменили параметры и был первый рендер
 React.useEffect(()=>{
  if (isMounted.current) {
  const queryString = qs.stringify({
    sortType, categoryId, currentPage,

  });
  
  navigate(`?${queryString}`);
}
 isMounted.current = true;
},[sortType, categoryId, currentPage]);

//Если был первый рендер, то проверяем URL-параметры и сохраняем в Редаксе.
 React.useEffect(()=>{
  if(window.location.search) {
    const params = qs.parse(window.location.search.substring(1));
    
    const sort = list.find((obj)=>obj.sortProperty === params.sortType)

    dispatch(
      setFilters({
        ...params,
        sort,
      })
    );
    isSearch.current = true;
  }
 }, []);
  // Если был первй рендер то запрашиваем пиццы
  React.useEffect(()=>{
   if (!isSearch.current) {
    fetchPizzas();

    
   }
   isSearch.current = false;
  
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
 <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
</div>
</div>
  );
}


export default Home;
