import React from 'react';
import parseAbsoluteCSSUnit from 'parse-absolute-css-unit';

//Cross-Browser Hack for Support Stroke
export function optionalStroke(Component) {
    return ({
        stroke,
        strokeWidth,
        strokeOpacity,
        children,
        ...props,
    }) => {
        if(stroke && strokeWidth) {
            strokeWidth = parseAbsoluteCSSUnit(strokeWidth);
            return (
                <g>
                    <g
                        stroke = {stroke}
                        strokeWidth = {strokeWidth}
                        strokeOpacity = {strokeOpacity}
                    >
                        <Component {...props}>
                            {children}
                        </Component>
                    </g>
                    <Component {...props}>
                        {children}
                    </Component>
                </g>
            );
        } else {
            return (
                <Component {...props}>
                    {children}
                </Component>
            );
        }
    }
}