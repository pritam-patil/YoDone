import React, { Component } from 'react';
import {
    TouchableHighlight,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { View as AnimatedView } from 'react-native-animatable';
export class CardItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onPress, index } = this.props;
        const { card: item } = this.props;
        return (
            <AnimatedView key={`animated-view-card-${item.text}`} animation={"bounceInRight"} duration={2000}>
                <TouchableHighlight
                    style={{elevation: 1}}
                    underlayColor={'red'}
                    onLongPress={onPress}
                    key={`touchable-card-${item.text}`} >
                    <ListItem
                        checkmark
                        checkmarkColor={'green'}
                        title={item.text}
                        titleStyle={{fontWeight: 'bold'}}
                        subtitle={!!item.ts ? item.ts.toString() : 'got nothing :('}
                        subtitleStyle={{fontSize: 12}}
                        key={`li-card-${item.text}`}
                        style={{height: 60}}
                    />
                </TouchableHighlight>
            </AnimatedView>
        );
    }

}