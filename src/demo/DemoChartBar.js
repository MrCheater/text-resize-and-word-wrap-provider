import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';

const randomTexts = [
    'Lorem ipsum',
    'dolor sit amet',
    'consectetur adipiscing elit',
    'sed do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut labore',
    'et dolore',
    'magna',
    'aliqua'
];

const colors = ["#F2671F", "#C91B26", "#9C0F5F", "#60047A", "#160A47", "#D93240", "#638CA6", "#BF22D9", "#0F5959"];

@textResizeAndWordWrap
export class DemoChartBar extends React.Component {
    state = {
        countBars : 5
    };

    update = () => {
        this.setState({
            countBars : Math.round(Math.random() * 8) + 2
        });
    };

    render() {
        for(let i = 0; i < randomTexts.length; i++) {
            randomTexts.sort(
                () => Math.random() > 0.5 ? 1 : -1
            );
            colors.sort(
                () => Math.random() > 0.5 ? 1 : -1
            );
        }
        const bars = [];
        const width = 500 / this.state.countBars;
        for(let barIndex = 0; barIndex < this.state.countBars; barIndex++) {
            const value = ~~(Math.random() * 90 + 10);
            bars.push({
                x : barIndex * width + width * 0.25,
                y : 330 - value * 290 / 100,
                height : value * 290 / 100,
                width : width * 0.5,
                fill : colors[barIndex % colors.length],
                value
            });
        }

        return (
            <div onClick = {this.update}>
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
                    {bars.map(
                        (bar, index) => (
                            <g key = {index}>
                                <rect
                                    x = {bars[index].x + 'px'}
                                    y = {bars[index].y + 'px'}
                                    width = {bars[index].width + 'px'}
                                    height = {bars[index].height + 'px'}
                                    fill = {bars[index].fill}
                                />
                                <Text
                                    x = {index * width + width * 0.05}
                                    y = {335}
                                    width = {width * 0.9}
                                    height = {25}
                                    value = {randomTexts[index]}
                                    group = {'series'}
                                    verticalAlign = 'top'
                                />
                                <Text
                                    x = {bars[index].x}
                                    y = {bars[index].y - 40}
                                    width = {bars[index].width}
                                    height = {35}
                                    value = {bars[index].value}
                                    group = {'values'}
                                    verticalAlign = 'bottom'
                                />
                            </g>
                        )
                    )}
                </svg>
                <div>
                    <button>Update</button>
                </div>
            </div>
        );
    }
}