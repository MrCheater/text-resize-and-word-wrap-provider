import React from 'react';
import { Text, textResizeAndWordWrap } from '../src';

@textResizeAndWordWrap
export class DemoMouseCursor extends React.Component {
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
                        height = {this.props.height}
                        scale = {this.props.textScale}
                    >
                        <span cursor = 'auto'>
                            auto
                        </span>
                        <span cursor = 'crosshair'>
                            crosshair
                        </span>
                        <span cursor = 'default'>
                            default
                        </span>
                        <span cursor = 'pointer'>
                            pointer
                        </span>
                        <span cursor = 'move'>
                            move
                        </span>
                        <span cursor = 'e-resize'>
                            e-resize
                        </span>
                        <span cursor = 'ne-resize'>
                            ne-resize
                        </span>
                        <span cursor = 'nw-resize'>
                            nw-resize
                        </span>
                        <span cursor = 'n-resize'>
                            n-resize
                        </span>
                        <span cursor = 'se-resize'>
                            se-resize
                        </span>
                        <span cursor = 'sw-resize'>
                            sw-resize
                        </span>
                        <span cursor = 's-resize'>
                            s-resize
                        </span>
                        <span cursor = 'w-resize'>
                            w-resize
                        </span>
                        <span cursor = 'text'>
                            text
                        </span>
                        <span cursor = 'wait'>
                            wait
                        </span>
                        <span cursor = 'help'>
                            help
                        </span>
                    </Text>
                </svg>
            </div>
        );
    }
}

DemoMouseCursor.defaultProps = {
    width: 480,
    height: 280,
    backgroundColor: '#DDDDDD',
};


