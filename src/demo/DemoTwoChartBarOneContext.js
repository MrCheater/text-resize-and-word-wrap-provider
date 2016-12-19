import React from 'react';
import { DemoChartBar } from './DemoChartBar';
import { textResizeAndWordWrap } from '../index';

@textResizeAndWordWrap
export class DemoTwoChartBarOneContext extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            1)
                            <DemoChartBar/>
                        </td>
                        <td>
                            2)
                            <DemoChartBar/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}