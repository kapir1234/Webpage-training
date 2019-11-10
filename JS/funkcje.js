function dodajTosta(){
    var tost = {};
    tost.nazwa = document.getElementById('nazwa').value;
    tost.pieczywo = document.getElementById('pieczywo').value;
    tost.ser = document.getElementById('ser').value;
    tost.dodatek1 = document.getElementById('dodatek_1').value;
    tost.dodatek2 = document.getElementById('dodatek_2').value;
    var lista = JSON.parse(localStorage.getItem('lista'));
    if (lista === null)
        lista = [];
    lista.push(tost);
    localStorage.setItem('lista', JSON.stringify(lista));
    pokazListe();
}

function pokazListe(){
    var lista = JSON.parse(localStorage.getItem('lista'));
    var el = document.getElementById('list');
    var str = " ";
    if (lista.length === 0){
        str += "<p style='text-align: center;'>Brak zapisanych tostów</p>";
    } else {
        for (i = 0; i < lista.length; i++)
        {
            str += "<div class='rekord'>";
            str += "<button class='usun' onclick='usunTosta(" + i + ")' > Usuń </button>  ";
            str += "<button class='edytuj' onclick='edytujTost(" + i + ")' > Edytuj </button>";
            str += " Tost " + lista[i].nazwa + " z pieczywa " + lista[i].pieczywo + " z ";
            str += lista[i].ser + " serem i z dodatkami: " +lista[i].dodatek1 + ", ";
            str += lista[i].dodatek2 + ".</div>";
            str += "<div class='line-separator' id='edit["+i+"]'></div>"
        }
    }
    el.innerHTML = str;
}

function usunTosta(i) {
    var lista = JSON.parse(localStorage.getItem('lista'));
    lista.splice(i, 1);
    localStorage.setItem('lista', JSON.stringify(lista));
    pokazListe();
}

function edytujTost(i){
    pokazListe();
    var lista = JSON.parse(localStorage.getItem('lista'));
    var str="";
    var el = document.getElementById('edit['+i+']');
    str += "<fieldset><legend>Edycja: (Tost zostanie dodany na koniec listy)</legend>";
    str += "<table class='editTable'><tr><td><label>Nazwa Tosta:</label></td><td><input class='edycja' id='newNazwa' type='text' name='nazwa' required pattern='^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ ]{2-20}$' title='Należy podać nazwę tosta' value='"+lista[i].nazwa +"'/></td></tr>";
    if(lista[i].pieczywo == "pszennego") str += "<tr><td><label>Rodzaj pieczywa: </label></td><td><select class='edycja' name='Pieczywo' id='newPieczywo'><option value='pszennego' selected='selected'>Pszenne</option><option value='razowego'>Razowe</option><option value='ciemnego'>Ciemne</option></select></td></tr>"
    if(lista[i].pieczywo == "razowego") str += "<tr><td><label>Rodzaj pieczywa: </label></td><td><select class='edycja' name='Pieczywo' id='newPieczywo'><option value='pszennego' >Pszenne</option><option value='razowego'selected='selected'>Razowe</option><option value='ciemnego'>Ciemne</option></select></td></tr>"
    if(lista[i].pieczywo == "ciemnego") str += "<tr><td><label>Rodzaj pieczywa: </label></td><td><select class='edycja' name='Pieczywo' id='newPieczywo'><option value='pszennego' >Pszenne</option><option value='razowego'>Razowe</option><option value='ciemnego'selected='selected'>Ciemne</option></select></td></tr>"
    if(lista[i].ser == "zoltym") str += "<tr><td><label>Rodzaj sera: </label></td><td><select class='edycja' name='Ser' id='newSer'><option value='zoltym' selected='selected'>Żółty</option><option value='plesniowym'>Pleśniowy</option><option value='bialym' >Biały</option></select></td></tr>"
    if(lista[i].ser == "plesniowym") str += "<tr><td><label>Rodzaj sera: </label></td><td><select class='edycja' name='Ser' id='newSer'><option value='zoltym' >Żółty</option><option value='plesniowym'selected='selected'>Pleśniowy</option><option value='bialym' >Biały</option></select></td></tr>"
    if(lista[i].ser == "bialym") str += "<tr><td><label>Rodzaj sera: </label></td><td><select class='edycja' name='Ser' id='newSer'><option value='zoltym'>Żółty</option><option value='plesniowym'>Pleśniowy</option><option value='bialym' selected='selected'>Biały</option></select></td></tr>"
    str += "<tr><td><label>Dodatek 1: </label></td><td><input class='edycja' id='newDodatek_1' type='text' name='dodatek_1'pattern='^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ ]{2-20}$' title='Należy podać pierwszy dodatek' value='"+lista[i].dodatek1 +"'/></td></tr>"
    str += "<tr><td><label>Dodatek 2: </label></td><td><input class='edycja' id='newDodatek_2' type='text' name='dodatek_2'pattern='^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ ]{2-20}$' title='Należy podać drugi dodatek' value='"+lista[i].dodatek2 +"'/></td></tr>"
    str += "<tr><td colspan='2'><button class='nadpisz' onclick='nadpiszTosta(" + i + ")' > Nadpisz </button></td></tr></table></fieldset>  ";
    el.innerHTML = str;
}

function nadpiszTosta(i){
    var tost = {};
    tost.nazwa = document.getElementById('newNazwa').value;
    tost.pieczywo = document.getElementById('newPieczywo').value;
    tost.ser = document.getElementById('newSer').value;
    tost.dodatek1 = document.getElementById('newDodatek_1').value;
    tost.dodatek2 = document.getElementById('newDodatek_2').value; 
    var lista = JSON.parse(localStorage.getItem('lista'));
    lista.splice(i,1,tost);
    localStorage.setItem('lista', JSON.stringify(lista));
    pokazListe();
}