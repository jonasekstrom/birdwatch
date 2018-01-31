document.getElementById('login').addEventListener('click', signIn);
var user = '';
var provider = new firebase.auth.GoogleAuthProvider();
function signIn(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        showWelcome();
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

function showWelcome(){
       var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        output = document.getElementById('output');
        output.innerHTML = `
        Welcome ${name}<br>
        ${photoUrl}    
        
        `;
}
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDUPX8amWPuFK5duOHLnO9J7hv7BZEc44A",
    authDomain: "test-a16e2.firebaseapp.com",
    databaseURL: "https://test-a16e2.firebaseio.com",
    projectId: "test-a16e2",
    storageBucket: "",
    messagingSenderId: "939899840756"
};
firebase.initializeApp(config);
/*
const newBird = {
    namn: 'Skata',
    färg: 'Grå',
    vingspann: '5 meter',
    hemland: 'Grönland'
};
const newBird2 = {
    namn: 'Fiskmås',
    färg: 'Grå',
    vingspann: '15 meter',
    hemland: 'Grönland'
};

const db = firebase.database();
console.log('Adding to database...');
//db.ref('Bird1/').push(newBird);
//db.ref('Bird1/').push(newBird2);
//db.ref('Bird2/').set(newBird2);
//db.ref('Bird1/').set(newBird);
console.log('Finished adding to database.');
// push - lägga till nytt objekt
// set - ändra befintliga
db.ref('/').on('value', function(snapshot) {
console.log('On value: hämtar hela databasen.');
let data = snapshot.val();
console.log(data);
let divBird = document.getElementById('bird');
for( let bird in data ) {
    let r = data[bird];
    console.log(`Fågeln ${r.namn} egenskaper är: `, data[bird]);
    const newDiv = document.createElement('div');
    let str = JSON.stringify(r);
    newDiv.innerHTML = `<strong>${r.namn}</strong><br/> Färg: 
    ${r.färg}</br/> Vinnspan: ${r.vingspann}<br>Hemland: ${r.hemland}<br><br>`;
    divBird.appendChild(newDiv);
}
})
*/
document.addEventListener("DOMContentLoaded", function(event) {
    const db = firebase.database();
    db.ref('/').on('value', function(snapshot) {
        console.log('On value: hämtar hela databasen.');
        let data = snapshot.val();
        console.log(data);
        const list = document.getElementById('bird-list');
        for( let bird in data ) {
            let r = data[bird];
            console.log(`Fågeln ${r.name} egenskaper är: `, data[bird]);
            const row = document.createElement('tr');
            let str = JSON.stringify(r);
            row.innerHTML = `
    <td>${r.name}</td>
    <td>${r.color}</td>
    <td>${r.width}</td>
    <td>${r.origin}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
        }
        })
  });
class Bird {
    constructor(name,color,width,origin){
        this.name = name;
        this.color = color;
        this.width = width;
        this.origin = origin;
    }
}
class Ui {
    addBirdToList(bird){
   
        
        const db = firebase.database();
        console.log('Adding to database...');
        db.ref('/').push(bird);
        console.log('Finished adding to database.');
        db.ref('/').on('value', function(snapshot) {
            console.log('On value: hämtar hela databasen.');
            let data = snapshot.val();
            console.log(data);
            const list = document.getElementById('bird-list');
            for( let bird in data ) {
                let r = data[bird];
                console.log(`Fågeln ${r.name} egenskaper är: `, data[bird]);
                const row = document.createElement('tr');
                let str = JSON.stringify(r);
                row.innerHTML = `
        <td>${r.name}</td>
        <td>${r.color}</td>
        <td>${r.width}</td>
        <td>${r.origin}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
            }
            })


    }

    showAlert(message, className){
        // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#bird-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
    }

    deleteBird(target){
        const db = firebase.database();
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            db.ref('/').remove(target);
        }
    }

    clearFields(){
        document.getElementById('birdName').value = '';
        document.getElementById('birdColor').value = '';
        document.getElementById('birdWidth').value = '';
        document.getElementById('birdOrigin').value = '';
    }
};

// event listeners
document.getElementById('bird-form').addEventListener('submit', function(event){
    const name = document.getElementById('birdName').value,
        color = document.getElementById('birdColor').value,
        origin = document.getElementById('birdOrigin').value;
        width = document.getElementById('birdWidth').value;
    // instantiate bird
    const bird = new Bird(name, color, width, origin);
    console.log(bird);
    // instantiate ui
    const ui = new Ui();
    
    //validate
    if(name === '' || color === '' || width === '' || origin === ''){
        // error alert
        ui.showAlert('Var vänlig och fyll i alla fält', 'error')
    } else {
        // add bird to list
        ui.addBirdToList(bird);
        
        // show success
        ui.showAlert('Fågel Tillagd', 'success');
        // clear fields
        ui.clearFields();
    }

    event.preventDefault();
});
// event listener for delete
document.getElementById('bird-list').addEventListener('click', function(event){
   
    // instantiate ui
    const ui = new Ui();
    
    // delete bird
    ui.deleteBird(event.target);

    // show message 
    ui.showAlert('Fågel Borttagen', 'success');


    event.preventDefault();
})
