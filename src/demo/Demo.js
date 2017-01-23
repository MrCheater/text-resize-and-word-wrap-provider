import React from 'react';

const mode = {
    code : 'code',
    result : 'result'
};

const tabStyle = {
    display: 'inline-block',
    width : '50%',
    boxSizing: 'border-box',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottom: 'none',
    borderColor: '#dddddd',
    backgroundColor: '#f6f6f6',
};
const tabActiveStyle = {
    ...tabStyle,
    borderColor: '#aaaaaa',
};
const tabBodyStyle = {
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#aaaaaa',
    borderTopColor: '#dddddd'
};

const containerStyle = {
    maxWidth: '1000px'
};

const codeStyle = {
    maxHeight: '480px',
    overflow: 'auto',
    display: 'block'
};

const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escapeTags(string) {
    return string.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
}

export class Demo extends React.Component {
    state = {
        mode : mode.result
    };

    setModeResult = () => this.setState({
        mode : mode.result
    });

    setModeCode = () => this.setState({
        mode : mode.code
    });

    render() {
        const DemoComponent = this.props.result;
        return (
            <div style = {containerStyle}>
                <h1>
                    {this.props.title}
                </h1>
                <div
                    style = {this.state.mode === mode.result ? tabActiveStyle : tabStyle}
                    onClick = {this.setModeResult}
                >
                    Result
                </div>
                <div
                    style = {this.state.mode === mode.code ? tabActiveStyle : tabStyle}
                    onClick = {this.setModeCode}
                >
                    Code
                </div>
                <div style = {tabBodyStyle}>
                    {this.state.mode === mode.code ? (
                        <pre>
                            <code
                                style = {codeStyle}
                                dangerouslySetInnerHTML={{__html:
                                    escapeTags(this.props.code)
                                }}
                            />
                        </pre>
                    ) : (
                        <DemoComponent/>
                    )}
                </div>
            </div>
        );
    }
}