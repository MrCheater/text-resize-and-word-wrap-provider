import React from 'react';
import ReactDOM from 'react-dom';
import { DemoAlignScaleColorDebug } from './DemoAlignScaleColorDebug';
import { DemoChartBar } from './DemoChartBar';
import { DemoTwoChartBarOneContext } from './DemoTwoChartBarOneContext';

ReactDOM.render((
    <div>
        <h1>Demo Align, Scale, Colors, Debug Mode, Multi Text</h1>
        <DemoAlignScaleColorDebug/>
        <h1>Demo Bar Chart</h1>
        <DemoChartBar/>
        <h1>Demo Two Bar Chart - One Context</h1>
        <DemoTwoChartBarOneContext/>
    </div>
), document.getElementById('app'));