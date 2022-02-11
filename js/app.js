//pravimo klasu Book u kojoj ce biti podaci o knjizi
//klasa je namenjena za pravljenje objekata za unete knjige
class Book{
    //konstruktor, parametri su podaci o knjizi koji se cuvaju
    constructor(title,author,isnb){
        this.title=title; 
        this.author=author;
        this.isnb=isnb;
    }
}

//kreira se klasa za UI, korisnicki interfejs
//klasa sluzi za pravljenje objekta koji sadrzi metode za dodavanje i brisanje knjiga iz HTML-a
class UI{
//metoda koja dodaje knjige u html, ima objekat book kao parametar
//parametar je knjiga, zatim se pomocu metoda ta knjiga upisuje u HTML
addBookToList(book){
//pristupa id book-list gde se nalaze liste knjiga u koje ce se dodate knjige zati upisati
const list=document.getElementById('book-list');
//pravi se element tr za red u tabeli, a zatim se redu dodaju elementi uzeti iz objekta
const row=document.createElement('tr'); 
//u napravljeni red se smestaju zatim podaci uz knjige koja je prosledjena kao objekat metodi addBookToList
row.innerHtml=`     
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isnb}</td>
<td><a href="" class="delete">X</a></td>
`;
//sada ovaj novi red dodajemo u listu
list.appendChild(row); 
}

//metoda koja daje upozorenja
showAlert(message, className){
    //pravimo div
    const div=document.createElement('div');
    //dodajemo mu ime css klase
    div.className=`alert ${className}`; 
    //upisujemo tekstualni sadrzaj unutar diva
    div.appendChild(document.createTextNode(message)); 
    //pristupa se elementu conteiner, on obuhvata html u kome se nalazi forma
    const container=document.querySelector('.container');
    //pristupa se formi
    const form=document.getElementById("book-form");
    //dodaje se upozorenje pomocu metode insertBefore
    container.insertBefore(div, form);

//postavljeno je da se ne bi odmah brisalo, vec da bi trajalo par sekundi dok se ne obrise
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);  //izrazeno u milisekundama
}
//metoda za brisanje knjige
//njen parametar target je element html-a na koji smo kliknuli
//metodu cemo pozivati u osluskivacu dogadjaja
deleteBook(target){
    //brise ako element na koji smo kliknuli ima klasu delete
    if (target.className==='delete'){
        //uklanja roditelj roditelja, odnosno kliknuli smo na iksic, a brise red u kome se knjiga se nalazi
        target.parentElement.parentElement.remove();
    }
}
//metoda koja prazni citavo polje
//pristupamo elementima forme i brisemo njihove vrednosti
clearFields(){
    if(confirm("Da li ste sigurni")){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isnb').value='';
    }
}
}

//osluskivaci dogadjaja 
//osluskivac dogadjaja za submit na formi
document.getElementById('book-form').addEventListener('submit',(e)=>{
//uzimaju vrednosti iz forme
const title=document.getElementById('title').value;
const author=document.getElementById('author').value;
const isnb=document.getElementById('isnb').value;

//kreiramo objekat book pomocu klase Book
const book=new Book(title, author, isnb);
//pravi se objekat za manipulaciju HTML-om
const ui=new UI();
//validacija proverava da li nesto nije uneto
if(title===''||author===''||isnb===''){ 
    //pozivamo metodu iz objekta ui koja daje poruku o gresci
    ui.showAlert('Nesto nije popunjeno', 'error');
}
else{
        //Dodavanje knjige listi, objekat knjiga sada ima upisane vrednosi iz inputa
        ui.addBookToList(book);
        //obavestenje da je knjiga dodata
        ui.showAlert("Knjiga je dodata", 'success');
        //brise se polje za unos nakon uspesnog dodavanja knjige
        ui.clearFields();
    }
    //sprecava da se refresuje stranica
    e.preventDefault();
});

//osluskivac dogadjanja za delete
document.getElementById('book-list').addEventListener('click', function(e){
    //kreira se ui
    const ui=new UI(); 
     //brise se knjiga na koju je kliknuto
    ui.deleteBook(e.target);
     //obavestava se korisnik o uspesnom brisanju
    ui.showAlert('Obrisali ste knjigu', 'succes');
     //sprecava se refresovanje stranice
    e.preventDefault();
});

