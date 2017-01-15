import React from 'react';
import ReactDOM from 'react-dom';
import { DemoAlignScaleColorDebug } from './DemoAlignScaleColorDebug';
import { DemoChartBar } from './DemoChartBar';
import { DemoTwoChartBarOneContext } from './DemoTwoChartBarOneContext';
import { DemoColors } from './DemoColors';
import { DemoScale } from './DemoScale';
import { DemoTreeMap } from './DemoTreeMap';
import { DemoRichText } from './DemoRichText';
import { DemoBubbles } from './DemoBubbles';

ReactDOM.render((
    <div>
        <h1>Demo Bar Chart</h1>
        <DemoChartBar/>
        <h1>Demo Two Bar Chart - One Context</h1>
        <DemoTwoChartBarOneContext/>
        <h1>Demo Bubbles</h1>
        <DemoBubbles/>
        <h1>Demo Tree Map</h1>
        <DemoTreeMap/>
        <h1>Demo Align, Scale, Colors, Debug Mode, Multi Text</h1>
        <DemoAlignScaleColorDebug/>
        <h1>Demo Scale</h1>
        <DemoScale/>
        <h1>Demo Colors</h1>
        <DemoColors/>
        <h1>Demo Rich Text</h1>
        <DemoRichText/>
        <h1>Demo onClick, onFocus, onBlur</h1>
        <h1>Demo onMouseOut/onMouseOver</h1>
        <h1>Demo Rotation</h1>
        <h1>Demo Mouse Cursor</h1>
        <h1>Demo Selectable/Unselectable</h1>
    </div>
), document.getElementById('app'));
