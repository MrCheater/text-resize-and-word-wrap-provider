#See DEMO
https://mrcheater.github.io/text-resize-and-word-wrap-provider/
[![image](https://mrcheater.github.io/text-resize-and-word-wrap-provider/demo.png)](https://mrcheater.github.io/text-resize-and-word-wrap-provider/)

#See DEMO SOURCES
https://github.com/MrCheater/text-resize-and-word-wrap-provider/tree/master/src/demo

#Usage 
##Text (Standalone)
Text.Example "Simple"
```javascript
<Text
    x = {185} y = {0}
    width = {130} height = {110}
>
    Hello world
</Text>
```
Text.Example "Multi Text"
```javascript
<Text
    x = {185} y = {0}
    width = {130} height = {110}
>
    <tdiv weight = {2}>
        Title
    </tdiv>
    <tdiv weight = {1}>
        Hello world
    </tdiv>
</Text>
```

Text.PropTypes
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
    debugMode : React.PropTypes.bool
};


Text.defaultProps = {
    textAlign : 'center',
    verticalAlign : 'middle',
    scale : 1,
    value : ''
};
```
##Text + Context Provider
```javascript
<TextResizeAndWordWrapProvider>
    <Text
        x = {185} y = {0}
        width = {130} height = {110}
        value = {[
            {text: 'Title', weight: 2},
            {text: 'Hello world', weight: 1}
        ]}
    />
</TextResizeAndWordWrapProvider>
```
or
```javascript
@textResizeAndWordWrap
export class DemoChartBar extends React.Component {
    render() {
        return (
            <Text
                x = {185} y = {0}
                width = {130} height = {110}
                value = {[
                    {text: 'Title', weight: 2},
                    {text: 'Hello world', weight: 1}
                ]}
            />
        );
    }
}
```
or 
```javascript
export class DemoChartBarView extends React.Component {
    render() {
        return (
            <Text
                x = {185} y = {0}
                width = {130} height = {110}
                value = {[
                    {text: 'Title', weight: 2},
                    {text: 'Hello world', weight: 1}
                ]}
            />
        );
    }
}
export const DemoChartBar = textResizeAndWordWrap(DemoChartBarView);
```

#Install and Build
First Console:
```bash
npm install -g webpack
npm install -g babel-cli
npm install 
npm run build
```
Second Console:
```bash
npm run start
#Open http://localhost:3000/
```
