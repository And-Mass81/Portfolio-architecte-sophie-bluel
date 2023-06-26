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
        <figure  data-category-photo="${figure.categoryId}" class="figureContainer" >
				<img src="${figure.imageUrl}" alt="${figure.title}">
				<figcaption>${figure.title}</figcaption>
		    </figure>
        `
      /* The idea of this code is to first create all the HTML and then inject it, 
      this way we don't need to call innerHTML (it consumes a lot of resources) every time we create an element. */
    }

    document.querySelector('.gallery').innerHTML = galleryItem

    // filters : i need to do the fetch inside the fetch for the scope of the let data

    fetch("http://localhost:5678/api/categories")
      .then(idCategorie => idCategorie.json())
      .then(idCategorie => {

        let buttons = ''

        for (let button of idCategorie) {

          buttons +=
            `
        <li data-number="${button.id}">${button.name}</li>
        
        `

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

        console.log(idCategorie)
        console.log(data)


      })

  })

  .catch(error => {
    console.log(error)
    console.log("something is not working")
  })

// -------------------------------Modal----------------------------------------
/* const openEdit = function (e){
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  console.log('goin ok')
  target.classList.add('.hiden')
  target.setAttribute('arial-hidden')
  target.setAttribute('arial-modal','true')
  
}

document.querySelectorAll('.openEditGallery').forEach(x => {
  x.addEventListener('click',openEdit)
}) */

const openEdit = function (x){
  document.querySelector('.galleryEdit').style.display ='block';
}
const closeEdit = function (x){
  document.querySelector('.galleryEdit').style.display ='none';
}
const openUpload = function (x){
  document.querySelector('.backOptions').style.display ='block';
}
const closeUpload = function (x){
  document.querySelector('.backOptions').style.display ='none';
}

document.querySelector('.openEditGallery').addEventListener('click', openEdit)
document.querySelector('.closeEdit').addEventListener('click', closeEdit)
document.querySelector('.addPhoto').addEventListener('click', openUpload)
document.querySelector('.closeUpload').addEventListener('click', closeUpload)



