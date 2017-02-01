import React from 'react';
import parseAbsoluteCSSUnit from 'parse-absolute-css-unit';
import { TextView } from './TextView';

//Cross-Browser Hack for Support Stroke
export const Text = ({
    stroke,
    strokeWidth,
    strokeOpacity,
    children,
    ...props
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
                    <TextView {...props}>
                        {children}
                    </TextView>
                </g>
                <g>
                    <TextView {...props}>
                        {children}
                    </TextView>
                </g>
            </g>
        );
    } else {
        return (
            <TextView {...props}>
                {children}
            </TextView>
        );
    }
};

Text.propTypes = {
    x : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    y : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    width : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    height : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    textAlign : React.PropTypes.oneOf(['left', 'right', 'center']),
    verticalAlign : React.PropTypes.oneOf(['top', 'bottom', 'middle']),
    color : React.PropTypes.string,
    cursor : React.PropTypes.string,
    scale : React.PropTypes.number, //0...1
    group : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    debugMode : React.PropTypes.bool,
    onClick : React.PropTypes.func,
    onMouseOver : React.PropTypes.func,
    onMouseOut : React.PropTypes.func,
    rotation : React.PropTypes.number,
    rotationCenterX : React.PropTypes.number, //0...1
    rotationCenterY : React.PropTypes.number, //0...1,
    stroke : React.PropTypes.string,
    strokeWidth : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    strokeOpacity : React.PropTypes.number, //0...1
    selectable : React.PropTypes.bool,
};

Text.defaultProps = {
    textAlign : 'center',
    verticalAlign : 'middle',
    scale : 1,
    x : 0,
    y : 0,
    rotation : 0,
    rotationCenterX : 0.5,
    rotationCenterY : 0.5,
    cursor : 'default',
    selectable : false
};