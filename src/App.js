import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';



function App() {
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
     <PizzaBlock title="Мексиканская" price={500} image={"https://cdn.carte.by/assets/2020/11/06/0ce50166fb8d20c0148322270f36182c-6b93b_src---jpg_710x_83b40_convert.jpg"} /> 
     <PizzaBlock title="Пепирони" price={655} image={"https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"}  />
     <PizzaBlock title="Маргарита" price={455} image={"https://media-cdn.tripadvisor.com/media/photo-s/1a/e9/94/10/caption.jpg"}/> 
</div>
        </div>
      </div>
    </div>
    
  
  );
}

export default App;
