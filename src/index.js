//width: 460px
//height: 470px
import "./styles/styles.css"
import digits from "./assets/images/test.png";
import digits2 from "./assets/images/test2.png";
import digits3 from "./assets/images/test3.png";
import digits4 from "./assets/images/test4.png";
import digits5 from "./assets/images/test5.png";
import digits6 from "./assets/images/test6.png";

const images = [
    digits, digits2, digits3, digits4, digits5, digits6
];


const zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))

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

const select_box = document.createElement('select');

for (let i = 0; i < 6; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = 'test ' + i;

    select_box.appendChild(option);
}



document.body.appendChild(select_box);

select_box.onchange = (e) => {
    const val = e.target.value;
    base_image.src = images[val];
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


    //trim horizontally
    const transpiled = zip(vertical_trimed);

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

    const transformed = digits.map(transform_digit);

    const trimmed_h = transformed.map(trim_digit);

    const transpiled_back = trimmed_h.map(digit => zip(digit));

    const trimmed_v = transpiled_back.map(trim_digit);

    const top_half = trimmed_v.map(item => {
        const half = Math.floor(item.length / 2);
        return item.slice(0, half);
    });

    const bottom_half = trimmed_v.map(item => {
        const half = Math.floor(item.length / 2);
        return item.slice(half);
    });
    
    const horizontal_lines = trimmed_v.map(getLines);

    const top_half_transpited = top_half.map(digit => zip(digit));
    const bottom_half_transpited = bottom_half.map(digit => zip(digit));

    const vertical_lines_top = top_half_transpited.map(getLines);
    const vertical_lines_bottom = bottom_half_transpited.map(getLines);

    const compress_lines = row => row.map((item, i) => {
        const flag1 = (item === row[i + 1] && item === 1);
        return flag1 ? 0 : item
    });

    const compress_lines_right = row => row.map((item, i) => {
        const flag1 = (item === row[i - 1] && item === 1);
        return flag1 ? 0 : item
    });

    const pressed_h = horizontal_lines.map(compress_lines);

    const pressed_h_top = vertical_lines_top.map(compress_lines);
    const pressed_h_bottom = vertical_lines_bottom.map(compress_lines);

    
    
    const mid_index = vertical_lines_top[0].length / 2;


    const vertical_lines_top_left = vertical_lines_top.map(digit => digit.slice(0, mid_index));
    const vertical_lines_top_right = vertical_lines_top.map(digit => digit.slice(mid_index));
    

    const pressed_h_top_left = vertical_lines_top_left.map(compress_lines);
    const pressed_h_top_right = vertical_lines_top_right.map(compress_lines);


    const is_one = pressed_h_top_left.map(item => item[item.length - 1] === 1);


    const get_indexies = row => row.map((item, i) => (item === 1) ? (i === 0 ? 0.01 : i/row.length) : null).filter(item => item).map(item => parseFloat(item.toFixed(1)));


    const h_indexies = pressed_h.map(get_indexies);

    const v_top_indexies = pressed_h_top.map(get_indexies);
    const v_bottom_indexies = pressed_h_bottom.map(get_indexies);

    

    const check_top_line = val => val < 0.3;
    const check_bottom_line = val => val > 0.8;
    const check_middle_line = val => val > 0.2 && val < 0.6;
    const check_4_and_6 = val => val > 0.4 && val < 0.8;
    const check_9 = val => val > 0.3 && val < 0.6;

    //check verticals
    const check_left = val => val < 0.3;
    const check_center = val => val > 0.4 && val < 0.7;
    const check_right = val => val > 0.7;
    const top_left_8 = val => val > 0.2 && val < 0.4;
    const check_top_8 = val => val > 0.6 && val < 0.9;

    let result = new Array(5).fill(1);

    const filled = h_indexies.map((digit1_h,i) => result.map((_, index) => {
            switch (index) {
                case 0:
                    return digit1_h.some(check_top_line) ? new Array(5).fill(1) : new Array(5).fill(0);
                case 1: {
                    const empty = new Array(5).fill(0);
                    const is_left = pressed_h_top_left[i].some(item => item === 1);
                    const is_right = pressed_h_top_right[i].some(item => item === 1);
                    const is_center = is_one[i];
                    if (is_left) empty[0] = 1;
                    if (is_right) empty[4] = 1;
                    if (is_center && is_left && is_right) empty[2] = 1;
                    return empty;
                }
                case 2:
                    return digit1_h.some(check_middle_line) || digit1_h.some(check_4_and_6) || digit1_h.some(check_9) ? new Array(5).fill(1) : new Array(5).fill(0);
                case 3: {
                    const empty = new Array(5).fill(0);
                    const digit = v_bottom_indexies[i];
                    if (digit.some(check_left)) empty[0] = 1;
                    if (digit.some(check_right) ) empty[4] = 1;
                    if (digit.some(check_center)) empty[2] = 1;
                    return empty;
                }
                case 4:
                    return digit1_h.some(check_bottom_line) ? new Array(5).fill(1) : new Array(5).fill(0);
                default:
                    return new Array(5).fill(0);
            }
    }));

    const reducer = digit => digit.reduce((a, b) => a.concat(b));

  
    const mapping = [
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ]

    const final = filled.map(reducer);

    const magic = final.map(final_row => {
        const results = mapping.map(ideal_row => {
                let result = 0;
                final_row.forEach((item, i) => {
                    result += item === ideal_row[i] ? 1 : 0
                })

                return result/25;
        })

        const indexOfMaxValue = results.lastIndexOf(Math.max(...results));
        
        return indexOfMaxValue;
    });

    console.log(magic.join(''));

}