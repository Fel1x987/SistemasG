//const map = document.getElementById("map");
const cargarMapa = () => {
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
                zoom: 9
                };      
                fetch('locations.json')
                    .then(function(response){
                        //console.log(response);
                        response.json().then(function(municipios){
                            //console.log(municipios);
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
                                coordlines.push(municipio.coordenadas);
                                var circle = new google.maps.Circle({
                                strokeColor: '#FF0000',
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
                                strokeColor: '#FF0000',
                                strokeOpacity: 1,
                                strokeWeight: 1,
                                geodesic:true            
                            });
    
                            trazo.setMap(map);
                            html += `</tbody>
                                    </table>`;
                            datos.innerHTML = html;                                         
                        });
                    });                
                var map = new google.maps.Map(document.getElementById("map"), propiedades); 
                //const map = new google.maps.Map(map,propiedades)                        
                let propiedadesMarcador = {
                    position: posicion,
                    map,
                    title: "Marcardor"
                    }
                    const marcador = new google.maps.Marker(propiedadesMarcador);
                    map.setCenter(posicion)
                    const infowindow = new google.maps.InfoWindow({
                        content : informacion
                    })
                    marcador.addListener("click", ()=>{                        
                        infowindow.open(map,marcador);
                })
            })                                                             
        }
    }
    

    /*<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>    
    */