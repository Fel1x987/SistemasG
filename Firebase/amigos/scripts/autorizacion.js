auth.onAuthStateChanged(user =>{
    console.log(user);
    if(user){    
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                db.collection('usuarios').doc(user.uid).update({
                    coordenadas : {
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude
                    }
                });
            });
        }
        db.collection('usuarios').onSnapshot(snapshot =>{
            obtieneAmigos(snapshot.docs);            
        });        
        configurarMenu(user);
    } else {
        obtieneAmigos([]);
        configurarMenu();
    }
});
const formaingresar = document.getElementById("formaingresar");
formaingresar.addEventListener('submit', (e) =>{
    e.preventDefault();
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then(cred =>{
        console.log("Entro (y)");
        $('#ingresarmodal').modal('hide');
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';
    }).catch(err =>{
        console.log(err);
        formaingresar.querySelector('.error').innerHTML = messageError(err.code);
    });
});

function messageError(codigo){
    let message = '';
    switch(codigo){
        case 'auth/wrong-password':
            message = "Contraseña Incorrecta";
            break;
        case 'auth/user-not-found':
            message = "Usuario no encontrado";
            break;
        case 'auth/weak-password':
            message = "Contraeña muy débil :(";
            break;
        default:
            message = codigo;
    }
    return message;
}

const salir = document.getElementById("salir");
salir.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut().then(() => {
        alert('Se ha cerrado sesión');
    });
});

const formaregistrate = document.getElementById("formaregistrar");

formaregistrate.addEventListener('submit', (e)=>{
    e.preventDefault();
    const correo = formaregistrate['rcorreo'].value;
    const contrasena = formaregistrate['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo, contrasena).then(cred => {
        console.log("Se creo el usuario " + correo);   
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre : formaregistrate['rnombre'].value,
            telefono : formaregistrate['rtelefono'].value,
            direccion : formaregistrate['rdireccion'].value
        });//A la coleccion de user, con esa id recien creado, se hara un set para que cree el docuemnt
    }).then(()=>{
        $('#registrarmodal').modal('hide');
        formaregistrate.reset();
        formaregistrate.querySelector('.error').innerHTML = '';
    }).catch(err =>{        
        formaregistrate.querySelector('.error').innerHTML = messageError(err.code);
    });
});

entrarGoogle = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;
        let html = `
        <p style="color: white;">Nombre: ${user.displayName}</p>
        <p style="color: white;">Correo: ${user.email}</p>
        <img src="${user.photoURL}"></img>
        `;

        datosdelacuenta.innerHTML = html;
        $('#ingresarmodal').modal('hide');

        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch(function(error){
        console.log("Error " + error)
    });
}