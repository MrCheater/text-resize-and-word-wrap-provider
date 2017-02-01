import React from 'react';

export function makeLink(word, href, target, fill, textDecoration, fontWeight, fontStyle, cursor) {
    return (
        <a
            href = {href}
            target = {target}
            fill = {fill}
            textDecoration = {textDecoration}
            fontWeight = {fontWeight}
            fontStyle = {fontStyle}
            cursor = 'pointer'
        >
            {word}
        </a>
    );
}