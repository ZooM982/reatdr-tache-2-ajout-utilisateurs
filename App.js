
/* FONCTION POUR LA VALIDATION DES DONNEES SAISIE */

function validateForm(){
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    if (prenom == ""){
        alert("Le prénom est obligatoire");
        return false;
    }

    if (nom == ""){
        alert("Le Nom est obligatoire");
        return false;
    }

    if (email == ""){
        alert("L'adress Email est obligatoire");
        return false;
    }
    if (phone == ""){
        alert("Le numéro de télephone est obligatoire");
        return false;
    }

    return true;
}

/* FONCTION POUR AFFICHER LES DONNEES UTILSATEUR SAISIE SUR LE DOM */

function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>"+ element.prenom +"</td>"
        html += "<td>"+ element.nom +"</td>"
        html += "<td>"+ element.email +"</td>"
        html += "<td>"+ element.phone +"</td>"
        html += '<td><button onclick="updateData('+
        index+')" class="btn btn-warning" id="modifier"><i class="fa-solid fa-pencil"></i></button> <button onclick="deleteData('+
        index+')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>';
        html += "</tr>"
    });

    
    document.querySelector("#addData tbody").innerHTML = html;

}

document.onload = showData();

/* FONCTION POUR AJOUTER LES DONNEES UTILISATEUR   */

function AddData(){

    if (validateForm () == true ){
       
        var prenom = document.getElementById("prenom").value;
        var nom = document.getElementById("nom").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

        var peopleList;
            if (localStorage.getItem("peopleList") == null){
                peopleList = [];
            }
            else{
                peopleList = JSON.parse(localStorage.getItem("peopleList"))
            }

            peopleList.push({
            prenom : prenom,
            nom : nom,
            email : email,
            phone : phone,
            });
        
            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();
            document.getElementById("prenom").value = "";
            document.getElementById("nom").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
    }
}

/* FONCTION POUR SUPPRIMER UN UTLISATEUR DEJA INSCRIT DANS LA BASE DE DONNEES LOCALE */

function deleteData(index){
    var peopleList;
        if (localStorage.getItem("peopleList") == null){
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

/* FONCTIONS POUR MODIFIER ET FAIRE LA MISE A JOUR DES DONNEES UTILISATEURS DANS LA BASE DE DONNEES LOCALE */

function updateData(index){
    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";

    var peopleList;
        if (localStorage.getItem("peopleList") == null){
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }
    
        document.getElementById("prenom").value = peopleList[index].prenom;
        document.getElementById("nom").value = peopleList[index].nom;
        document.getElementById("email").value = peopleList[index].email;
        document.getElementById("phone").value = peopleList[index].phone;

        document.querySelector("#Update").onclick = function (){
            if (validateForm () == true){
                peopleList[index].prenom = document.getElementById("prenom").value;
                peopleList[index].nom = document.getElementById("nom").value;
                peopleList[index].email = document.getElementById("email").value;
                peopleList[index].phone = document.getElementById("phone").value;

                localStorage.setItem("peopleList", JSON.stringify(peopleList))

                showData();

                document.getElementById("prenom").value = "";
                document.getElementById("nom").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";

                document.getElementById("Submit").style.display="block";
                document.getElementById("Update").style.display="none";
            }
        }
}

