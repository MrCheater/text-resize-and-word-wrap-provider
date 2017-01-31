import React from 'react';
import { TextResizeAndWordWrapProvider } from './TextResizeAndWordWrapProvider';
import { Component } from './helpers/Component';
import { parser } from './helpers/parser';
import { contextTypes } from './helpers/contextTypes';
import { makeLink } from './helpers/makeLink';
import parseAbsoluteCSSUnit from 'parse-absolute-css-unit';

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
        const x = parseAbsoluteCSSUnit(props.x);
        const y = parseAbsoluteCSSUnit(props.y);
        const width = parseAbsoluteCSSUnit(props.width);
        const height = parseAbsoluteCSSUnit(props.height);
        const halfInverseScale = (1 - props.scale) / 2;
        this.textItem = {
            ...props,
            value : parser(props.children || ''),
            group : props.group || this.randomGroupId,
            width : width * props.scale,
            height : height * props.scale,
            x : x + width * halfInverseScale,
            y : y + height * halfInverseScale,
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
                this.wordWidths[key] = this.refs[key].getComputedTextLength();
            }
        }
    };

    componentDidUpdate() {
        if(!this.isContextReady()) {
            return;
        }
        this.update();
        this.context.textResizeAndWordWrapProviderUpdateTextItem(this);
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

    renderWords =  ({words, props}, innerTextIndex) => {
        const wordsAndSpaces = [];
        const countWords = words.length;
        for(let wordIndex = 0; wordIndex < countWords; wordIndex++) {
            const {
                color,
                overline,
                underline,
                lineThrough,
                bold,
                italic,
                fontStyle : _fontStyle,
                fontWeight : _fontWeight,
                isSpanEnd,
                isTagA,
                href,
                target,
                onClick,
                onMouseOver,
                onMouseOut,
                cursor,
                stroke,
                strokeWidth,
                strokeOpacity,
            } = props[wordIndex];

            const textDecoration = (overline || underline || lineThrough) ? (
                `${overline ? 'overline ' : ''} ${underline ? 'underline ' : ''} ${lineThrough ? 'line-through ' : ''}`
            ) : 'none';
            const fontWeight = _fontWeight || (bold ? 'bold' : undefined);
            const fontStyle = _fontStyle || (italic ? 'italic' : undefined);

            let word = words[wordIndex];
            let space = '\u00A0';
            if(isTagA) {
                word = makeLink(word, href, target, color, textDecoration, fontWeight, fontStyle, cursor, stroke, strokeWidth, strokeOpacity);
                space = makeLink(space, href, target, color, textDecoration, fontWeight, fontStyle, cursor, stroke, strokeWidth, strokeOpacity);
            }
            wordsAndSpaces.push(
                <tspan
                    x = '0px'
                    y = '0px'
                    key = {`word-${wordIndex}`}
                    ref = {`word-${innerTextIndex}-${wordIndex}`}
                    fill = {color}
                    textDecoration = {textDecoration}
                    fontWeight = {fontWeight}
                    fontStyle = {fontStyle}
                    onClick = {onClick}
                    onMouseOver = {onMouseOver}
                    onMouseOut = {onMouseOut}
                    cursor = {cursor}
                    stroke = {stroke}
                    strokeWidth = {strokeWidth}
                    strokeOpacity = {strokeOpacity}
                >
                    {word}
                </tspan>
            );
            if(countWords - wordIndex - 1) {
                wordsAndSpaces.push(
                    <tspan
                        key = {`space-${wordIndex}`}
                        ref = {`space-${innerTextIndex}-${wordIndex}`}
                        textDecoration = {isSpanEnd ? 'inherit' : textDecoration}
                        onClick = {onClick}
                        onMouseOver = {onMouseOver}
                        onMouseOut = {onMouseOut}
                        cursor = {cursor}
                    >
                        {space}
                    </tspan>
                );
            }
        }
        return (
            <text
                key = {innerTextIndex}
                ref = {`words-${innerTextIndex}`}
            >
                {wordsAndSpaces}
            </text>
        );
    };

    render() {
        if(!this.isContextReady()) {
            return (
                <TextResizeAndWordWrapProvider>
                    <Text {...this.props}/>
                </TextResizeAndWordWrapProvider>
            );
        }
        const {
            x,
            y,
            width,
            height,
            debugMode,
            onClick,
            onMouseOver,
            onMouseOut,
            rotation,
            rotationCenterX,
            rotationCenterY,
            cursor,
            stroke,
            strokeOpacity,
            strokeWidth : _strokeWidth,
        } = this.props;
        const strokeWidth = parseAbsoluteCSSUnit(_strokeWidth);
        return (
            <g
                fill = {this.props.color}
                onClick = {onClick}
                onMouseOver = {onMouseOver}
                onMouseOut = {onMouseOut}
                cursor = {cursor}
                transform = {`rotate(${rotation} ${x + width * rotationCenterX} ${y + height * rotationCenterY})`}
                stroke = {stroke}
                strokeWidth = {strokeWidth}
                strokeOpacity = {strokeOpacity}
            >
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
    x : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    y : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    width : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    height : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    textAlign : React.PropTypes.oneOf(['left', 'right', 'center']),
    verticalAlign : React.PropTypes.oneOf(['top', 'bottom', 'middle']),
    color : React.PropTypes.string,
    cursor : React.PropTypes.string,
    scale : React.PropTypes.number, //0...1
    group : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    debugMode : React.PropTypes.bool,
    onClick : React.PropTypes.func,
    onMouseOver : React.PropTypes.func,
    onMouseOut : React.PropTypes.func,
    rotation : React.PropTypes.number,
    rotationCenterX : React.PropTypes.number, //0...1
    rotationCenterY : React.PropTypes.number, //0...1,
    stroke : React.PropTypes.string,
    strokeWidth : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    strokeOpacity : React.PropTypes.number, //0...1
};

Text.defaultProps = {
    textAlign : 'center',
    verticalAlign : 'middle',
    scale : 1,
    x : 0,
    y : 0,
    rotation : 0,
    rotationCenterX : 0.5,
    rotationCenterY : 0.5,
    cursor : 'default'
};

Text.contextTypes = contextTypes;