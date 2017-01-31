import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

@textResizeAndWordWrap
export class DemoRotation extends React.Component {
    state = {
        rotation : 0,
        rotationCenterX : 0.5,
        rotationCenterY : 0.5
    };

    updateRotation = (rotation) => this.setState({
        rotation
    });

    updateRotationCenterX = (rotationCenterX) => this.setState({
        rotationCenterX
    });

    updateRotationCenterY = (rotationCenterY) => this.setState({
        rotationCenterY
    });

    render() {
        const size = Math.min(this.props.width, this.props.height) / 3;
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
                    <circle
                        fill = 'red'
                        r = '5px'
                        cx = {size + size * this.state.rotationCenterX}
                        cy = {size + size * this.state.rotationCenterY}
                    />
                    <Text
                        x = {size}
                        y = {size}
                        width = {size}
                        height = {size}
                        rotation = {this.state.rotation}
                        rotationCenterX = {this.state.rotationCenterX}
                        rotationCenterY = {this.state.rotationCenterY}
                        debugMode
                    >
                        {randomContent.longText}
                    </Text>
                </svg>
                <div>
                    <div>
                        Rotation
                        <Slider
                            min = {0}
                            max = {360}
                            step = {1}
                            value = {this.state.rotation}
                            onChange = {this.updateRotation}
                        />
                    </div>
                    <div>
                        Rotation Center X
                        <Slider
                            min = {0}
                            max = {1}
                            step = {0.05}
                            value = {this.state.rotationCenterX}
                            onChange = {this.updateRotationCenterX}
                        />
                    </div>
                    <div>
                        Rotation Center Y
                        <Slider
                            min = {0}
                            max = {1}
                            step = {0.05}
                            value = {this.state.rotationCenterY}
                            onChange = {this.updateRotationCenterY}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

DemoRotation.defaultProps = {
    width: 480,
    height: 480,
    backgroundColor: '#DDDDDD',
};