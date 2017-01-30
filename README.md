[![Build Status](https://travis-ci.org/MrCheater/text-resize-and-word-wrap-provider.svg?branch=master)](https://travis-ci.org/MrCheater/text-resize-and-word-wrap-provider)

#See DEMO
https://mrcheater.github.io/text-resize-and-word-wrap-provider/
[![Demo](https://mrcheater.github.io/text-resize-and-word-wrap-provider/demo.png)](https://mrcheater.github.io/text-resize-and-word-wrap-provider/)

#See DEMO SOURCES
https://github.com/MrCheater/text-resize-and-word-wrap-provider/tree/master/src/demo

# Install 
```bash
npm install text-resize-and-word-wrap-provider
```

# Usage
```javascript
import {
    Text,
    TextResizeAndWordWrapProvider,
    textResizeAndWordWrap
} from 'text-resize-and-word-wrap-provider';
```

# Browser support
* Chrome
* Safari 5.1.7+
* Edge
* IE 9
* IE 10
* IE 11
* Firefox 3.5+ 
* Opera 12+
* Midori (font-size < 3px - no support)

# Compiler targets
* React
* Preact
* React-lite

## Text (Standalone)
#### Simple Text
```javascript
<Text
    x = {20} y = {30}
    width = {100} height = {50}
>
    Hello world
</Text>
```
#### Rich Text
```javascript
<Text
    x = {50} y = {0}
    width = {150} height = {70}
    scale = {0.9}
>
    <div weight = {2} color = 'red'>
        Title
    </div>
    <div weight = {1} italic bold>
        <span overline>
            Hello
        </span>
        <span underline>
            world
        </span>
    </div>
</Text>
```

## PropTypes
```javascript
type CSSUnitString = oneOfTypes([
    Number,
    String /(^-?\d*\.?\d+)(cm|mm|in|px|pt|pc)?$/
])
// CSSUnitString.Example:
// 96, '1in', '2.54cm', '25.4mm', '72pt', '6pc', '96px', '96'

Text.propTypes = {
    x : CSSUnitString,
    y : CSSUnitString,
    width : CSSUnitString,
    height : CSSUnitString,
    textAlign : oneOf(['left', 'right', 'center']),
    verticalAlign : oneOf(['top', 'bottom', 'middle']),
    color : String,
    scale : Number, //0...1
    group : oneOfType([React.PropTypes.string, React.PropTypes.number]),
    debugMode : Bool,
    onClick : Function,
    onMouseOver : Function,
    onMouseOut : Function,
};

Text.defaultProps = {
    textAlign : 'center',
    verticalAlign : 'middle',
    scale : 1,
    x : 0,
    y : 0,
};
```
##Text + Context Provider
```javascript
<TextResizeAndWordWrapProvider>
    <Text
        x = {20} y = {30}
        width = {100} height = {50}
    >
        Hello world
    </Text>
</TextResizeAndWordWrapProvider>
```
or
```javascript
@textResizeAndWordWrap
export class Demo extends React.Component {
    render() {
        return (
            <Text
                x = {20} y = {30}
                width = {100} height = {50}
            >
                Hello world
            </Text>
        );
    }
}
```
or 
```javascript
export class DemoView extends React.Component {
    render() {
        return (
            <Text
                x = {20} y = {30}
                width = {100} height = {50}
            >
                Hello world
            </Text>
        );
    }
}
export const Demo = textResizeAndWordWrap(DemoView);
```

# Build and Start Demo-Server
First Console:
```bash
npm install -g webpack@1.14.0
npm install -g babel-cli
npm install 
npm run build
```
Second Console:
```bash
npm run start
#Open http://localhost:3000/
```
