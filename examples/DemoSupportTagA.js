import React from 'react';
import { Text, textResizeAndWordWrap } from '../src';
import { randomContent } from './randomContent'

@textResizeAndWordWrap
export class DemoSupportTagA extends React.Component {
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
                        scale = {this.props.textScale}
                    >
                        <a href = 'http://google.com' target = "_blank" bold>
                            Google (target = "_blank")
                        </a>
                        <br/>
                        <a href = 'http://google.com' target = "_self" color = "red" italic>
                            Google (target = "_self")
                        </a>
                        <br/>
                        <a href = 'http://google.com' target = "_parent" lineThrough>
                            Google (target = "_parent")
                        </a>
                        <br/>
                        <a href = 'http://google.com' target = "_top" underline>
                            Google (target = "_top")
                        </a>
                        <br/>
                        <a href='http://yandex.ru'>
                            <div>
                                {randomContent.longText}
                            </div>
                        </a>
                        <br/>
                        <div weight = {1.5}>
                            <a href='http://yandex.ru'>
                                {randomContent.longText}
                            </a>
                        </div>
                    </Text>
                </svg>
            </div>
        );
    }
}

DemoSupportTagA.defaultProps = {
    width: 480,
    height: 360,
    backgroundColor: '#DDDDDD',
    textScale: 0.95
};