function toggleSide() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
}
// script 2
function showPreview(event, previewId) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
        const preview = document.getElementById(previewId);
        preview.src = reader.result;
    }
    reader.readAsDataURL(input.files[0]);
}

function toggleInput(checkboxId, inputId) {
const checkbox = document.getElementById(checkboxId);
const input = document.getElementById(inputId);

if (checkbox.checked) {
    input.classList.remove('hidden-input');
    input.addEventListener('input', restrictInput); 
} else {
    input.classList.add('hidden-input');
    input.removeEventListener('input', restrictInput); 
}
}

function restrictInput(event) {
const input = event.target;
const value = parseInt(input.value);
if (value > 5) {
    input.value = 5; 
}else if (value<0){
    input.value=0;
}
}


function toggleSide() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
}