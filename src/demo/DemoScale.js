import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';

@textResizeAndWordWrap
export class DemoScale extends React.Component {
    render() {
        const textWidth = this.props.width / 5;
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
                    {[1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map(
                        (scale, index) => (
                            <Text
                                key = {index}
                                x = {(index % 5) * textWidth + 5}
                                y = {((index / 5)|0) * this.props.height / 2 + 5}
                                width = {textWidth - 10}
                                height = {this.props.height / 2 - 10}
                                scale = {scale}
                                debugMode = {true}
                            >
                                {randomContent.longText}
                            </Text>
                        )
                    )}
                </svg>



            </div>
        );
    }
}

DemoScale.defaultProps = {
    width: 480,
    height: 200,
    backgroundColor: '#DDDDDD',
};