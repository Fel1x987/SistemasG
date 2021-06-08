const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const datosdelacuenta = document.querySelector('.datosdelacuenta');

const configuraMenu = (user) => {
    if (user) {
        db.collection('usuarios').doc(user.uid).get().then(doc => {
            const html = `
                <p style="color: white">Nombre: ${doc.data().nombre}</p>
                <p style="color: white">Correo: ${user.email}</p>
                <p style="color: white">Teléfono: ${doc.data().telefono}</p>
                <p style="color: white">Dirección: ${doc.data().direccion}</p>            
            `;
            datosdelacuenta.innerHTML = html;
        });

        listaloggedin.forEach(item => item.style.display = 'block');
        listaloggedout.forEach(item => item.style.display = 'none');
    } else {
        datosdelacuenta.innerHTML = '';
        listaloggedin.forEach(item => item.style.display = 'none');
        listaloggedout.forEach(item => item.style.display = 'block');
    }
}

const cargarMapa = () => {    
    var strokecolorchange = '';
    var informacion =  "<h2>Aquí comienza su aventura!</h2>";        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
            var posicion = {
                lat: position.coords.latitude,                            
                lng: position.coords.longitude
                }   
            var propiedades = {
                center: {
                lat: position.coords.latitude, lng: position.coords.longitude
                },
                zoom: 8
                }; 
                
                fetch('locations.json')
                    .then(function(response){                        
                        response.json().then(function(municipios){                            
                            var datos = document.getElementById("data");
                                var html = `
                                <table class="table table-dark table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Ciudad</th>
                                    <th scope="col">País</th>
                                    <th scope="col">Visitantes/año</th>                            
                                    </tr>
                                </thead>
                                <tbody>                        
                                `;
                                var coordlines = [];
                                coordlines.push(posicion);
                            municipios.forEach(municipio => {
                                let propiedadesMarcador = {
                                    position: municipio.coordenadas,
                                    map,
                                    title: "Marcardor"
                                    }
                                    const marcador = new google.maps.Marker(propiedadesMarcador);
                                    map.setCenter(posicion)
                                    var gg = `<div class="div">
                                            <h2>${municipio.nombre}</h2> <br>
                                            <h6>${municipio.desc}</h6>
                                            </div>`;
                                    const infowindow = new google.maps.InfoWindow({                                        
                                        content : gg                                
                                    })
                                    marcador.addListener("click", ()=>{                        
                                    infowindow.open(map,marcador);
                                })
                                if (municipio.habitantes){
                                    strokecolorchange = '#FF0000'
                                } else {
                                    strokecolorchange = '#0000FF'
                                }
                                coordlines.push(municipio.coordenadas);
                                var circle = new google.maps.Circle({
                                strokeColor: strokecolorchange,
                                strokeOpacity: 0.5,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: map,
                                center : municipio.coordenadas,
                                radius : Math.sqrt(municipio.habitantes) * 40
                                });
                                html += `
                                <tr>
                                <th scope="row">${municipio.nombre}</th>
                                <td>${municipio.estado}</td>
                                <td>${municipio.habitantes}</td>                        
                                </tr>
                                `;                                                
                            });
                            console.log(coordlines);
                            var trazo = new google.maps.Polyline({
                                path: coordlines,                              
                                strokeColor: strokecolorchange,
                                strokeOpacity: 1,
                                strokeWeight: 1,
                                geodesic:false            
                            });    
                            trazo.setMap(map);
                            html += `</tbody>
                                    </table>`;
                            datos.innerHTML = html;                                         
                        });
                    });                
                var map = new google.maps.Map(document.getElementById("map"), propiedades);                 
                let propiedadesMarcador = {
                    position: posicion,
                    map,
                    title: "Marcardor"
                }

                const marcador = new google.maps.Marker(propiedadesMarcador);

                map.setCenter(posicion)
                const infowindow = new google.maps.InfoWindow({
                    content : "Aquí está usted, siga las líneas"
                })
                marcador.addListener("click", ()=>{
                    infowindow.open(map,marcador);
                })



            })                                                             
        }
    }
    