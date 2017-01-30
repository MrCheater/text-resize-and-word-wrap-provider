import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';

@textResizeAndWordWrap
export class DemoMouseEvents extends React.Component {
    state = {
        lastMouseEvent : ''
    };

    onClick = () => this.setState({
        lastMouseEvent : 'CLICK'
    });

    onMouseOver = () => this.setState({
        lastMouseEvent : 'MOUSE_OVER'
    });

    onMouseOut = () => this.setState({
        lastMouseEvent : 'MOUSE_OUT'
    });

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
                        onClick = {this.onClick}
                        onMouseOver = {this.onMouseOver}
                        onMouseOut = {this.onMouseOut}
                    >
                        Some Text
                    </Text>
                    <Text
                        x = {0}
                        y = {this.props.height / 2}
                        width = {this.props.width}
                        height = {this.props.height / 2}
                    >
                        Disable Events
                        <span
                            onClick = {this.onClick}
                            onMouseOver = {this.onMouseOver}
                            onMouseOut = {this.onMouseOut}
                            bold
                        >
                            Enable Events
                        </span>
                        Disable Events
                    </Text>
                </svg>
                <div>
                    Last Mouse Event: {this.state.lastMouseEvent}
                </div>
            </div>
        );
    }
}

DemoMouseEvents.defaultProps = {
    width: 480,
    height: 360,
    backgroundColor: '#DDDDDD',
    textScale: 0.8
};