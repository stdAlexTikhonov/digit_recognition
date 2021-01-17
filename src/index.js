//width: 460px
//height: 470px
import "./styles/styles.css"
import digits from "./assets/images/test.png";

let canvas = document.getElementById('viewport'),
    context = canvas.getContext('2d');


// make_base();

// function make_base() {
const base_image = new Image();
base_image.src = digits;
// document.body.appendChild(base_image);
base_image.onload = function () {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        context.drawImage(base_image, 0, 0);
}

    
// }

canvas.onclick = () => {
    const a = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log(a);
}