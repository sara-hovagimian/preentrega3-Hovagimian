
//creación de elementos
let formulario = document.getElementById("formulario");
const nombreForm = document.getElementById('nombreForm');
const mailForm = document.getElementById('mailForm');
const telefonoForm = document.getElementById('telefonoForm');
const comentarioForm = document.getElementById('comentarioForm');
const mainContact = document.getElementById('mainContact');
const divContact = document.createElement('div');
const textContact = document.createElement('h4');

mainContact.appendChild(divContact);
formulario.addEventListener("submit", validarFormulario);

//funcion para validar el formulario
function validarFormulario(e) {
    e.preventDefault();
    divContact.appendChild(textContact);
    formulario = e.target
    textContact.innerHTML = `Estimado/Estimada  ${nombreForm.value}. Su mensaje fue enviado. Contestaremos a la brevedad! Gracias por contactarnos!.`;
    //para guardar los datos en el storage llamo a una función
    saveFormularioToLocalStorage();
}
// Función para guardar los datos del formulario en localStorage
function saveFormularioToLocalStorage() {
    const formularioData = {
        nombre: nombreForm.value,
        mail: mailForm.value,
        telefono: telefonoForm.value,
        comentario: comentarioForm.value
    };
    localStorage.setItem('formularioData', JSON.stringify(formularioData));
}
