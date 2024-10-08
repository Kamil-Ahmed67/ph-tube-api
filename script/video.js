//1. Fetch ,Load and Show Catagories on html

//create loadCategories
const loadCategories = async () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((response) => response.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
loadCategories();
/****LOAD VIDEOS******** */
const loadVideos = async (searchTex = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTex}
    `)
    .then((response) => response.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error))
}
loadVideos();
//*******LOAD CATEGORIES VIDEO */
const removeActiveCLass =()=>{
  const buttons=document.getElementsByClassName('category-btn');
  for(let btn of buttons){
    btn.classList.remove('active');
  }
}
const loadCategoryVideos=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then(data =>{
      //sobaike active class remove koro
        removeActiveCLass();
      //id er class ke active koro
      const activeBtn=document.getElementById(`btn-${id}`)
      activeBtn.classList.add('active')
      displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}
/**
/**
 {category_id: '1001', category: 'Music'}
 */
// {
//   "category_id":"1001",
//   "category": "Music"
// }
//create DisplayCat
const displayCategories = (categories) => {
  categoryContainer = document.getElementById('categories');
  //add data in html
  categories.forEach((item) => {
    console.log(item);
    //create a button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML=
    `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" 
    class="btn category-btn">
    ${item.category}
    </button>
    
    
    `
    //add button to categories container
    categoryContainer.appendChild(buttonContainer);

  })
}

//create displayVideos
// const cardDemo={
//   {
//     category_id: "1001",
//     video_id: "aaaa",
//     thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//     title: "Shape of You",
//     authors: [
//         {
//             profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             profile_name: "Olivia Mitchell",
//             verified:true
//         }
//     ],
//     others: {
//         views: "100K",
//         posted_date:"16278"
//     },
//     description: "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
// }
const displayVideos = (videos) => {
  videoContainer = document.getElementById('videos');
  videoContainer.innerHTML="";
  if(videos.length==0){
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML=
    `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="assets/Icon.png" />
    <h2 class="text-center text-xl font-bold ">
    No Content Here in this Category
    </h2>
    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add('grid');
  }
  //adding or displaying videos in html 
  videos.forEach((item) => {
    console.log(item);
    //create a video card-box
    const videoCard = document.createElement('div');
    videoCard.classList = "card card-compact";
    videoCard.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${item.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${item.others.posted_date.length == 0 ? "" :
        `<span class="absolute right-2 text-xs bottom-4 text-white
         bg-black rounded p-1">${getTimeString(item.others.posted_date)}
         </span>
        `
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div> 
    <img class="w-10 h-10 rounded-full object-cover"
     src=${item.authors[0].profile_picture} />
    </div>
    <div> 
   <h2 class="font-bold">${item.title}</h2>
   <div class="flex items-center gap-2">
   <p class="text-gray-400">${item.authors[0].profile_name}</p>
    ${item.authors[0].verified == true ? `<img class="w-5 h-5 rounded-full object-cover"
    src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&for
    mat=png" />`: ""}
   </div>
   <p><button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">Details</button></p>
    </div>
  </div>
    
    `;
    //adding the video card in the video container
    videoContainer.appendChild(videoCard);
  })
}

const loadDetails=async (videoId)=>{
    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res= await fetch(uri); 
    const data= await res.json();
    displayDetails(data.video)
}
const displayDetails=(video)=>{
const detailContainer=document.getElementById('modal-content');
detailContainer.innerHTML=
`
<img src="${video.thumbnail}" />
<p>${video.description}</p>
`
//way-1
// document.getElementById('showModalData').click();
//way-2
document.getElementById('customModal').showModal();
}

function getTimeString(time){
  const hour=parseInt(time/3600);
  let remainingSecond=time%3600;
  const minute=parseInt(remainingSecond/60);
  remainingSecond=remainingSecond % 60;
  return `${hour}hr ${minute}min ${remainingSecond}sec ago`
}

document.getElementById('search-input').addEventListener("keyup",(event)=>{
  loadVideos(event.target.value);
})