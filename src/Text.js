import React from 'react';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';
import { Component } from './Component';

export class Text extends Component {
    constructor(props, context) {
        super(props, context);
        this.randomGroupId = `group-${Date.now() + Math.random()}`;
        this.prepareTextItem(props);
    }

    isContextReady = () => {
        return this.context.textResizeAndWordWrapProviderAddTextItem &&
            this.context.textResizeAndWordWrapProviderRemoveTextItem &&
            this.context.textResizeAndWordWrapProviderUpdateTextItem &&
            this.context.textResizeAndWordWrapProviderUpdateGroupTextItem;
    };


    componentWillReceiveProps(nextProps) {
        if(this.props.group !== nextProps.group) {
            this.context.textResizeAndWordWrapProviderUpdateGroupTextItem(this, this.props.group, nextProps.group);
        }
        this.prepareTextItem(nextProps);
    }

    prepareTextItem = (props) => {
        if(!this.isContextReady()) {
            return;
        }
        this.textItem = {
            ...props,
            value : Array.isArray(props.value) ? props.value.map(
                    ({ text, weight, color }) => ({ words : text.trim().split(' '), weight, color })
                ) : [{words : ('' + props.value).trim().split(' '), weight : 1}],
            group : props.group || this.randomGroupId,
            width : props.width * props.scale,
            height : props.height * props.scale,
            x : props.x + props.width * (1 - props.scale) / 2,
            y : props.y + props.height * (1 - props.scale) / 2,
        };
    };

    update = () => {
        const { width, height, y } = this.refs.space.getBBox();
        this.symbolHeight = height;
        this.symbolDy = y;
        this.spaceWidth = width;
        this.wordWidths = {};
        const innerTextItems = this.textItem.value;
        const countTextItems = innerTextItems.length;
        for(let innerTextIndex = countTextItems; innerTextIndex--;) {
            this.refs[`words-${innerTextIndex}`].setAttribute('font-size', `${this.textItem.height}px`);
            const { words } = innerTextItems[innerTextIndex];
            const countWords = words.length;
            for(let wordIndex = countWords; wordIndex--;) {
                const key = `word-${innerTextIndex}-${wordIndex}`;
                this.wordWidths[key] = this.refs[key].getBBox().width;
            }
        }
    };

    componentDidUpdate() {
        if(!this.isContextReady()) {
            return;
        }
        this.update();
        this.context.textResizeAndWordWrapProviderUpdateTextItem();
    }

    componentDidMount() {
        if(!this.isContextReady()) {
            return;
        }
        this.update();
        this.context.textResizeAndWordWrapProviderAddTextItem(this);
    }

    componentWillUnmount() {
        if(!this.isContextReady()) {
            return;
        }
        this.context.textResizeAndWordWrapProviderRemoveTextItem(this);
    }

    renderWords =  ({words}, innerTextIndex) => (
        <g
            key = {innerTextIndex}
            ref = {`words-${innerTextIndex}`}
        >
            {words.map(
                (word, wordIndex) => (
                    <text
                        key = {`word-${wordIndex}`}
                        ref = {`word-${innerTextIndex}-${wordIndex}`}
                        x = '0px'
                        y = '0px'
                        dx = '0px'
                        dy = '0px'
                    >
                        {word}
                    </text>
                )
            )}
        </g>
    );

    render() {
        if(!this.isContextReady()) {
            return (
                <TextResizeAndWordWrapProvider>
                    <Text {...this.props}/>
                </TextResizeAndWordWrapProvider>
            );
        }
        const { x, y, width, height, debugMode } = this.props;
        return (
            <g>
                {debugMode ? (
                    <g>
                        <rect
                            fill = 'black'
                            opacity = {0.05}
                            x = {`${x}px`}
                            y = {`${y}px`}
                            width = {`${width}px`}
                            height = {`${height}px`}
                        />
                        <rect
                            fill = 'black'
                            opacity = {0.05}
                            x = {`${this.textItem.x}px`}
                            y = {`${this.textItem.y}px`}
                            width = {`${this.textItem.width}px`}
                            height = {`${this.textItem.height}px`}
                        />
                    </g>
                ) : null}
                <text
                    ref = 'space'
                    fontSize = {`${this.textItem.height}px`}
                    x = '-100px'
                >
                    {'\u00A0'}
                </text>
                { this.textItem.value.map(this.renderWords) }
            </g>
        );
    }
}

Text.propTypes = {
    x : React.PropTypes.number.isRequired,
    y : React.PropTypes.number.isRequired,
    width : React.PropTypes.number.isRequired,
    height : React.PropTypes.number.isRequired,
    value : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.arrayOf(
            React.PropTypes.shape({
                weight : React.PropTypes.number.isRequired,
                text : React.PropTypes.string.isRequired,
                color : React.PropTypes.string
            })
        )
    ]).isRequired,
    textAlign : React.PropTypes.oneOf(['left', 'right', 'center']),
    verticalAlign : React.PropTypes.oneOf(['top', 'bottom', 'middle']),
    color : React.PropTypes.string,
    scale : React.PropTypes.number, //0...1
    group : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    debugMode : React.PropTypes.bool,
};

Text.defaultProps = {
    textAlign : 'center',
    verticalAlign : 'middle',
    scale : 1,
    value : ''
};

Text.contextTypes = {
    textResizeAndWordWrapProviderAddTextItem         : React.PropTypes.func,
    textResizeAndWordWrapProviderRemoveTextItem      : React.PropTypes.func,
    textResizeAndWordWrapProviderUpdateTextItem      : React.PropTypes.func,
    textResizeAndWordWrapProviderUpdateGroupTextItem : React.PropTypes.func,
};