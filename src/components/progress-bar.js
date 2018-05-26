import React, { Component } from 'react';
import { View } from 'react-native';
import { View as AnimateAddButton } from 'react-native-animatable';

const getColor = (number) => {
    if (number < 2) return 'green';
    if (number < 5) return 'lightgreen';
    if (number < 8) return 'yellow';
    if (number < 10) return 'tomato';
    if (number >= 10) return 'red';

    return 'grey';
};


export const ProgressBar = ({ numItems }) => (
    <View
        style={
            {
                alignSelf: 'flex-end',
                flex: 0,
            }
        }
    >
        <AnimateAddButton
            animation={"fadeInUpBig"}
            duration={5000}
            style={
                {
                    alignSelf: 'flex-end',
                    flex: 0,
                    height: 60 * numItems,
                    backgroundColor: getColor(numItems),
                    width: 8
                }
            }
        >
        </AnimateAddButton>
    </View>
);