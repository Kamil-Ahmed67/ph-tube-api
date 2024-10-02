//1. Fetch ,Load and Show Catagories on html

//create loadCategories
const loadCategories=async()=>{
      fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
      .then((response)=>response.json())
      .then(data=>displayCategories(data.categories))
      .catch((error)=> console.log(error))
}
loadCategories();
//create DisplayCat
const displayCategories=(data)=>{
  console.log(data);
}