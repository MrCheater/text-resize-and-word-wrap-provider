import React from 'react';
import { Text, textResizeAndWordWrap } from '../src';
import { randomContent } from './randomContent';

@textResizeAndWordWrap
export class DemoStroke extends React.Component {
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
                    <Text
                        x = {0}
                        y = {0}
                        width = {this.props.width}
                        height = {this.props.height}
                        stroke = 'red'
                        strokeWidth = {5}
                        scale = {this.props.textScale}
                    >
                        {randomContent.longText}
                    </Text>
                </svg>
            </div>
        );
    }
}

DemoStroke.defaultProps = {
    width: 480,
    height: 360,
    textScale: 0.8,
    backgroundColor: '#DDDDDD'
};