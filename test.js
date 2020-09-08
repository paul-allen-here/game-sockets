const pasteText = (blackCard, whiteCard) => {
    let result = blackCard.replace(/____/i, whiteCard)
    result = result.replace(/(^|[\.\?\!]\s+)(.)/g, function(a, b, c){
        return b + c.toUpperCase();
    })
    return result
}

let i = pasteText(
    "Историки помнят, как Александр использовал это против Персов. ____.",
    "все парни с которыми у меня это было"
)

console.log(i)