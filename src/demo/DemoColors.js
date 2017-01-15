import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';

@textResizeAndWordWrap
export class DemoColors extends React.Component {
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
                    {randomContent.colors.map(
                        (color, index) => (
                            <Text
                                key = {index}
                                x = {(index % 5) * textWidth}
                                y = {((index / 5)|0) * this.props.height / 2}
                                width = {textWidth}
                                height = {this.props.height / 2}
                                scale = {this.props.textScale}
                                color = {color}
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

DemoColors.defaultProps = {
    width: 480,
    height: 200,
    backgroundColor: '#DDDDDD',
    textScale: 0.8
};