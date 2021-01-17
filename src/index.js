//width: 460px
//height: 470px
import "./styles/styles.css"
import digits from "./assets/images/test.png";
import _ from 'lodash';

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

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

    
canvas.onclick = () => {
    const a = context.getImageData(0, 0, canvas.width, canvas.height);
    const converted = Array.from(a.data);
    const chunked = converted.chunk(4);
    
    let single_value = chunked.map((item) => item.some(elem => elem < 50) ? 0 : 255);

    const check_value = single_value.every(elem => elem === 255);

    //if all values is 255
    if (check_value) single_value = chunked.map((item) => item.some(elem => elem < 150) ? 0 : 255);

    const split_by_rows = single_value.chunk(canvas.width);
    
    const vertical_trimed = split_by_rows.filter(row => row.some(elem => elem === 0));


    // const arr1 = Array(3).fill(1).map((elem, i) => Array(3).fill(i));
    //write analog of zip
    // const transpiled = _.zip(...vertical_trimed);

    //compress horizontally

    

    const compress= (row) => {
        const chuncked = row.chunk(2);
        return chuncked.map(elems => {
            let zerros = elems.filter(elem => elem === 0).length;
            return zerros >= 1 ? 0 : 255;
        });
    }

    // const compressed_horizontally = vertical_trimed.map(compress);

   

    // const compressed_vertically = transpiled.map(compress);
    
    //trim horizontally
    const transpiled = _.zip(...vertical_trimed);

    let top_index = 0;
    let bottom_index = 0;

    for (let i = 0; i < transpiled.length; i++) {
        if (transpiled[i].some(e => e === 0)) break;
        top_index++;
    }

    for (let i = transpiled.length - 1; i > 0; i--) {
        if (transpiled[i].some(e => e === 0)) break;
        bottom_index = i;
    }

    const trimmed_horizontally = transpiled.slice(top_index, bottom_index);

    const indexies = [];

    trimmed_horizontally.forEach((elems, i) => {
        if (elems.every(elem => elem === 255)) indexies.push(i);
    });

    const filtered_indexies = indexies.filter((ind, i) => (ind + 1) !== indexies[i + 1]);

    filtered_indexies.unshift(0);

   
    const digits = [];

    filtered_indexies.forEach((index, i) => {
        digits.push(trimmed_horizontally.slice(index, filtered_indexies[i + 1]))
    });


    const trim_digit = digit => digit.filter(elems => elems.some(elem => elem === 0));
    
    const trimmed_digits = digits.map(trim_digit);

    // const compress_digit = digit => {
    //     const chunked = digit.map(elems => elems.chunk(3));
    //     return chunked.map(elems => {
    //         return elems.reduce((a, b) => +a + +b);
    //     });
    //     // return chunked;
    // };

    // const compressed = trimmed_digits.map(compress_digit);


    const compress_digit = digit => digit.map(compress).filter(row => row.some(el => el === 0));

    const compress_cycle = digits => {
        while (digits[0][0].length > 10) {
            digits = digits.map(compress_digit);
        }
       
        digits = digits.map(digit => _.zip(...digit));

        while (digits[0][0].length > 10) {
            digits = digits.map(compress_digit);
        }

        return digits;
    }



    const compressed = compress_cycle(trimmed_digits);

    console.log(compressed);

}