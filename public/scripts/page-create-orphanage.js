//criando mapa
const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

//criando e add tilelayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//criando icone
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],


})
    
let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng
    
    

    //remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})

// adicionar o campo de fotos

function addPhotoField() {

    //pegar o container de fotos#images

    const container = document.querySelector('#images')

    //pegar o container para duplicar .new-image

    const fieldsContainer = document.querySelectorAll('.new-upload')
    //realizar da ultima imagem add

    const newfieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
   
    //verificar se o campo está vazio, se sim, não add ao container de img

    const input = newfieldContainer.children[0]

    if(input.value == ""){
        return
    }

    // limpar o campo antes de add ao container de img
    input.value = ""

    //adicionar o clone ao container de imagem
    container.appendChild(newfieldContainer)
}

function deletefield(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2) {
        //limpar valor do campo
        span.parentNode.children[0].value = ""
        return
    }
    //deletar campo
    span.parentNode.remove()

}

//select yes or no
function toggleSelect(event) {
    //retirar classe .actve dos bts
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
        button.classList.remove('active')
    })
    //adicionar classe .active no bt clicado
    const button = event.currentTarget
    button.classList.add('active')
    
    //atualizar input hidden com valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    input.value = button.dataset.value
}
