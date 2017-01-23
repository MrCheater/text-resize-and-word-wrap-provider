import React from 'react';
import { Component } from './helpers/Component';
import { contextTypes } from './helpers/contextTypes';
import { isServer } from './helpers/isServer';
import { PureConnector } from './helpers/PureConnector';
import { setFontSizeAndWordWrap } from './fontSize/setFontSizeAndWordWrap';
import { calculateFontSize } from './fontSize/calculateFontSize';

export class TextResizeAndWordWrapProvider extends Component {
    groups = {};

    resizeAndWordWrap() {
        if(isServer || !this.needUpdate) {
            return;
        }
        this.needUpdate = false;
        const groups = this.groups;
        for(let groupId in groups) {
            const group = groups[groupId];
            if(group.needUpdate) {
                setFontSizeAndWordWrap(group, calculateFontSize(group));
                group.needUpdate = false;
            }
        }
    };

    componentDidMount() {
        this.resizeAndWordWrap();
    }

    componentDidUpdate() {
        this.resizeAndWordWrap();
    }

    render() {
        return (
            <PureConnector>
                {this.props.children}
            </PureConnector>
        );
    }

    getChildContext() {
        return {
            textResizeAndWordWrapProviderAddTextItem : this.context.textResizeAndWordWrapProviderAddTextItem || this.addTextItem,
            textResizeAndWordWrapProviderRemoveTextItem : this.context.textResizeAndWordWrapProviderRemoveTextItem || this.removeTextItem,
            textResizeAndWordWrapProviderUpdateTextItem : this.context.textResizeAndWordWrapProviderUpdateTextItem || this.updateTextItem,
            textResizeAndWordWrapProviderUpdateGroupTextItem : this.context.textResizeAndWordWrapProviderUpdateGroupTextItem || this.updateGroupTextItem,
        };
    }

    addTextItemToGroup(textItem, groupId) {
        if(this.groups[groupId]) {
            this.groups[groupId].push(textItem);
        } else {
            const group = [textItem];
            group.needUpdate = true;
            this.groups[groupId] = group;
        }
    }

    removeTextItemFromGroup(textItem, groupId) {
        this.groups[groupId] = this.groups[groupId].filter(
            (currentTextItem) => currentTextItem !== textItem
        );
        if(this.groups[groupId].length === 0) {
            delete this.groups[groupId];
        }
    }

    addTextItem = (instance) => {
        const groupId = instance.textItem.group;
        this.addTextItemToGroup(instance, groupId);
        this.optionalForceUpdate();
    };

    removeTextItem = (instance) => {
        const groupId = instance.textItem.group;
        this.removeTextItemFromGroup(instance, groupId);
        this.optionalForceUpdate();
    };

    optionalForceUpdate = (groupId) => {
        const group = this.groups[groupId];
        if(group) {
            group.needUpdate = true;
        }
        if(!this.needUpdate) {
            this.needUpdate = true;
            this.forceUpdate();
        }
    };

    updateGroupTextItem = (instance, groupId, nextGroupId) => {
        this.removeTextItemFromGroup(instance, groupId);
        this.addTextItemToGroup(instance, nextGroupId);
    };

    updateTextItem = (instance) => {
        const groupId = instance.textItem.group;
        this.optionalForceUpdate(groupId);
    };
}

TextResizeAndWordWrapProvider.childContextTypes = TextResizeAndWordWrapProvider.contextTypes = contextTypes;