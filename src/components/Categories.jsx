import React from "react"



function Categories() {

const  [activeIndex, setActivIndex]=React.useState(0);
const onClickCategories=(index)=>{
  setActivIndex(index);
}
const categories=['Все','Мясные-Халал',  ' Гриль', 'Острые', 'Со Вкусом Казы', 'Додстеры'];


  return(
  <div className="categories">
  <ul> { 
  categories.map((Menu, i)=>(
  <li onClick={()=>onClickCategories(i)} className={activeIndex===i ? 'active' : ''}>{Menu}</li>))
    
   }
   
  </ul>
</div>)
};

export default Categories;
