const datosdelacuenta = document.querySelector('.datosdelacuenta');
const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');

const configurarMenu = (user) => {
    if (user) {
        db.collection('usuarios').doc(user.uid).get().then(doc => {
            const html = `
                <p>Nombre: ${ doc.data().nombre }</p>
                <p>Correo: ${ user.email}</p>
                <p>Teléfono: ${ doc.data().telefono }</p>
                <p>Dirección: ${ doc.data().direccion }</p>
                <p>Coordenadas: ${ doc.data().coordenadas.latitude } , ${ doc.data().coordenadas.longitude }</p>
            `;

            datosdelacuenta.innerHTML = html;
        })        
        listaloggedin.forEach(item => item.style.display = 'block');
        listaloggedout.forEach(item => item.style.display = 'none');
    } else {
        listaloggedin.forEach(item => item.style.display = 'none');
        listaloggedout.forEach(item => item.style.display = 'block');
    }
};


const obtieneAmigos = (data) => {
    var mapa = document.querySelector("#map");
    console.log(data);
    var propiedades = {
        center: {
            lat: 21.4787645, lng: -101.2159166
        },
        zoom: 14
    }
    var map = new google.maps.Map(mapa,propiedades);


    data.forEach(doc => {
        informacion = new google.maps.InfoWindow;
        let posicion = {    
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        informacion.setPosition(posicion);
        informacion.setContent(doc.data().nombre);
        informacion.open(map);
    });
    /*data.forEach( doc => {
        informacion = new google.maps.InfoWindow;
        var pos = { 
            lat: doc.data().coordenadas.latitude,
            lng: doc.data().coordenadas.longitude
        };
        informacion.setPosition(pos);
        informacion.setContent(doc.data().nombre);
        informacion.open(map);

    });*/

};