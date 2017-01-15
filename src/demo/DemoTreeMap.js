import React from 'react';
import { Text, textResizeAndWordWrap } from '../index';
import { randomContent } from './randomContent';

@textResizeAndWordWrap
export class DemoTreeMap extends React.Component {
    componentWillMount() {
        this.update();
    }

    getRandomTreeMap = (x, y, width, height) => {
        return (width * height > 25000) ? (
            (Math.random() > 0.5) ? [
                ...this.getRandomTreeMap(x, y, width, height / 2),
                ...this.getRandomTreeMap(x, y + height / 2, width, height / 2)
            ] : [
                ...this.getRandomTreeMap(x, y, width / 2, height),
                ...this.getRandomTreeMap(x + width / 2, y, width / 2, height)
            ]
        ) : [{
            x,
            y,
            width,
            height,
            text : [1,2,3].map(()=>randomContent.texts[(randomContent.texts.length * Math.random())|0]).join(' '),
            color : randomContent.colors[(randomContent.colors.length * Math.random())|0]
        }];
    };

    update = () => {
        this.setState({
            treeMap : this.getRandomTreeMap(0, 0, this.props.width, this.props.height)
        })
    };

    render() {
        return (
            <div onClick = {this.update}>
                <svg
                    width = {`${this.props.width}px`}
                    height = {`${this.props.height}px`}
                >
                    <rect
                        width = {`${this.props.width}px`}
                        height = {`${this.props.height}px`}
                        fill = {this.props.backgroundColor}
                    />
                    {this.state.treeMap.map(
                        ({x, y, width, height, text, color}, index) => (
                            <Text
                                key = {index}
                                x = {x}
                                y = {y}
                                width = {width}
                                height = {height}
                                debugMode = {true}
                                color = {color}
                                scale = {this.props.textScale}
                            >
                                {text}
                            </Text>
                        )
                    )}
                </svg>
                <div>
                    <button>
                        Update
                    </button>
                </div>
            </div>
        );
    }
}

DemoTreeMap.defaultProps = {
    width: 480,
    height: 360,
    backgroundColor: '#DDDDDD',
    textScale: 0.95
};