const searchInput = document.getElementById('search')
const submitBtn = document.getElementById('btn')
const toggleBtn = document.querySelector('.toggle-btn')
const sidebar = document.getElementById('sidebar-menu')
const logo = document.querySelector('.logo')
const nav = document.getElementById('sidebar-menu')
const div = document.getElementById('books')
const ul = document.createElement('ul')
const li = document.createElement('li')


function addToReadingList(img,title){
    // console.log(bookData)
    console.log(img,title)
    ul.classList.add('list')
    nav.appendChild(ul)
    // li.classList.add('list-item')
    // li.innerHTML += `
    //     <img src="${img}" alt="" srcset="">
    //     <p>${title}</p>
    //  `
    console.log(li)
    document.querySelector('.list').insertAdjacentHTML('beforeend',`<li class= "list-item"> <img src="${img}" alt="" srcset="">
    <p>${title}</p></li>`)
    //document.querySelector('.list').appendChild(li)
    
   
    
}


submitBtn.addEventListener('click', () => {
    const value = searchInput.value
    const url = `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyCTJGcStF9z0N0m92jKe9AErERjBOJcZZo`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        //data.items = array consisting of 10 objects
        console.log(data['items'])
       

        



        div.innerHTML = ``

       
        
        for(key in data['items']){
            // container = document.createElement('div')
            // container.innerHTML = `
            // <img src="${data['items'][key]['volumeInfo']['imageLinks'].thumbnail}" alt="" srcset="">
            // <h2>${data['items'][key]['volumeInfo'].title}</h2>
            // <p>${data['items'][key]['volumeInfo'].description}</p> ` 
            
            let container = document.createElement('article')
            container.classList.add('book-card')
            container.innerHTML = `
                <picture class="book-image">
                    <img src="${data['items'][key]['volumeInfo']['imageLinks'].thumbnail}" alt="" srcset="">
                </picture>

                    <div class="book-content">
                    <h1>${data['items'][key]['volumeInfo'].title}</h1>
                    <p>${data['items'][key]['volumeInfo'].description}</p>
                    <p class="author"><span class="author-span">Author: ${data['items'][key]['volumeInfo'].authors.toString()}</span> </p>

                
                </div>

                <div class= "btn-div"><button class="btn" onclick = "addToReadingList('${data['items'][key]['volumeInfo']['imageLinks'].thumbnail}','${data['items'][key]['volumeInfo']['title']}')">Add to Reading List</button></div>
            
                ` 
            
            // console.log(data['items'][key]['volumeInfo'].authors.toString())
            div.appendChild(container)
       }  
       
       
      
})
})


toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active')
    logo.classList.toggle('logo-active')
    toggleBtn.classList.toggle('toggle-active')
    document.querySelector('.list').classList.toggle('list-active')
})

document.addEventListener('DOMContentLoaded', () =>{

   div.innerHTML = `
    <h1 class="search-book">Search A Book</h1>
   ` 
})