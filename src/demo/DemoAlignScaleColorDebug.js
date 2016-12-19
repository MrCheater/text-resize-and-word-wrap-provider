import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

@textResizeAndWordWrap
export class DemoAlignScaleColorDebug extends React.Component {
    state = {
        scale : 0.75,
        colors : ["#F2671F", "#C91B26", "#9C0F5F", "#60047A", "#160A47", "#D93240", "#638CA6", "#BF22D9", "#0F5959"],
        colorsOn : true,
        longTextOn : false,
        debugModeOn : true,
        multiTextOn : false,
        weightTopText : 2,
        weightBottomText : 1
    };

    updateScale = (scale) => {
        this.setState({
            scale
        });
    };

    toggleColors = () => {
        this.setState({
            colorsOn : !this.state.colorsOn
        });
    };

    toggleLongText = () => {
        this.setState({
            longTextOn : !this.state.longTextOn
        });
    };

    toggleDebugMode = () => {
        this.setState({
            debugModeOn : !this.state.debugModeOn
        });
    };

    toggleMultiText = () => {
        this.setState({
            multiTextOn : !this.state.multiTextOn
        });
    };

    updateWeightTopText = (weightTopText) => {
        this.setState({
            weightTopText
        });
    };

    updateWeightBottomText = (weightBottomText) => {
        this.setState({
            weightBottomText
        });
    };

    getTextValue = (value) => {
        return this.state.multiTextOn ? [
            {text: value, weight: this.state.weightTopText, color: 'black'},
            {text: LOREM_IPSUM, weight: this.state.weightBottomText}
        ] : (value + (this.state.longTextOn ? (' ' + LOREM_IPSUM) : ''));
    };

    render() {
        return (
            <div>
                <svg
                    width = '500px'
                    height = '360px'
                    overflow = 'visible'
                >
                    <rect
                        x = '0px'
                        y = '0px'
                        width = '500px'
                        height = '360px'
                        fill = 'grey'
                        opacity = {0.25}
                    />
                    <Text
                        x = {0}
                        y = {0}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Left Top')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'left'}
                        verticalAlign = {'top'}
                        color = {this.state.colorsOn ? this.state.colors[0] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {185}
                        y = {0}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Center Top')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'center'}
                        verticalAlign = {'top'}
                        color = {this.state.colorsOn ? this.state.colors[1] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {370}
                        y = {0}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Right Top')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'right'}
                        verticalAlign = {'top'}
                        color = {this.state.colorsOn ? this.state.colors[2] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {0}
                        y = {125}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Left Middle')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'left'}
                        verticalAlign = {'middle'}
                        color = {this.state.colorsOn ? this.state.colors[3] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {185}
                        y = {125}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Center Middle')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'center'}
                        verticalAlign = {'middle'}
                        color = {this.state.colorsOn ? this.state.colors[4] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {370}
                        y = {125}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Right Middle')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'right'}
                        verticalAlign = {'middle'}
                        color = {this.state.colorsOn ? this.state.colors[5] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {0}
                        y = {250}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Left Bottom')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'left'}
                        verticalAlign = {'bottom'}
                        color = {this.state.colorsOn ? this.state.colors[6] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {185}
                        y = {250}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Center Bottom')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'center'}
                        verticalAlign = {'bottom'}
                        color = {this.state.colorsOn ? this.state.colors[7] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                    <Text
                        x = {370}
                        y = {250}
                        width = {130}
                        height = {110}
                        value = {this.getTextValue('Right Bottom')}
                        group = '1'
                        scale = {this.state.scale}
                        textAlign = {'right'}
                        verticalAlign = {'bottom'}
                        color = {this.state.colorsOn ? this.state.colors[8] : undefined}
                        debugMode = {this.state.debugModeOn}
                    />
                </svg>
                <div style = {{width : '500px'}}>
                    <div>
                        <div>
                            Scale = {this.state.scale}
                        </div>
                        <Slider
                            min = {0.5}
                            max = {1}
                            step = {0.001}
                            value = {this.state.scale}
                            onChange = {this.updateScale}
                        />
                    </div>
                    <table style = {{width : '500px'}}>
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
                                    min = {1}
                                    max = {3}
                                    step = {0.1}
                                    value = {this.state.weightTopText}
                                    onChange = {this.updateWeightTopText}
                                />
                            </div>
                            <div>
                                Weight Bottom Text = {this.state.weightBottomText}
                                <Slider
                                    min = {1}
                                    max = {3}
                                    step = {0.1}
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