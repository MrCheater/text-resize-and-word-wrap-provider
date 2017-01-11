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
            console.log(child);
            const type = child.type || child.nodeName;
            if(type === 'tdiv') {
                index++;
            }
            let {
                children,
                ...childProps
            } = child.props;
            children = children || child.children;
            if(children) {
                lexer(
                    children,
                    {
                        ...props,
                        ...childProps,
                        type
                    },
                    results
                );
            }
            if(type === 'tdiv') {
                index++;
            }
        } else {
            const str = '' + child;
            const words = str.split(' ');
            const countWords = words.length;
            for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
                results.push({
                    word : words[wordIndex],
                    props,
                    index
                });
            }
        }
    }
}