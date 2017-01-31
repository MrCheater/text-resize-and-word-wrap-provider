import React from 'react';

export function makeLink(word, href, target, fill, textDecoration, fontWeight, fontStyle, cursor, stroke, strokeWidth, strokeOpacity) {
    return (
        <a
            href = {href}
            target = {target}
            fill = {fill}
            textDecoration = {textDecoration}
            fontWeight = {fontWeight}
            fontStyle = {fontStyle}
            cursor = {cursor}
            stroke = {stroke}
            strokeWidth = {strokeWidth}
            strokeOpacity = {strokeOpacity}
        >
            {word}
        </a>
    );
}