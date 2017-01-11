export function fontSizeIsOverflow(group, fontSize) {
    for(let textItemIndex = group.length; textItemIndex--;) {
        const { textItem, wordWidths, symbolHeight, spaceWidth } = group[textItemIndex];
        const { width: maxWidth, height: maxHeight } = textItem;
        let wordX = 0, wordY = 0;
        const countInnerTexts = textItem.value.length;
        for(let innerTextIndex = 0; innerTextIndex < countInnerTexts; innerTextIndex++) {
            const innerText = textItem.value[innerTextIndex];
            const { weight, words } = innerText;
            const factor = ((weight * fontSize)|0) / maxHeight;
            const countWords = words.length;
            const wordHeight = symbolHeight * factor;
            for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
                const wordWidth = wordWidths[`word-${innerTextIndex}-${wordIndex}`] * factor;
                let wordBoundsRight = wordX + wordWidth, wordBoundsBottom = wordY + wordHeight;
                if(wordBoundsBottom > maxHeight) {
                    return true;
                }
                if(wordBoundsRight > maxWidth) {
                    if(wordIndex === 0) {
                        return true;
                    } else {
                        wordX = 0;
                        wordY += wordHeight;
                        wordBoundsRight = wordX + wordWidth;
                        wordBoundsBottom = wordY + wordHeight;
                        if((wordBoundsRight > maxWidth) || (wordBoundsBottom > maxHeight)) {
                            return true;
                        }
                    }
                }
                wordX += wordWidth + spaceWidth * factor;
            }
            wordX = 0;
            wordY += wordHeight;
        }
    }
    return false;
}