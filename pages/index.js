const sliderDotsArr = document.querySelectorAll('.ride__slider-dot');
const sliderLine = document.querySelector('.ride__slider-line');
const autoClickOnSlider = new Event('click');
let dotStartIndex = 0;

const telInput = document.querySelector('.download__input');
const telResetButton = document.querySelector('.download__reset');


// логика изменения отступов видео-слайдера при ресайзе окна
let displayVW = document.documentElement.clientWidth;
console.log(displayVW);

let videoW = Math.min(734, displayVW);
let videoMarginLeft;
const videoNodes = document.querySelectorAll('.ride__video');
const sliderDotsNode = document.querySelector('.ride__slider-dots');
const sliderLineNode = document.querySelector('.ride__slider-line');

if (displayVW <= 734) videoMarginLeft = 0;
if (displayVW >= 734 && displayVW <= 1120) videoMarginLeft = displayVW - videoW;
if (displayVW > 1120) videoMarginLeft = (displayVW - 1120)/2 + (1120 - videoW);

if (displayVW <= 734) sliderDotsNode.style.left = displayVW/2 - 96 + 'px';
if (displayVW >= 734 && displayVW <= 1120) sliderDotsNode.style.left = videoMarginLeft + videoW/2 - 96 + 'px';
if (displayVW > 1120) sliderDotsNode.style.left = (displayVW - 1120)/2 + (1120 - videoW) + videoW/2 - 96 + 'px';

window.addEventListener(`resize`, evt => {
    console.log('resize');
    displayVW = document.documentElement.clientWidth;
    videoW = Math.min(734, displayVW);
    if (displayVW <= 734) videoMarginLeft = 0;
    if (displayVW >= 734 && displayVW <= 1120) videoMarginLeft = displayVW - videoW;
    if (displayVW > 1120) videoMarginLeft = (displayVW - 1120)/2 + (1120 - videoW);

    if (displayVW <= 734) sliderDotsNode.style.left = displayVW/2 - 96 + 'px';
    if (displayVW >= 734 && displayVW <= 1120) sliderDotsNode.style.left = videoMarginLeft + videoW/2 - 96 + 'px';
    if (displayVW > 1120) sliderDotsNode.style.left = (displayVW - 1120)/2 + (1120 - videoW) + videoW/2 - 96 + 'px';

    videoNodes.forEach(node => {
        node.style.marginLeft = videoMarginLeft + 'px'
        node.style.width = videoW + 'px';
    });
    sliderLine.style.left = -(videoW + videoMarginLeft) * dotStartIndex +'px';
});

setTimeout(() => {
    videoNodes.forEach(node => {
        node.style.marginLeft = videoMarginLeft + 'px'
        node.style.width = videoW + 'px';
    });
    console.log(videoNodes[0].style.marginLeft);
}, 1000);


// логика управления видеослайдером
sliderDotsArr.forEach(dot => {
    dot.addEventListener('click', () => {
        let currentDotId = dot.id;
        dotStartIndex = dot.id;
        dot.classList.add('ride__slider-dot_selected');
        sliderDotsArr.forEach(dot => {
            if (currentDotId != dot.id)
            dot.classList.remove('ride__slider-dot_selected');
        });
        sliderLine.style.left = -(videoW + videoMarginLeft) * dot.id +'px';
    })
});

function autoSlide(arr) {
    if (dotStartIndex >= arr.length) dotStartIndex = 0;
    arr[dotStartIndex].dispatchEvent(autoClickOnSlider);
    dotStartIndex++;
}

setInterval(() => autoSlide(sliderDotsArr), 10000);



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

const form = document.querySelector('.download__form');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('default submit prevented');
})