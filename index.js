const searchInput = document.getElementById('search')
const submitBtn = document.getElementById('btn')
const toggleBtn = document.querySelector('.toggle-btn')
const sidebar = document.getElementById('sidebar-menu')
const logo = document.querySelector('.logo')
const nav = document.getElementById('sidebar-menu')
const div = document.getElementById('books')
const ul = document.createElement('ul')
const li = document.createElement('li')

//adds books that have been selected to the to be read list
function addToReadingList(img,title){
    // console.log(bookData)
    console.log(img,title)
    ul.classList.add('list')
    nav.appendChild(ul)
    console.log(li)
    document.querySelector('.list').insertAdjacentHTML('beforeend',`<li class= "list-item"> <img src="${img}" alt="" srcset="">
    <p>${title}</p>   <div><button class="btn-remove" onclick = "removeBook()">Remove</button></div></li>`)
  
}

//Fetch data from google book api and creates cards to display data on web page
submitBtn.addEventListener('click', () => {
    const value = searchInput.value
    const API_KEY = 'AIzaSyCTJGcStF9z0N0m92jKe9AErERjBOJcZZo'
    const url = `https://www.googleapis.com/books/v1/volumes?q=${value}&orderBy=relevance&printType=all&key=${API_KEY}`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        //data.items = array consisting of 10 objects
        console.log(data['items'])

        div.innerHTML = ``

        for(key in data['items']){
            
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
            div.appendChild(container)
       }  
          
})
})

//Toogle button event listener for the sidebar menu
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active')
    logo.classList.toggle('logo-active')
    toggleBtn.classList.toggle('toggle-active')
    document.querySelector('.list').classList.toggle('list-active')
})

//Event Listener when web page loads
document.addEventListener('DOMContentLoaded', () =>{

   div.innerHTML = `
    <h1 class="search-book">Search A Book</h1>
   ` 
})

//Remove book from reading list
function removeBook(){
    document.querySelector('.list-item').remove()
    alert("Book has been removed")
}