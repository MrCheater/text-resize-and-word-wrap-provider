import React from 'react';

export class PureConnector extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children;
    }

    render() {
        return React.Children.only(
            this.props.children
        );
    }
}