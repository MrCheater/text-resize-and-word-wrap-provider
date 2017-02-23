import React from 'react';
import { contextTypes } from './contextTypes';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';

export const optionalContext = (Component) => {
    const ComponentWithOptionalContext = (props, context) => {
        if(
            context.textResizeAndWordWrapProviderAddTextItem &&
            context.textResizeAndWordWrapProviderRemoveTextItem &&
            context.textResizeAndWordWrapProviderUpdateTextItem &&
            context.textResizeAndWordWrapProviderUpdateGroupTextItem
        ) {
            return (
                <Component {...props}/>
            );
        } else {
            return (
                <TextResizeAndWordWrapProvider>
                    <Component {...props}/>
                </TextResizeAndWordWrapProvider>
            );
        }
    };
    ComponentWithOptionalContext.contextTypes = contextTypes;
};
