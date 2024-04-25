const scrapeText = require('../services/scraper');
const compareTextGPT = require('../services/requestGPT');

const verifyContent = async (url, textToCompare) => {
    function levenshtein(a, b) {
        var matrix = [];
        var a = a + "", b = b + "";
      
        for (var i = 0; i <= b.length; i++){
          matrix[i] = [i];
        }
      
        for (var j = 0; j <= a.length; j++){
          matrix[0][j] = j;
        }
      
        for (var i = 1; i <= b.length; i++){
          for (var j = 1; j <= a.length; j++){
            if (b.charAt(i-1) == a.charAt(j-1)){
              matrix[i][j] = matrix[i-1][j-1];
            } else {
              matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
            }
          }
        }
      
        var distance = matrix[b.length][a.length];
        var percent = ((1 - distance / Math.max(a.length, b.length)) * 100).toFixed(2);
        return parseFloat(percent);
    }

    function replaceNewLinesWithBR(str) {
        return str.replace(/\n/g, "<br>");
    }
    
    let scrapeResult = await scrapeText(url.slice(1, -1));
    let match;
    let gpt_correction;
    let correctness;
    let currentScore = 0;

    scrapeResult.map((item) => {
      let percentage = levenshtein(textToCompare,item.content);
    
      if(percentage > 50 && percentage > currentScore) {
        currentScore = percentage;
        correctness = percentage;
        match = item;
      }
    })

    console.log('Percent: ', correctness);
    console.log('match: ', match);

    if(match) {
        gpt_correction = await compareTextGPT(match, textToCompare);
        gpt_correction.siteContent = replaceNewLinesWithBR(match.content);
    } else {
        gpt_correction = {
            content: "Correction unavailable",
        }
    }

    console.log('GPT Correction: ', gpt_correction);

    return {
        gpt_correction: gpt_correction,
    }
}

module.exports = verifyContent