   
const socket = io();
const dt = new Date(); 

const fyh = (`${
            dt.getDate().toString().padStart(2, '0')}/${
            (dt.getMonth()+1).toString().padStart(2, '0')}/${
            dt.getFullYear().toString().padStart(4, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`
    )   

const addProducto = document.getElementById('addProducto')
addProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbail: document.getElementById('thumbail').value
    }
    socket.emit('update', producto);
    addProducto.reset()
})

socket.on('productos', manejoProductos);

async function manejoProductos(productos) {
    const vistaEJS = await fetch('views/historial.ejs')
    const textoPlantilla = await vistaEJS.text()
    const compilaPlantilla = ejs.compile(textoPlantilla)
    const html = compilaPlantilla({ productos })

    document.getElementById('productos').innerHTML = html
}

function addMessage(e) {
        const mensaje = {
            email: document.getElementById('username').value,
            fechayhora: fyh.toString(),
            texto: document.getElementById('texto').value
            }
    socket.emit('nuevoMensaje', mensaje);
    return false;
}

function makeHTML(mensajes) {
     return mensajes.map((elem, index) => {
        return (`<div>
            <strong>${elem.email}</strong> 
            [${elem.fechayhora}]:
            <em>${elem.texto}</em> 
            </div>`)
    }).join(" ")
}

function render(mensajes) {
    const html = makeHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('mensajes', mensajes => {
    render(mensajes)
})

