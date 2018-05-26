import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Text, View  } from 'react-native-animatable';

export class WobbleAnimated extends Component {
    constructor (props) {
        super(props);
        this.state = {
            wobbleIcon: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.wobbleIcon,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 5000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { wobbleIcon } = this.state;
        //<Text animation="slideInLeft" style={{...this.props.style}} iterationCount={3} direction="alternate"> { "Great Job!"} </Text>
        return (
            <View                 // Special animatable View
                animation={"flash"}
                duration={3000}
                style={{
                    ...this.props.style, //opacity: wobbleIcon,         // Bind opacity to animated value
                    opacity: 1
                }}
            >
                {this.props.children}
            </View>
        );
    }

}