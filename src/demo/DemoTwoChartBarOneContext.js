import React from 'react';
import { DemoChartBar } from './DemoChartBar';
import { textResizeAndWordWrap } from '../index';

@textResizeAndWordWrap
export class DemoTwoChartBarOneContext extends React.Component {
    render() {
        return (
            <div>
                <div style = {{display:'inline-block', verticalAlign:'top'}}>
                    1)
                </div>
                <div style = {{display:'inline-block', verticalAlign:'top'}}>
                    <DemoChartBar/>
                </div>
                <div style = {{display:'inline-block', verticalAlign:'top'}}>
                    2)
                </div>
                <div style = {{display:'inline-block', verticalAlign:'top'}}>
                    <DemoChartBar/>
                </div>
            </div>
        );
    }
}