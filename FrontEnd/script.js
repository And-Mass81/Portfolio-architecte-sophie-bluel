//import API_URL from './config.js'

// -------------------------------edit options----------------------------------------
document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("passOk") === null) {
    document.querySelector('.edition').style.display = 'none';
    document.querySelectorAll(".modifIcon ").forEach(e => e.style.display = 'none');
    document.querySelector('.log-out').style.display = 'none';
    document.querySelector('.buttonsList').style.display = 'flex';
  }

  if (localStorage.getItem("passOk") != null) {
    document.querySelector('.log-in').style.display = 'none';
    document.querySelector('.buttonsList').style.display = 'none';
  }

})

// -------------------------------Gallery----------------------------------------
const displayGallery = () => {

  fetch("http://localhost:5678/api/works")
    // 1 we need to feed a URL to fetch and its gonna give us back a Promise (async) its gonna open two path "ok and error" then and catch
    .then(success => success.json())
    // 2 we can get the data in a JASON form but its coming back as anothe promise.
    .then(data => {
      let galleryItem = ''

      for (let figure of data) {
        galleryItem +=
          // with += i create an elemente and i add one too for each figure 
          `
          <figure  data-id=${figure.id} data-category-photo="${figure.categoryId}" class="figureContainer" >
            <img src="${figure.imageUrl}" alt="${figure.title}">
            <figcaption>${figure.title}</figcaption>
          </figure>
          `
        /* The idea of this code is to first create all the HTML and then inject it, 
        this way we don't need to call innerHTML (it consumes a lot of resources) every time we create an element. */

      }

      document.querySelector('.gallery').innerHTML = galleryItem

      //--------DeleteAll---------------------------------------
      //const deleteAll = document.querySelector('.deleteGallery')

      document.querySelector('.deleteGallery').addEventListener('click', (e) => {
        data.forEach(item => deletePic(item.id))
        document.querySelectorAll('.figureContainer').forEach(item => deletePic(item.dataset.id,item))
      })

      //--------modal gallery---------------------------------------
      let modalGalleryPic = ''

      for (let MiniFigure of data) {
        modalGalleryPic +=
          ` 
      <figure data-id=${MiniFigure.id} class="editPic">
        <span data-mini-id =${MiniFigure.id} class="deleteIcon"><i class="fa-solid fa-trash-can"></i></span>
        <img src="${MiniFigure.imageUrl}">
        <figcaption>éditer</figcaption>
      </figure>
      `

      }

      document.querySelector('.figContainer').innerHTML = modalGalleryPic

     //--------deletet pic---------------------------------------
       
      const deleteImg = document.getElementsByClassName('deleteIcon')
      for (let iconD of deleteImg) {
        iconD.addEventListener("click", (e) => {
          const numberId = iconD.dataset.miniId
          
          deletePic(numberId,e.target.closest('figure'))
          

          //console.log(numberId)
        })
        

      }
      

    })

    .catch(error => {
      console.log(error)
      console.log("something is not working")
    })
}

const displayFilters = () => {
  // filters : i need to do the fetch inside the fetch for the scope of the let data

  fetch("http://localhost:5678/api/categories")
    .then(idCategorie => idCategorie.json())
    .then(idCategorie => {

      let buttons = ''

      for (let button of idCategorie) {
        buttons += `<li data-number="${button.id}">${button.name}</li>`
      }

      document.querySelector('.buttonsList').innerHTML = buttons
      document.querySelector('.buttonsList').insertAdjacentHTML('afterbegin', '<li class="active" data-name="All">Tous</li>');

      const filterButtons = document.querySelectorAll(".buttonsList li")
      // filters Buttons

      const filterAll = result => {
        document.querySelector(".active").classList.remove("active");
        result.target.classList.add("active");

        //target interface is a reference to the object onto which the event was dispatched

        //filtre for figure 
        document.querySelectorAll(".figureContainer").forEach(indexFigure => {
          indexFigure.classList.add("hide");
          console.log(indexFigure.dataset) //get the full object for info 

          if (indexFigure.dataset.categoryPhoto === result.target.dataset.number || result.target.dataset.name === "All") {
            indexFigure.classList.remove("hide");


          }
          console.log(result.target.dataset.id, typeof result.target.dataset.id)
          console.log(indexFigure.dataset.categoryPhoto, typeof indexFigure.dataset.categoryPhoto,)

        })
      }

      filterButtons.forEach(button => button.addEventListener("click", filterAll))

    })
    .catch(err => console.log(err))
}

displayGallery()
displayFilters()

// ------------------------------- Delete pic----------------------------------------
const deletePic = (id,element) => {

  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('passOk'),
    },
  })
    .then((data) => {
      element.remove()
      document.querySelector(`figure[data-id='${id}']`).remove()
    })
    .catch((error) => console.log(error, "fetch error "));
};


// -------------------------------buttons----------------------------------------
const displayForm = document.getElementById("form-img") ;

const imgPreview = document.getElementById("imgPre") ;

const openEdit =  (x) => {
  document.querySelector('.galleryEdit').style.display = 'block';
}
const closeEdit = (x) => {
  document.querySelector('.galleryEdit').style.display = 'none';
}
const openUpload = (x) => {
  document.querySelector('.backOptions').style.display = 'block';  
  displayForm.style.display = "block";
  imgPreview.style.display = "none";
  imgPreview.setAttribute("src","");
  document.getElementById("uploadPicture").reset();
}
const closeUpload = (x) => {
  document.querySelector('.galleryEdit').style.display = 'none';
  document.querySelector('.backOptions').style.display = 'none';
}
const backGallery = (x) =>{
  document.querySelector('.backOptions').style.display = 'none';
}

const logOutBtn = (x) => {
  localStorage.removeItem("passOk");
  document.location.reload()
}

document.querySelector('.openEditGallery').addEventListener('click', openEdit)
document.querySelector('.closeEdit').addEventListener('click', closeEdit)
document.querySelector('.addPhoto').addEventListener('click', openUpload)
document.querySelector('.closeUpload').addEventListener('click', closeUpload)
document.querySelector('.backOption').addEventListener('click', backGallery)
document.querySelector('.log-out').addEventListener('click', logOutBtn)




// -------------------------------Send a pic----------------------------------------

document.getElementById("uploadPicture").addEventListener("submit", (event) => {
    event.preventDefault();
    let newImage = document.getElementById("file-input").files[0];
    let newTitle = document.getElementById("titre-add-picture").value;
    let newCategorie = document.getElementById("catego-select").value;

    if(newImage == undefined || newTitle === ""){
      console.log(newImage)
      console.log(newTitle)
      document.querySelector(".textErrorSend").style.display = 'block';
    }else{
      document.querySelector(".textErrorSend").style.display = 'none';
      document.querySelector('.backOptions').style.display = 'none';
    }
    
  
    const formData = new FormData();
    formData.append('image', newImage)
    formData.append('title', newTitle)
    formData.append('category', newCategorie)


    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('passOk'),
      },
      body: formData,
    })

      .then(res => res.json())
      .then(data => {
        displayGallery()
      })


      .catch(error => console.log(error));

      //document.querySelector('.backOptions').style.display = 'none';
 })

//display img


document.getElementById("file-input").addEventListener("change", function() {
 const file = this.files[0];
 //console.log(file);

 if(file){
   const imgUpFile = new FileReader(); //  this object its gonna read imgUpload

   displayForm.style.display = "none"
   imgPreview.style.display = "block"

    imgUpFile.addEventListener("load",function(){
    console.log(this);
    imgPreview.setAttribute("src",this.result);

   });

   imgUpFile.readAsDataURL(file);


 }else{
  displayForm.style.display = null;
  imgPreview.style.display = null;
  

 }

})





// ------------------------------- Mini Gallery----------------------------------------


 /*  fetch("http://localhost:5678/api/works")
    .then(success => success.json())
    .then(dataMini => {

      let modalGalleryPic = ''

      for (let MiniFigure of dataMini) {
        modalGalleryPic +=
          ` 
      <figure data-id=${MiniFigure.id} class="editPic">
        <span data-mini-id =${MiniFigure.id} class="deleteIcon"><i class="fa-solid fa-trash-can"></i></span>
        <img src="${MiniFigure.imageUrl}">
        <figcaption>éditer</figcaption>
      </figure>
      `

      }

      document.querySelector('.figContainer').innerHTML = modalGalleryPic

      const deleteImg = document.getElementsByClassName('deleteIcon')
      for(let iconD of deleteImg){
        iconD.addEventListener("click",(e)=> {
         const numberId = iconD.dataset.miniId
         deletePic(numberId)
         console.log(numberId)
        })

      }


    })


    .catch(error => {
      console.log(error)
      console.log("something is not working")
    }) */



 







//http://localhost:5678/api/works/3

//http://httpbin.org/post
//JSON.parse(localStorage.getItem("passOk")).token,

/* 

  fetch("http://localhost:5678/api/works",{
    method:"POST",
    body: formData,
  })


  let btnsDel = document.querySelectorAll('deleteIcon');

for (i of btnsDel) {
  i.addEventListener('click', function() {
    console.log("btn ok");
  });
}
 */