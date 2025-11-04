import { catsData } from "./data.js"

const emotionRadiosEl = document.getElementById('emotion-radios')

emotionRadiosEl.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')

    for(let radio of radios){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
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
