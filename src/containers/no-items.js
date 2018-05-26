import React from 'react';
import { View, Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

const EmptyList = ({style}) =>
        <View style={style} animation={"wobble"} duration={3000}>
            <Icon name={"md-bulb"} size={30} />
            <Text> { "Great Job!"} </Text>
        </View>;

export default EmptyList;