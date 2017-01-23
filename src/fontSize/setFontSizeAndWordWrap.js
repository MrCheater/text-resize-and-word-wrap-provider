export function setFontSizeAndWordWrap(group, fontSize) {
    for(let textItemIndex = group.length; textItemIndex--;) {
        const { textItem, refs, wordWidths, symbolHeight, symbolDy, spaceWidth } = group[textItemIndex];
        const { width: maxWidth, height: maxHeight, x, y, textAlign, verticalAlign, color } = textItem;
        const countInnerTexts = textItem.value.length;
        let wordX = 0, wordY = 0;
        let rows = [{elements:[]}], rowIndex = 0;
        for(let innerTextIndex = 0; innerTextIndex < countInnerTexts; innerTextIndex++) {
            const innerText = textItem.value[innerTextIndex];
            const { weight, words } = innerText;
            const displayFontSize = (fontSize * weight)|0;
            const factor = displayFontSize / maxHeight;
            const countWords = words.length;
            const wordHeight = symbolHeight * factor;
            const key = `words-${innerTextIndex}`;
            refs[key].setAttribute('font-size', displayFontSize + 'px');
            refs[key].setAttribute('fill', color ? color : 'inherit');
            let breakLine = true;
            for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
                const key = `word-${innerTextIndex}-${wordIndex}`;
                const spaceKey = `space-${innerTextIndex}-${wordIndex-1}`;
                const spaceElement = refs[spaceKey];
                const wordWidth = wordWidths[key] * factor;
                let wordBoundsRight = wordX + wordWidth;
                let wordBoundsBottom = wordY + wordHeight;
                if(wordBoundsRight > maxWidth) {
                    rows[++rowIndex] = {elements:[]};
                    wordX = 0;
                    wordY += wordHeight;
                    wordBoundsRight = wordX + wordWidth;
                    wordBoundsBottom = wordY + wordHeight;
                    if(spaceElement) {
                        spaceElement.setAttribute('style', 'display: none;');
                    }
                    breakLine = true;
                } else if(spaceElement) {
                    spaceElement.setAttribute('style', '');
                }
                const element = refs[key];
                const row = rows[rowIndex];
                row.elements.push(element);
                if(breakLine) {
                    row.height = wordHeight;
                    row.x = x + wordX;
                    row.y = y + wordY - symbolDy * factor;
                    breakLine = false;
                }
                row.width = wordBoundsRight;
                wordX += wordWidth + spaceWidth * factor;
            }
            wordX = 0;
            wordY += wordHeight;
            if(innerTextIndex < countInnerTexts - 1) {
                rows[++rowIndex] = {elements:[]};
            }
        }
        const countRows = rows.length;
        let height = 0;
        for(let rowIndex = countRows; rowIndex--;) {
            height += rows[rowIndex].height;
        }
        const dy =
            (verticalAlign === 'top') ? 0 :
            (verticalAlign === 'middle') ? ((maxHeight - height) / 2) :
            (verticalAlign === 'bottom') ? (maxHeight - height) : 0;
        for(let rowIndex = countRows; rowIndex--;) {
            const { width, elements, x, y } = rows[rowIndex];
            const dx =
                (textAlign === 'left') ? 0 :
                (textAlign === 'center') ? ((maxWidth - width) / 2) :
                (textAlign === 'right') ? (maxWidth - width) : 0;
            for(let elementIndex = elements.length; elementIndex--;) {
                const element = elements[elementIndex];
                if(elementIndex) {
                    element.removeAttribute('x');
                    element.removeAttribute('y');
                } else {
                    element.setAttribute('x', `${x + dx}px`);
                    element.setAttribute('y', `${y + dy}px`);
                }
            }
        }
    }
}