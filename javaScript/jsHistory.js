var img = document.createElement("img");

//puts in the provided id the image
function ImagePresentation(imgSrc, id) {
    var src = document.getElementById(id);

    img.src = imgSrc;
    img.width = 200;
    img.height = 200;
    src.appendChild(img);
}

//removes that same image
function RemoveImage() {
    img.parentNode.removeChild(img);
}

//shows the options
function showList(id) {
    var element = document.getElementById(id);

    if (element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
    
}