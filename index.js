function getCatagory(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>setCatagory(data.categories))
}

function getVideos(){
  activeAll()
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
.then(response=>response.json())
.then(result=>setVideos(result.videos))
}

const getCatagoryVideo=(id)=>{
  removeClass()
   const clickButton=document.getElementById(`id-${id}`)

clickButton.classList.add("active")

 fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(r=>r.json())
  .then(datas=>setVideos(datas.category))



  
}
function setCatagory(arrays){
   for(let arr of arrays){
    const cata=document.getElementById("catagory")
    const li=document.createElement("li")
    li.innerHTML=`
    <button id="id-${arr.category_id}" onclick="getCatagoryVideo(${arr.category_id})" class="btn hover:bg-red-500 hover:text-white">${arr.category}</button>`
    cata.appendChild(li)
   }
}
const removeClass=()=>{
  const activeButtons=document.getElementsByClassName("active")
  for(let activeButton of activeButtons){
        activeButton.classList.remove("active")
  }

  
}
function activeAll(){
  removeClass()
 const btnAll= document.getElementById("btn-all")

   btnAll.classList.add("active")
   
  
}
function loadVedioDescription(videoId){
 fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  .then(res=>res.json())
  .then(data=>displayVedioDescription(data))

}
const displayVedioDescription=(about)=>{
  const clickButton=document.getElementById('my_modal_1')
  clickButton.showModal()
  document.getElementById("aboutContainer").innerHTML=`
  <div class="card  image-full shadow-sm">
  <figure>
    <img
      src="${about.video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${about.video.title}</h2>
    <p>${about.video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  
  
  
  `

  

}

const inputTitle=(event)=>{
 const searchInput=document.getElementById("searchInput")
fetch(` https://openapi.programming-hero.com/api/phero-tube/videos?title=${event.target.value}`)
.then(res=>res.json())
.then(catVideos=>setVideos(catVideos.videos))

}

// {"category_id":"1001","video_id":"aaaa","thumbnail":"https://i.ibb.co/L1b6xSq/shape.jpg","title":"Shape of You","authors":[{"profile_picture":"https://i.ibb.co/D9wWRM6/olivia.jpg","profile_name":"Olivia Mitchell","verified":""}],"others":{"views":"100K","posted_date":"16278"},"description":"Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."}
const setVideos=(medias='')=>{
   const ved=document.getElementById("displayVedio");
        ved.innerHTML="";
        if(medias.length===0){
          
         ved.innerHTML=`
                  <div class="col-span-4 text-center flex flex-col justify-center items-center py-30 pl-20">
    <img src="./images/Icon.png" alt="">
    <h2 class="text-3xl font-bold">Oops!!There is no content here.</h2>

  </div>
         
         `
         return;

        }
    medias.forEach(media => {
       
        const section=document.createElement("section")
        section.innerHTML=`
             <div class="card bg-base-100 w-11/12">
  <figure>
    <img
      src="${media.thumbnail}"
      alt="" class="w-full h-[170px] object-cover" />
  </figure>
  <div class=" flex items-start gap-3 px-0 py-4">
    <div class="avatar">
  <div class="w-10 px-0 rounded-full">
    <img src="${media.authors[0].profile_picture}" />
  </div>
</div>
    <div>
        <h2 class="card-title">${media.title}</h2>
        <p class="text-gray-500 font-normal py-1 flex items-center gap-1">${media.authors[0].profile_name} 
        ${media.authors[0].verified ? '<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-5 h-5">' : ''}
        
        </p>
        <p class="text-gray-500 font-normal">${media.others.views} Views</p>
         


    </div>
   
    </div>
    <button class="btn btn-block mb-4" id="clickedBtn"onclick=loadVedioDescription('${media.video_id}')>Show Details</button> 
   
  </div>
        `
        ved.appendChild(section)
    });
}

getCatagory()
