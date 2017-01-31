import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';

@textResizeAndWordWrap
export class DemoStroke extends React.Component {
    render() {
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
                    <Text
                        x = {0}
                        y = {0}
                        width = {this.props.width}
                        height = {this.props.height / 2}
                        stroke = "green"
                        strokeWidth = {4}
                    >
                        Some Text
                    </Text>
                    <Text
                        x = {0}
                        y = {this.props.height / 2}
                        width = {this.props.width}
                        height = {this.props.height / 2}
                    >
                        Lorem
                        <span
                            stroke = "red"
                            strokeWidth = {5}
                            strokeOpacity = {0.5}
                        >
                            ipsum dolor
                        </span>
                        sit amet
                    </Text>
                </svg>
            </div>
        );
    }
}

DemoStroke.defaultProps = {
    width: 480,
    height: 360,
    backgroundColor: '#DDDDDD'
};