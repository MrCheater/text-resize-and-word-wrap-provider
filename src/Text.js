import React from 'react';
import parseAbsoluteCSSUnit from 'parse-absolute-css-unit';
import { Component } from './Component';
import { parser } from './parser';
import { makeLink } from './makeLink';
import { contextTypes } from './contextTypes';
import { optionalContext } from './optionalContext';
import { optionalStroke } from './optionalStroke';
import { range } from 'react-range-proptypes';

@optionalContext
@optionalStroke
export class Text extends Component {
    static contextTypes = contextTypes;

    constructor(props, context) {
        super(props, context);
        this.randomGroupId = `group-${Date.now() + Math.random()}`;
        this.prepareTextItem(props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.group !== nextProps.group) {
            this.context.textResizeAndWordWrapProviderUpdateGroupTextItem(this, this.props.group, nextProps.group);
        }
        this.prepareTextItem(nextProps);
    }

    prepareTextItem = (props) => {
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
        this.update();
        this.context.textResizeAndWordWrapProviderUpdateTextItem(this);
    }

    componentDidMount() {
        this.update();
        this.context.textResizeAndWordWrapProviderAddTextItem(this);
    }

    componentWillUnmount() {
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
            } = props[wordIndex];

            const textDecoration = (overline || underline || lineThrough) ? (
                    `${overline ? 'overline ' : ''} ${underline ? 'underline ' : ''} ${lineThrough ? 'line-through ' : ''}`
                ) : 'none';
            const fontWeight = _fontWeight || (bold ? 'bold' : undefined);
            const fontStyle = _fontStyle || (italic ? 'italic' : undefined);

            let word = words[wordIndex];
            let space = '\u00A0';
            if(isTagA) {
                word = makeLink(word, href, target, color, textDecoration, fontWeight, fontStyle, cursor);
                space = makeLink(space, href, target, color, textDecoration, fontWeight, fontStyle, cursor);
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
                    style = {{display : 'initial'}}
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
                        style = {{display : 'initial'}}
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
            selectable,
        } = this.props;

        const style = selectable ? {} : {
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            OUserSelect: 'none',
            UserSelect: 'none',
        };

        return (
            <g
                style = {style}
                fill = {this.props.color}
                onClick = {onClick}
                onMouseOver = {onMouseOver}
                onMouseOut = {onMouseOut}
                cursor = {cursor}
                transform = {rotation ? `rotate(${rotation} ${x + width * rotationCenterX} ${y + height * rotationCenterY})` : undefined}
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
    scale : range(0, 1),
    group : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    debugMode : React.PropTypes.bool,
    onClick : React.PropTypes.func,
    onMouseOver : React.PropTypes.func,
    onMouseOut : React.PropTypes.func,
    rotation : React.PropTypes.number,
    rotationCenterX : range(0, 1),
    rotationCenterY : range(0, 1),
    stroke : React.PropTypes.string,
    strokeWidth : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    strokeOpacity : range(0, 1),
    selectable : React.PropTypes.bool,
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
    cursor : 'default',
    selectable : false,
};