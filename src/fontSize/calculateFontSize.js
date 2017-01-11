import { fontSizeIsOverflow } from './fontSizeIsOverflow';

export function calculateFontSize(group) {
    let minFontSize = 0.5, maxFontSize = Number.MAX_VALUE;
    for(let textItemIndex = group.length; textItemIndex--;) {
        const textItemHeight = group[textItemIndex].textItem.height;
        if(maxFontSize > textItemHeight) {
            maxFontSize = textItemHeight;
        }
    }
    do {
        const nextFontSize = (maxFontSize + minFontSize) / 2;
        if(fontSizeIsOverflow(group, nextFontSize)) {
            maxFontSize = nextFontSize;
        } else {
            minFontSize = nextFontSize;
        }
    } while(maxFontSize - minFontSize > 1);
    return minFontSize;
}