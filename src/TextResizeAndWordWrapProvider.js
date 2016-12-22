import React from 'react';
import { Component } from './Component';

const isServer = !(typeof window != 'undefined' && window.document);

class PureConnector extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children;
    }
    render() {
        return React.Children.only(
            this.props.children
        );
    }
}

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

export function fontSizeIsOverflow(group, fontSize) {
    for(let textItemIndex = group.length; textItemIndex--;) {
        const { textItem, wordWidths, symbolHeight, spaceWidth } = group[textItemIndex];
        const { width: maxWidth, height: maxHeight } = textItem;
        let wordX = 0, wordY = 0;
        const countInnerTexts = textItem.value.length;
        for(let innerTextIndex = 0; innerTextIndex < countInnerTexts; innerTextIndex++) {
            const innerText = textItem.value[innerTextIndex];
            const { weight, words } = innerText;
            const factor = ~~(weight * fontSize) / maxHeight;
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

export function setFontSizeAndWordWrap(group, fontSize) {
    for(let textItemIndex = group.length; textItemIndex--;) {
        const { textItem, refs, wordWidths, symbolHeight, symbolDy, spaceWidth } = group[textItemIndex];
        const { width: maxWidth, height: maxHeight, x, y, textAlign, verticalAlign, color } = textItem;
        const countInnerTexts = textItem.value.length;
        let wordX = 0, wordY = 0;
        let rows = [{elements:[]}], rowIndex = 0;
        for(let innerTextIndex = 0; innerTextIndex < countInnerTexts; innerTextIndex++) {
            const innerText = textItem.value[innerTextIndex];
            const { weight, words, color: innerColor } = innerText;
            const displayFontSize = ~~(fontSize * weight);
            const factor = displayFontSize / maxHeight;
            const countWords = words.length;
            const wordHeight = symbolHeight * factor;
            const key = `words-${innerTextIndex}`;
            refs[key].setAttribute('font-size', displayFontSize + 'px');
            refs[key].setAttribute('fill', color ? color : 'inherit');
            for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
                const key = `word-${innerTextIndex}-${wordIndex}`;
                const wordWidth = wordWidths[key] * factor;
                let wordBoundsRight = wordX + wordWidth;
                let wordBoundsBottom = wordY + wordHeight;
                if(wordBoundsRight > maxWidth) {
                    rows[++rowIndex] = {elements:[]};
                    wordX = 0;
                    wordY += wordHeight;
                    wordBoundsRight = wordX + wordWidth;
                    wordBoundsBottom = wordY + wordHeight;
                }
                const element = refs[key];
                const row = rows[rowIndex];
                row.elements.push(element);
                row.width = wordBoundsRight;
                row.height = wordHeight;
                element.setAttribute('x', x + wordX + 'px');
                element.setAttribute('y', y + wordY - symbolDy * factor + 'px');
                element.setAttribute('fill', innerColor ? innerColor : 'inherit');
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
        for(let rowIndex = countRows; rowIndex--;) {
            const { width, elements } = rows[rowIndex];
            const dx =
                (textAlign === 'left') ? 0 :
                    (textAlign === 'center') ? ((maxWidth - width) / 2) :
                        (textAlign === 'right') ? (maxWidth - width) : 0;
            const dy =
                (verticalAlign === 'top') ? 0 :
                    (verticalAlign === 'middle') ? ((maxHeight - height) / 2) :
                        (verticalAlign === 'bottom') ? (maxHeight - height) : 0;
            const countElements = elements.length;
            for(let elementIndex = countElements; elementIndex--;) {
                elements[elementIndex].setAttribute('dx', dx);
                elements[elementIndex].setAttribute('dy', dy);
            }
        }
    }
}

export class TextResizeAndWordWrapProvider extends Component {
    groups = {};

    resizeAndWordWrap() {
        if(isServer || !this.needUpdate) {
            return;
        }
        this.needUpdate = false;
        const groups = this.groups;
        for(let groupId in groups) {
            const group = groups[groupId];
            setFontSizeAndWordWrap(group, calculateFontSize(group))
        }
    };

    componentDidMount() {
        this.resizeAndWordWrap();
    }

    componentDidUpdate() {
        this.resizeAndWordWrap();
    }

    render() {
        return (
            <PureConnector>
                {this.props.children}
            </PureConnector>
        );
    }

    getChildContext() {
        return {
            textResizeAndWordWrapProviderAddTextItem : this.context.textResizeAndWordWrapProviderAddTextItem || this.addTextItem,
            textResizeAndWordWrapProviderRemoveTextItem : this.context.textResizeAndWordWrapProviderRemoveTextItem || this.removeTextItem,
            textResizeAndWordWrapProviderUpdateTextItem : this.context.textResizeAndWordWrapProviderUpdateTextItem || this.updateTextItem,
            textResizeAndWordWrapProviderUpdateGroupTextItem : this.context.textResizeAndWordWrapProviderUpdateGroupTextItem || this.updateGroupTextItem,
        };
    }

    addTextItemToGroup(textItem, groupId) {
        if(this.groups[groupId]) {
            this.groups[groupId].push(textItem);
        } else {
            this.groups[groupId] = [textItem]
        }
    }

    removeTextItemFromGroup(textItem, groupId) {
        this.groups[groupId] = this.groups[groupId].filter(
            (currentTextItem) => currentTextItem !== textItem
        );
        if(this.groups[groupId].length === 0) {
            delete this.groups[groupId];
        }
    }

    addTextItem = (instance) => {
        const groupId = instance.textItem.group;
        this.addTextItemToGroup(instance, groupId);
        this.optionalForceUpdate();
    };

    removeTextItem = (instance) => {
        const groupId = instance.textItem.group;
        this.removeTextItemFromGroup(instance, groupId);
        this.optionalForceUpdate();
    };

    optionalForceUpdate = () => {
        if(!this.needUpdate) {
            this.needUpdate = true;
            this.forceUpdate();
        }
    };

    updateGroupTextItem = (instance, groupId, nextGroupId) => {
        this.removeTextItemFromGroup(instance, groupId);
        this.addTextItemToGroup(instance, nextGroupId);
    };

    updateTextItem = () => {
        this.optionalForceUpdate();
    };
}

TextResizeAndWordWrapProvider.childContextTypes = TextResizeAndWordWrapProvider.contextTypes = {
    textResizeAndWordWrapProviderAddTextItem : React.PropTypes.func,
    textResizeAndWordWrapProviderRemoveTextItem : React.PropTypes.func,
    textResizeAndWordWrapProviderUpdateTextItem : React.PropTypes.func,
    textResizeAndWordWrapProviderUpdateGroupTextItem : React.PropTypes.func,
};