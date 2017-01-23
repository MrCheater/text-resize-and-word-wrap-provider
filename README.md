#See DEMO
https://mrcheater.github.io/text-resize-and-word-wrap-provider/
[![image](https://mrcheater.github.io/text-resize-and-word-wrap-provider/demo.png)](https://mrcheater.github.io/text-resize-and-word-wrap-provider/)

#See DEMO SOURCES
https://github.com/MrCheater/text-resize-and-word-wrap-provider/tree/master/src/demo

# Install 
```bash
npm install text-resize-and-word-wrap-provider
```

# Browser support
* IE 9
* IE 10
* IE 11
* Edge
* Firefox 3.5+ 
* Chrome
* Opera 12+
* Safari 5.1.7+
* Midori (font-size < 3px - no support)

# Compiler targets
* React
* Preact
* React-lite

# Usage
```javascript
import {
    Text,
    TextResizeAndWordWrapProvider,
    textResizeAndWordWrap
} from 'text-resize-and-word-wrap-provider';
```

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
Text.propTypes = {
    x : React.PropTypes.number.isRequired,
    y : React.PropTypes.number.isRequired,
    width : React.PropTypes.number.isRequired,
    height : React.PropTypes.number.isRequired,
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
    x : 0,
    y : 0
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
