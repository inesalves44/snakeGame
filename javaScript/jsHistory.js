var image = document.createElement("img");

//puts in the provided id the image
function imagePresentation(folder, imageName, id) {
    var element = document.getElementById(id);
    var imagePath = "./images/" + folder + imageName;

    image.src = imagePath;
    image.width = 200;
    image.height = 200;
    element.appendChild(image);
}

//removes the image
function removeImage() {
    image.parentNode.removeChild(image);
}

//shows header->ul the options
function showList(id) {
    var element = document.getElementById(id);

    if (element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}