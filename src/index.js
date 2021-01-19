//width: 460px
//height: 470px
import "./styles/styles.css"
import digits from "./assets/images/test.png";
import _, { map, transform } from 'lodash';

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


    // const trim_digit = digit => digit.filter(elems => elems.some(elem => elem === 0));

    const transform_digit = digit => digit.map(row => row.map(el => el === 0 ? 1 : 0));
    
    const trim_digit = digit => digit.filter(row => row.some(el => el === 1));

    const getLines = digit => digit.map(row => (row.filter(el => el === 1).length / row.length)).map(item => item < 0.5 ? 0 : 1);
    // const trimmed_digits = digits.map(trim_digit);

    const transformed = digits.map(transform_digit);

    const trimmed_h = transformed.map(trim_digit);

    const vertical_lines = trimmed_h.map(getLines);

    const transpiled_back = trimmed_h.map(digit => _.zip(...digit));

    const trimmed_v = transpiled_back.map(trim_digit);

    const horizontal_lines = trimmed_v.map(getLines);

    //разбить строку пополам и проверить в каждой половине по отдельности
    const compress_lines = row => row.map((item, i) => (item === row[i+1] && item === 1) ? 0 : item);

    const pressed_h = horizontal_lines.map(compress_lines);

    const pressed_v = vertical_lines.map(compress_lines);

    const get_indexies = row => row.map((item, i) => (item === 1) ? i/row.length : null).filter(item => item);

    // console.log(vertical_lines);

    const h_indexies = pressed_h.map(get_indexies);

    const v_indexies = pressed_v.map(get_indexies);

    

   
    


    // const compressed = trimmed_digits.map(compress_digit);


    // const compress_digit = digit => {
    //     console.log(digit);
    //     while (digit[0].length >= 10) {
    //          digit = digit.map(compress).filter(row => row.some(el => el === 0));
    //     }
    //     return digit;
    // }

    // const compress_cycle = digits => {
       
    //     digits = digits.map(compress_digit);
    
    //     digits = digits.map(digit => _.zip(...digit));

    //     digits = digits.map(compress_digit);
        
    //     return digits;
    // }


    // const compressed = compress_cycle(trimmed_digits);

    // const compare = (prev, value, value2) => {
    //     if (value === value2) return value;
    //     else return prev === value ? value2 : value;
    // }

    // const compressTo5 = (arr) => {
    //     const len = arr.length;
    //     let result = Array(5);
    //     switch (len) {
    //         case 9:
    //             result[0] = arr[0] === 0 ? arr[0] : arr[1];
    //             result[1] = compare(result[0], arr[2], arr[3]);
    //             result[2] = arr[4];
    //             result[3] = compare(result[2], arr[5], arr[6]);
    //             result[4] = compare(result[3], arr[7], arr[8]);
    //             return result;
            
    //         case 8:
    //             result[0] = arr[0];
    //             result[1] = compare(result[0], arr[1], arr[2]);
    //             result[2] = compare(result[1], arr[3], arr[4]);
    //             result[3] = compare(arr[7], arr[5], arr[6]);
    //             result[4] = arr[7];
    //             return result;
            
    //         case 7:
    //             result[0] = arr[0];
    //             result[1] = compare(result[0], arr[1], arr[2]);
    //             result[2] = arr[3];
    //             result[3] = compare(arr[6], arr[4], arr[5]);
    //             result[4] = arr[6];
    //             return result;
            
    //         case 6:
    //             result[0] = arr[0];
    //             result[1] = arr[1];
    //             result[2] = compare(result[1], arr[2], arr[3]);
    //             result[3] = arr[4];
    //             result[4] = arr[5];
    //             return result;

    //         default:
    //             return arr;
            
    //     }
    // }

    // const compress_digits_to_5 = (digit) => digit.map(compressTo5);

    // const compressed_to_5 = compressed.map(compress_digits_to_5);

    // const vert_transpile = compressed_to_5.map(digit => _.zip(...digit));

    // const compressed_to_5_vertical = vert_transpile.map(compress_digits_to_5);

    // const last_transpile = compressed_to_5_vertical.map(digit => _.zip(...digit));

    // const transform_digit = (digit) => {
    //     return digit.map(row => row.map(el => el === 0 ? 1 : 0)).reduce((a,b) => a.concat(b))
    // }

    // const final = last_transpile.map(transform_digit);

    // const mapping = [
    //     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    //     [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    //     [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1]
    // ];

    



    // const result = final.map(final_row => {
    //     const results = mapping.map(ideal_row => {
    //             let result = 0;
    //             final_row.forEach((item, i) => {
    //                 result += item === ideal_row[i] ? 1 : 0
    //             })

    //             return result/25;
    //     })

    //     const indexOfMaxValue = results.indexOf(Math.max(...results));
        
    //     return indexOfMaxValue;
    // });
  
    // console.log(result);



}