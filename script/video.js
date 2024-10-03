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
const loadVideos = async () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response) => response.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error))
}
loadVideos();
/**
/**
 {category_id: '1001', category: 'Music'}
 */
//create DisplayCat
const displayCategories = (categories) => {
  categoryContainer = document.getElementById('categories');
  //add data in html
  categories.forEach((item) => {
    console.log(item);
    //create a button
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category;
    //add button to categories container
    categoryContainer.appendChild(button);

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
  //adding or displaying videos in html 
  videos.forEach((item) => {
    console.log(item);
    //create a video card-box
    const videoCard = document.createElement('div');
    videoCard.classList="card card-compact";
    videoCard.innerHTML = `
    <figure>
    <img
      src=${item.thumbnail}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
    
    `;
    //adding the video card in the video container
    videoContainer.appendChild(videoCard);
  })
}
