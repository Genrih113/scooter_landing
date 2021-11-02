const sliderDotsArr = document.querySelectorAll('.ride__slider-dot');
const sliderLine = document.querySelector('.ride__slider-line');
const autoClickOnSlider = new Event('click');
let dotStartIndex = 1;

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

