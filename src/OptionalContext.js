import React from 'react';
import { contextTypes } from './contextTypes';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';

export const OptionalContext = ({children}, context) => {
    if(
        context.textResizeAndWordWrapProviderAddTextItem &&
        context.textResizeAndWordWrapProviderRemoveTextItem &&
        context.textResizeAndWordWrapProviderUpdateTextItem &&
        context.textResizeAndWordWrapProviderUpdateGroupTextItem
    ) {
        return children;
    } else {
        return (
            <TextResizeAndWordWrapProvider>
                {children}
            </TextResizeAndWordWrapProvider>
        );
    }
};

OptionalContext.contextTypes = contextTypes;