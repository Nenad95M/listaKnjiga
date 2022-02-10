class Book{
    //konstruktor
    constructor(title,author,isnb){
        this.title=title;
        this.author=author;
        this.isnb=isnb;
    }
}

//kreiranje klase za UI, prikaz u DOM-u
class UI{
    addBookToList(book){
    const list=document.getElementById('book-list');
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isnb}</td>
    <td><a href="" class="delete">X</a></td>
    `;
    list.appendChild(row);
}
showAlert(message, className){
    const div=document.getElementById('div');

    div.className=`alert ${className}`;
    div.appendChild(document.createTextNode(message));
    
    const container=document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
}

 deleteBok(target){
      if(target.className==='delete'){
          target.parentElement.parentElement.remove();
      }
 }

 clearFields(){
     document.getElementById('title').value='';
     document.getElementById('author').value='';
     document.getElementById('isnb').value='';

 }

}

