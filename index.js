import { catsData } from "./data.js"

const emotionRadiosEl = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadiosEl.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', function(){
    memeModal.style.display = 'none'
})

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')

    for(let radio of radios){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    console.log(catsArray)

    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
}

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
        <img
            class='cat-img'
            src='./images/${catObject.image}'
            alt='${catObject.alt}'
        >
    `
    memeModal.style.display = 'flex'
}

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked')) {
        const checkedEmotion = document.querySelector('input[type="radio"]:checked').value

        const isGif = gifsOnlyOption.checked

        const matchingCats = catsData.filter(function(cat){
            return cat.emotionTags.includes(checkedEmotion) && cat.isGif === isGif
        })

        return matchingCats
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!emotionsArray.includes(emotion)) 
                emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    let radios_html = ""
    const emotions = getEmotionsArray(cats)
    
    for(let emotion of emotions){
        radios_html += `
            <div class='radio'>
                <label for='${emotion}'>${emotion}</label>
                <input
                    type='radio'
                    id='${emotion}'
                    value='${emotion}'
                    name='choice-radios'
                >
            </div>
        `
    }
    emotionRadiosEl.innerHTML = radios_html
}

renderEmotionsRadios(catsData)
