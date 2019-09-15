<template>
    <div id="map">
        <p>This is a Map!</p>
    </div>
</template>

<script>
import  'leaflet/dist/leaflet.css'
import  L from 'leaflet'

delete  L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions(
    {   iconUrl         : require( 'leaflet/dist/images/marker-icon.png' )
    ,   iconRetinaUrl   : require( 'leaflet/dist/images/marker-icon-2x.png' )
    ,   shadowUrl       : require( 'leaflet/dist/images/marker-shadow.png' )
    }
)

export default {
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function successFunc( position ) {
                    const map = L.map( 'map', { center: L.latLng( position.coords.latitude, position.coords.longitude ), zoom: 15 } ).addLayer(
                        L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' )
                    )
                }
            );
        }
        
    }
}
</script>

<style lang="scss" scoped>
    #map {
        background: #585858;
        min-height: 20rem;
    }
</style>