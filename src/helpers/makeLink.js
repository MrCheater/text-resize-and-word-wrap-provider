import React from 'react';

export function makeLink(word, href, target, fill, textDecoration, fontWeight, fontStyle) {
    return (
        <a
            href = {href}
            target = {target}
            fill = {fill}
            textDecoration = {textDecoration}
            fontWeight = {fontWeight}
            fontStyle = {fontStyle}
        >
            {word}
        </a>
    );
}