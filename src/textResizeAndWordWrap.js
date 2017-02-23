import React from 'react';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';

export const textResizeAndWordWrap = (Component) => (props) => (
    <TextResizeAndWordWrapProvider>
        <Component {...props}/>
    </TextResizeAndWordWrapProvider>
);

