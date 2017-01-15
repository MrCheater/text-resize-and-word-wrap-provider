import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';

@textResizeAndWordWrap
export class DemoRichText extends React.Component {
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
                        <div weight = {1.5}>
                            <span color = {randomContent.colors[0]}>
                                Lorem
                            </span>
                            <span color = {randomContent.colors[1]}>
                                ipsum
                            </span>
                            <span color = {randomContent.colors[2]}>
                                dolor
                            </span>
                            <span color = {randomContent.colors[3]}>
                                sit
                            </span>
                            <span color = {randomContent.colors[4]}>
                                amet,
                            </span>
                            <span color = {randomContent.colors[5]}>
                                consectetur
                            </span>
                            <span color = {randomContent.colors[6]}>
                                adipiscing
                            </span>
                            <span color = {randomContent.colors[7]}>
                                elit
                            </span>
                            <span color = {randomContent.colors[8]}>
                                sed do
                            </span>
                            <span color = {randomContent.colors[9]}>
                                eiusmod
                            </span>
                        </div>
                        <div color = "blue" weight = {0.66}>
                            (Blue Text blue text blue text)
                        </div>
                        <br/>
                        <div bold>
                            Bold Text
                        </div>
                        <br/>
                        <div fontWeight = 'bolder'>
                            Bolder Text
                        </div>
                        <br/>
                        <div fontWeight = 'lighter'>
                            Lighter Text
                        </div>
                        <br/>
                        <div italic>
                            Italic Text
                        </div>
                        <br/>
                        <div fontStyle = 'oblique'>
                            Oblique Text
                        </div>
                        <br/>
                        <div overline>
                            Overline Text
                        </div>
                        <br/>
                        <div underline>
                            Underline Text
                        </div>
                        <br/>
                        <div lineThrough>
                            Line through Text
                        </div>
                        <br/>
                        <div color = "red">
                            Text (color = "red")
                        </div>
                        <br/>
                        <div bold italic>
                            Text bold and italic
                        </div>
                        <br/>
                        <div overline underline lineThrough>
                            Text overline and underline and line-through
                        </div>
                        <br/>
                        <div>
                            <span bold>
                                Bold Text
                            </span>
                            <span fontWeight = 'bolder'>
                                Bolder Text
                            </span>
                            <span fontWeight = 'lighter'>
                                Lighter Text
                            </span>
                            <span italic>
                                Italic Text
                            </span>
                            <span fontStyle = 'oblique'>
                                Oblique Text
                            </span>
                            <span overline>
                                Overline Text
                            </span>
                            <span underline>
                                Underline Text
                            </span>
                            <span lineThrough>
                                Line through Text
                            </span>
                            <span color = "red">
                                Text (color = "red")
                            </span>
                            <span bold italic>
                                Text bold and italic
                            </span>
                            <span overline underline lineThrough>
                                Text overline and underline and line-through
                            </span>
                        </div>
                        <br/>
                        <div underline>
                            {[1,2,3,4,5,6,7,8,9].map(()=>randomContent.texts[(randomContent.texts.length * Math.random())|0]).join(' ')}
                        </div>
                    </Text>
                </svg>
            </div>
        );
    }
}

DemoRichText.defaultProps = {
    width: 480,
    height: 800,
    backgroundColor: '#DDDDDD',
    textScale: 0.95
};