import React from 'react';
import { DemoChartBar } from './DemoChartBar';
import { textResizeAndWordWrap } from '../index';

const style = {display:'inline-block', verticalAlign:'top'};

@textResizeAndWordWrap
export class DemoTwoChartBarOneContext extends React.Component {
    render() {
        return (
            <div>
                <div style = {style}>
                    1)
                </div>
                <div style = {style}>
                    <DemoChartBar/>
                </div>
                <div style = {style}>
                    2)
                </div>
                <div style = {style}>
                    <DemoChartBar/>
                </div>
            </div>
        );
    }
}