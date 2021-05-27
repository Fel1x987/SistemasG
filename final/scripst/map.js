

var informacion =  "<h2>Aquí comienza su aventura!</h2>"        
        function iniciaMapa() {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition( position => {
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
                    const mapa = document.getElementById("map")
                    const map = new google.maps.Map(mapa,propiedades)                        
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