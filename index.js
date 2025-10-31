import { catsData } from "./data.js"

const emotionRadiosEl = document.getElementById('emotion-radios')

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
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
            <p>${emotion}</p>
        `
    }
    emotionRadiosEl.innerHTML = radios_html
}

renderEmotionsRadios(catsData)
