import React from 'react';

let index = 0;

export function lexer(jsxText, props, results, init) {
    if(init) {
        index = 0;
    }
    if(!Array.isArray(jsxText)) {
        jsxText = [jsxText];
    }
    const countChildren = jsxText.length;
    for(let childIndex = 0; childIndex < countChildren; childIndex++) {
        const child = jsxText[childIndex];
        if(React.isValidElement(child)) {
            const type = child.type || child.nodeName;
            const isDiv = type === 'div';
            const isBreakLine = type === 'br';
            const isTagA = props.isTagA || (type === 'a');
            if(isDiv || isBreakLine) {
                index++;
            }
            let {
                children,
                ...childProps
            } = child.props;
            children = children || child.children;
            if(isBreakLine) {
                children = ' ';
            }
            if(children) {
                lexer(
                    children,
                    {
                        ...props,
                        ...childProps,
                        isTagA,
                        type
                    },
                    results
                );
            }
            if(isDiv || isBreakLine) {
                index++;
            }
        } else {
            const str = '' + child;
            const words = str.split(' ');
            const countWords = words.length;
            for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
                results.push({
                    word : words[wordIndex],
                    props : {
                        ...props,
                        isSpanEnd : !(countWords - wordIndex - 1)
                    },
                    index
                });
            }
        }
    }
}