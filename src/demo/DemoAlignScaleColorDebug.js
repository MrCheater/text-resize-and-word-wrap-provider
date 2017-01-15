import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const textAlign = ['left', 'center', 'right'];
const verticalAlign = ['top', 'middle', 'bottom'];
const value = [
    'Left Top',    'Center Top',    'Right Top',
    'Left Middle', 'Center Middle', 'Right Middle',
    'Left Bottom', 'Center Bottom', 'Right Bottom',
];

@textResizeAndWordWrap
export class DemoAlignScaleColorDebug extends React.Component {
    state = {
        scale : 0.75,
        colors : randomContent.colors,
        colorsOn : true,
        longTextOn : false,
        debugModeOn : true,
        multiTextOn : false,
        weightTopText : 2,
        weightBottomText : 1
    };

    updateScale = (scale) => this.setState({
        scale
    });

    toggleColors = () => this.setState({
        colorsOn : !this.state.colorsOn
    });

    toggleLongText = () => this.setState({
        longTextOn : !this.state.longTextOn
    });

    toggleDebugMode = () => this.setState({
        debugModeOn : !this.state.debugModeOn
    });

    toggleMultiText = () => this.setState({
        multiTextOn : !this.state.multiTextOn
    });

    updateWeightTopText = (weightTopText) => this.setState({
        weightTopText
    });

    updateWeightBottomText = (weightBottomText) => this.setState({
        weightBottomText
    });

    render() {
        const paddingWidth = this.props.width * this.props.paddingScale;
        const paddingHeight = this.props.height * this.props.paddingScale;
        const itemWidth = (this.props.width - paddingWidth * 2) / 3;
        const itemHeight = (this.props.height - paddingHeight * 2) / 3;
        const children = [];
        for(let iy = 0; iy < 3; iy++) {
            for(let ix = 0; ix < 3; ix++) {
                const index = iy * 3 + ix;
                children.push(
                    <Text
                        key = {index}
                        x = {ix * (itemWidth + paddingWidth)}
                        y = {iy * (itemHeight + paddingHeight)}
                        width = {itemWidth}
                        height = {itemHeight}
                        group = 'text'
                        scale = {this.state.scale}
                        textAlign = {textAlign[ix]}
                        verticalAlign = {verticalAlign[iy]}
                        color = {this.state.colorsOn ? this.state.colors[index] : undefined}
                        debugMode = {this.state.debugModeOn}
                    >
                        {this.state.multiTextOn ? ([
                            <div
                                key = {0}
                                weight = {this.state.weightTopText}
                                color = 'black'
                            >
                                {value[index]}
                            </div>,
                            <div
                                key = {1}
                                weight = {this.state.weightBottomText}
                            >
                                {randomContent.longText}
                            </div>
                        ]) : (
                            value[index] + (this.state.longTextOn ? (' ' + randomContent.longText) : '')
                        )}
                    </Text>
                );
            }
        }

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
                    {children}
                </svg>
                <div style = {{width : `${this.props.width}px`}}>
                    <div>
                        <div>
                            Scale = {this.state.scale}
                        </div>
                        <Slider
                            min = {this.props.minScale}
                            max = {this.props.maxScale}
                            step = {this.props.stepScale}
                            value = {this.state.scale}
                            onChange = {this.updateScale}
                        />
                    </div>
                    <table style = {{width : `${this.props.width}px`}}>
                        <tbody>
                            <tr>
                                <td onClick = {this.toggleColors}>
                                    Colors
                                    <input
                                        type = 'checkbox'
                                        checked = {this.state.colorsOn}
                                        readOnly
                                    />
                                </td>
                                <td onClick = {this.toggleLongText}>
                                    Long Text
                                    <input
                                        type = 'checkbox'
                                        disabled = {this.state.multiTextOn}
                                        checked = {this.state.longTextOn}
                                        readOnly
                                    />
                                </td>
                                <td onClick = {this.toggleDebugMode}>
                                    Debug Mode
                                    <input
                                        type = 'checkbox'
                                        checked = {this.state.debugModeOn}
                                        readOnly
                                    />
                                </td>
                                <td onClick = {this.toggleMultiText}>
                                    Multi text
                                    <input
                                        type = 'checkbox'
                                        checked = {this.state.multiTextOn}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {this.state.multiTextOn ? (
                        <div>
                            <div>
                                Weight Top Text = {this.state.weightTopText}
                                <Slider
                                    min = {this.props.minTextWeight}
                                    max = {this.props.maxTextWeight}
                                    step = {this.props.stepTextWeight}
                                    value = {this.state.weightTopText}
                                    onChange = {this.updateWeightTopText}
                                />
                            </div>
                            <div>
                                Weight Bottom Text = {this.state.weightBottomText}
                                <Slider
                                    min = {this.props.minTextWeight}
                                    max = {this.props.maxTextWeight}
                                    step = {this.props.stepTextWeight}
                                    value = {this.state.weightBottomText}
                                    onChange = {this.updateWeightBottomText}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

DemoAlignScaleColorDebug.defaultProps = {
    width: 480,
    height: 480,
    paddingScale: 0.1,
    backgroundColor: '#DDDDDD',
    minTextWeight: 1,
    maxTextWeight: 3,
    stepTextWeight: 0.1,
    minScale: 0.5,
    maxScale: 1,
    stepScale: 0.001
};