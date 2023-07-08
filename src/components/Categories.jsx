import React from "react"



function Categories({value, onChangeCategory}) {

const categories=['Все','Мясные-Халал',  ' Гриль', 'Острые', 'Со Вкусом Казы', 'Додстеры'];


  return(
  <div className="categories">
  <ul> { 
  categories.map((Menu, i)=>(
  <li  key={i} onClick={()=>onChangeCategory(i)} className={value===i ? 'active' : ''}>{Menu}</li>))
    
   }
   
  </ul>
</div>)
};

export default Categories;
