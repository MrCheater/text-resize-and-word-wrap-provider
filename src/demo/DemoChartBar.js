import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';
import { randomSort } from './randomSort';

@textResizeAndWordWrap
export class DemoChartBar extends React.Component {
    componentWillMount() {
        this.update();
    }

    update = () => {
        const countBars = Math.round(Math.random() * (this.props.maxBarsCount - this.props.minBarsCount)) + this.props.minBarsCount;
        const itemWidth = this.props.width / countBars;
        const barWidth = itemWidth * this.props.barScale;
        const dx = (itemWidth - barWidth) / 2;
        const bars = [];
        const textSeriesY = this.props.height - this.props.textSeriesHeight;
        const randomTexts = [...randomContent.texts];
        const randomColors = [...randomContent.colors];
        for(let barIndex = countBars; barIndex--;) {
            randomTexts.sort(randomSort);
            randomColors.sort(randomSort);
        }
        for(let barIndex = countBars; barIndex--;) {
            const value = ~~(Math.random() * this.props.maxValue + this.props.minValue);
            const barHeight = value * (this.props.height - this.props.textValueHeight - this.props.textSeriesHeight - this.props.textSeriesPadding) / 100 ;
            const barY = this.props.height - barHeight - this.props.textSeriesHeight - this.props.textSeriesPadding;
            bars[barIndex] = {
                x : barIndex * itemWidth + dx,
                y : barY,
                height : barHeight,
                width : barWidth,
                fill : randomColors[barIndex],
                text : randomTexts[barIndex],
                value,
                textValueX : barIndex * itemWidth + dx,
                textValueY : barY - this.props.textValueHeight,
                textValueWidth : barWidth,
                textSeriesX : barIndex * itemWidth,
                textSeriesY,
                textSeriesWidth : itemWidth,
            };
        }
        this.setState({ bars, barWidth });
    };

    toggleDebugMode = () => this.setState({
        debugMode : !this.state.debugMode
    });

    render() {
        return (
            <div>
                <svg
                    width = {`${this.props.width}px`}
                    height = {`${this.props.height}px`}
                    onClick = {this.update}
                >
                    <rect
                        width = {`${this.props.width}px`}
                        height = {`${this.props.height}px`}
                        fill = {this.props.fill}
                    />
                    {this.state.bars.map(
                        (bar, index) => (
                            <g key = {index}>
                                <rect
                                    x = {`${bar.x}px`}
                                    y = {`${bar.y}px`}
                                    width = {`${bar.width}px`}
                                    height = {`${bar.height}px`}
                                    fill = {bar.fill}
                                />
                                <Text
                                    x = {bar.textSeriesX}
                                    y = {bar.textSeriesY}
                                    width = {bar.textSeriesWidth}
                                    height = {this.props.textSeriesHeight}
                                    group = 'series'
                                    verticalAlign = 'top'
                                    scale = {this.props.textScale}
                                    debugMode = {this.state.debugMode}
                                >
                                    {bar.text}
                                </Text>
                                <Text
                                    x = {bar.textValueX}
                                    y = {bar.textValueY}
                                    width = {bar.textValueWidth}
                                    height = {this.props.textValueHeight}
                                    group = 'values'
                                    verticalAlign = 'bottom'
                                    scale = {this.props.textScale}
                                    debugMode = {this.state.debugMode}
                                >
                                    {bar.value}
                                </Text>
                            </g>
                        )
                    )}
                </svg>
                <div>
                    <button onClick = {this.update}>
                        Update
                    </button>
                    <button onClick = {this.toggleDebugMode}>
                        {this.state.debugMode ? 'Disable' : 'Enable'} Debug Mode
                    </button>
                </div>
            </div>
        );
    }
}

DemoChartBar.defaultProps = {
    width: 500,
    height: 360,
    textScale : 0.9,
    textSeriesHeight: 25,
    textSeriesPadding: 2,
    textValueHeight: 40,
    minBarsCount: 2,
    maxBarsCount: 10,
    minValue: 10,
    maxValue: 90,
    barScale : 0.5,
    fill: '#DDDDDD',
};