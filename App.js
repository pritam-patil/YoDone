import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrenItemsScreen from './src/screens/current-affairs';
import CompletedItemsScreen from './src/screens/completed-items';

const Home = StackNavigator({
   Current: {
     screen: CurrenItemsScreen,
     navigationOptions: {
         tabBarLabel: 'Current',
         tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
     },
   },
   Completed: {
     screen: CompletedItemsScreen,
     navigationOptions: {
         tabBarLabel: 'Completed',
         tabBarIcon: ({ tintColor }) => <Icon name="ios-remove-circle-outline" size={35} color={tintColor} />
     },
   },
   All: {
     screen: CurrenItemsScreen,
     navigationOptions: {
         tabBarLabel: 'All',
         tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
     },
   }
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <CurrenItemsScreen />
    );
  }
}
