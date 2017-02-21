import React from 'react';
import { Text, textResizeAndWordWrap } from '../src';
import { randomContent } from './randomContent';

const shift = (Math.random() * 10)|0;
const bubbles = [
    {x: 18, y: 56, r: 39},
    {x: 42, y: 148, r: 32},
    {x: 6, y: 232, r: 38},
    {x: 20, y: 308, r: 63},
    {x: 144, y: 358, r: 57},
    {x: 284, y: 408, r: 31},
    {x: 378, y: 380, r: 38},
    {x: 262, y: 233, r: 78},
    {x: 106, y: 172, r: 77},
    {x: 118, y: 58, r: 49},
    {x: 244, y: 14, r: 33},
    {x: 240, y: 92, r: 58},
    {x: 358, y: 46, r: 51},
    {x: 380, y: 160, r: 46},
].map(
    (bubble, index) => ({
        ...bubble,
        color : randomContent.colors[(index + shift) % randomContent.colors.length],
        text : [1,2].map(()=>randomContent.texts[(randomContent.texts.length * Math.random())|0]).join(' ')
    })
);

@textResizeAndWordWrap
export class DemoBubbles extends React.Component {
    render() {
        return (
            <div>
                <svg
                    width = {`${this.props.width}px`}
                    height = {`${this.props.height}px`}
                >
                    <rect
                        width = {`${this.props.width}px`}
                        height = {`${this.props.height}px`}
                        fill = {this.props.backgroundColor}
                    />
                    {bubbles.map(
                        ({x, y, r, text, color}, index) => (
                            <g key = {index}>
                                <circle
                                    cx = {x + r}
                                    cy = {y + r}
                                    r = {r}
                                    strokeWidth = {2}
                                    stroke = {color}
                                    fill = {color}
                                    fillOpacity = {0.2}
                                />
                                <Text
                                    x = {x}
                                    y = {y}
                                    width = {r * 2}
                                    height = {r * 2}
                                    color = {color}
                                    scale = {this.props.textScale}
                                >
                                    <div weight = {2}>
                                        {r}
                                    </div>
                                    <div>
                                    {text}
                                    </div>
                                </Text>
                            </g>
                        )
                    )}
                </svg>
            </div>
        );
    }
}

DemoBubbles.defaultProps = {
    width: 480,
    height: 480,
    backgroundColor: '#DDDDDD',
    textScale: Math.SQRT1_2 * 0.9
};