import React from 'react';
import ReactDOM from 'react-dom';
import { DemoAlignScaleColorDebug } from './DemoAlignScaleColorDebug';
import DemoAlignScaleColorDebugCode from '!raw-loader!./DemoAlignScaleColorDebug';
import { DemoChartBar } from './DemoChartBar';
import DemoChartBarCode from '!raw-loader!./DemoChartBar';
import { DemoTwoChartBarOneContext } from './DemoTwoChartBarOneContext';
import DemoTwoChartBarOneContextCode from '!raw-loader!./DemoTwoChartBarOneContext';
import { DemoColors } from './DemoColors';
import DemoColorsCode from '!raw-loader!./DemoColors';
import { DemoScale } from './DemoScale';
import DemoScaleCode from '!raw-loader!./DemoScale';
import { DemoTreeMap } from './DemoTreeMap';
import DemoTreeMapCode from '!raw-loader!./DemoTreeMap';
import { DemoRichText } from './DemoRichText';
import DemoRichTextCode from '!raw-loader!./DemoRichText';
import { DemoBubbles } from './DemoBubbles';
import DemoBubblesCode from '!raw-loader!./DemoBubbles';
import { Demo } from './Demo';

ReactDOM.render((
    <div>
        <Demo
            title = 'Demo Bar Chart'
            result = {DemoChartBar}
            code = {DemoChartBarCode}
        />
        <Demo
            title = 'Demo Two Bar Chart - One Context'
            result = {DemoTwoChartBarOneContext}
            code = {DemoTwoChartBarOneContextCode}
        />
        <Demo
            title = 'Demo Bubbles'
            result = {DemoBubbles}
            code = {DemoBubblesCode}
        />
        <Demo
            title = 'Demo Tree Map'
            result = {DemoTreeMap}
            code = {DemoTreeMapCode}
        />
        <Demo
            title = 'Demo Align, Scale, Colors, Debug Mode, Multi Text'
            result = {DemoAlignScaleColorDebug}
            code = {DemoAlignScaleColorDebugCode}
        />
        <Demo
            title = 'Demo Scale'
            result = {DemoScale}
            code = {DemoScaleCode}
        />
        <Demo
            title = 'Demo Colors'
            result = {DemoColors}
            code = {DemoColorsCode}
        />
        <Demo
            title = 'Demo Rich Text'
            result = {DemoRichText}
            code = {DemoRichTextCode}
        />
        <h1>Demo onClick/onMouseOut/onMouseOver</h1>
        <h1>Demo Rotation</h1>
        <h1>Demo Mouse Cursor</h1>
        <h1>Demo Stroke</h1>
        <h1>Demo Line-height/Word-spacing</h1>
    </div>
), document.getElementById('app'));
