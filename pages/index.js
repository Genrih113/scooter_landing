const sliderDotsArr = document.querySelectorAll('.ride__slider-dot');
const sliderLine = document.querySelector('.ride__slider-line');
const autoClickOnSlider = new Event('click');
let dotStartIndex = 1;

const telInput = document.querySelector('.download__input');
const telResetButton = document.querySelector('.download__reset');

sliderDotsArr.forEach(dot => {
    dot.addEventListener('click', () => {
        let currentDotId = dot.id;
        dotStartIndex = dot.id;
        dot.classList.add('ride__slider-dot_selected');
        sliderDotsArr.forEach(dot => {
            if (currentDotId != dot.id)
            dot.classList.remove('ride__slider-dot_selected');
        });
        sliderLine.style.left = -1105 * dot.id +'px';
    })
});


function autoSlide(arr) {
    if (dotStartIndex >= arr.length) dotStartIndex = 0;
    arr[dotStartIndex].dispatchEvent(autoClickOnSlider);
    dotStartIndex++;
}

setInterval(() => autoSlide(sliderDotsArr), 10000);

// telInput.addEventListener('input', (evt) => {
//     // console.log(evt);
//     if (telInput.value) {
//         telResetButton.style.visibility = 'visible';
//     } else {
//         telResetButton.style.visibility = 'hidden';
//     }
//     if (evt.inputType == 'insertText' 
//         && (
//             evt.data !== '0' &&
//             evt.data !== '1' &&
//             evt.data !== '2' &&
//             evt.data !== '3' &&
//             evt.data !== '4' &&
//             evt.data !== '5' &&
//             evt.data !== '6' &&
//             evt.data !== '7' &&
//             evt.data !== '8' &&
//             evt.data !== '9'
//         )
//     ) {
//         telInput.value = telInput.value.slice(0, telInput.value.length-1);
//     }
//     if (evt.inputType == 'deleteContentBackward' && telInput.value[telInput.value.length - 1] == ' ') {
//         telInput.value = telInput.value.slice(0, telInput.value.length - 1);
//         // console.log(telInput.value);
//     }
//     if (evt.inputType !== 'deleteContentBackward' && evt.inputType !== 'deleteContentForward') {
//         if (telInput.value.length > 1 /*&& telInput.value.length < 6*/ && telInput.value[1] !== ' ') {
//             telInput.value = telInput.value.slice(0, 1) + ' ' + telInput.value.slice(1, telInput.value.length);
//         }
//         if (telInput.value.length >= 5 && telInput.value[5] !== ' ') {
//             telInput.value = telInput.value.slice(0, 5) + ' ' + telInput.value.slice(5, telInput.value.length);
//         }
//     }
// })

telInput.addEventListener('input', (evt) => {
    // console.log(evt);
    if (telInput.value) {
        telResetButton.style.visibility = 'visible';
    } else {
        telResetButton.style.visibility = 'hidden';
    }
    if (evt.inputType == 'insertText' 
        && (
            evt.data !== '0' &&
            evt.data !== '1' &&
            evt.data !== '2' &&
            evt.data !== '3' &&
            evt.data !== '4' &&
            evt.data !== '5' &&
            evt.data !== '6' &&
            evt.data !== '7' &&
            evt.data !== '8' &&
            evt.data !== '9'
        )
    ) {
        telInput.value = telInput.value.slice(0, telInput.value.length-1);
    }
    
    let cacheValueArr = telInput.value.split(' ');
    let cacheValueStr = cacheValueArr.join('');
    //console.log(cacheValueArr, cacheValueStr);
    if (cacheValueStr.length == 1) telInput.value = cacheValueStr;
    if (cacheValueStr.length > 1) {
        telInput.value = cacheValueStr.slice(0, 1) + ' ' + cacheValueStr.slice(1, cacheValueStr.length);    
    }
    if (telInput.value.length > 5) {
        telInput.value = telInput.value.slice(0, 5) + ' ' + telInput.value.slice(5, telInput.value.length);
    }
})

