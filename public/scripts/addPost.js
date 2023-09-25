const form = document.querySelector('form')

const inputOrigin = document.querySelector('#origin')
const inputDestiny = document.querySelector('#destiny')
const markers = {
    origin: [],
    destiny: []
}

inputOrigin.addEventListener('change', (e) => {
    const text = e.target.value
    const apiKey = "-J4riEcNTG8qqFK3dey4Fc6uOqRe7qSUmTi5q9TAOlE"

    const URL = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(text)}&apiKey=${apiKey}`

    setTimeout(() => {
        console.log("The event has been emitted.")
        fetch(URL)
        .then(response => response.json())
        .then(response => {

            markers.origin.forEach(marker => marker.removeFrom(map))
            markers.origin = []

            const icon = L.icon({
                iconUrl: '/images/icons/local.png',
                iconSize: [38, 38],
                iconAnchor: [19, 38]
            })

            let LatLng = new L.LatLng(response.items[0].position.lat, response.items[0].position.lng)
            
            console.log(LatLng)
            
            const marker = L.marker(LatLng, { icon: icon })
            marker.addTo(map)
            markers.origin.push(marker)

            const marker_origin_lat = document.querySelector('#marker_origin_lat')
            const marker_origin_lng = document.querySelector('#marker_origin_lng')
            

            marker_origin_lat.value = response.items[0].position.lat
            marker_origin_lng.value = response.items[0].position.lng
        })
    }, 3000)
})

inputDestiny.addEventListener('change', (e) => {
    const text = e.target.value
    const apiKey = "-J4riEcNTG8qqFK3dey4Fc6uOqRe7qSUmTi5q9TAOlE"

    const URL = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(text)}&apiKey=${apiKey}`

    setTimeout(() => {
        console.log("The event has been emitted.")
        fetch(URL)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            markers.destiny.forEach(marker => marker.removeFrom(map))
            markers.destiny = []

            const icon = L.icon({
                iconUrl: '/images/icons/flag-checkered.svg',
                iconSize: [38, 38],
                iconAnchor: [19, 38]
            })

            let LatLng = new L.LatLng(response.items[0].position.lat, response.items[0].position.lng)

            const marker = L.marker(LatLng, { icon: icon })
            marker.addTo(map)
            markers.destiny.push(marker)

            const marker_destiny_lat = document.querySelector('#marker_destiny_lat')
            const marker_destiny_lng = document.querySelector('#marker_destiny_lng')

            marker_destiny_lat.value = response.items[0].position.lat
            marker_destiny_lng.value = response.items[0].position.lng
        })
    }, 3000)
})