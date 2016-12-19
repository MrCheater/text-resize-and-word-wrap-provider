import React from 'react';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';

export function textResizeAndWordWrap(Component) {
    return (props) => (
        <TextResizeAndWordWrapProvider>
            <Component {...props}/>
        </TextResizeAndWordWrapProvider>
    );

}
