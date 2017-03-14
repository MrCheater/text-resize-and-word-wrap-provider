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
                        height = {this.props.height / 2}
                        stroke = 'red'
                        strokeWidth = {5}
                        scale = {this.props.textScale}
                    >
                        {randomContent.longText}
                    </Text>
                    <Text
                        x = {0}
                        y = {this.props.height / 2}
                        width = {this.props.width}
                        height = {this.props.height / 2}
                        scale = {this.props.textScale}
                    >
                        <div
                            stroke = 'blue'
                            strokeWidth = {3}
                        >
                            Some text
                        </div>
                        <div>
                            <span
                                stroke = 'green'
                                strokeWidth = {2}
                            >
                                Some
                            </span>
                            <span>
                                text
                            </span>
                            <span
                                stroke = 'red'
                                strokeWidth = {1}
                            >
                                text
                            </span>
                        </div>
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