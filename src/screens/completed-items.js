import React, { Component } from "react";
import {
    AsyncStorage,
    FlatList,
    Keyboard,
    Platform,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View
} from 'react-native';
import {
    Card,
    Divider,
    ListItem,
    Input
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View as AnimatedView
} from 'react-native-animatable';
import { ProgressBar } from '../components/progress-bar';
import EmptyList from '../containers/no-items';
import { styles } from './styles-current';
const isAndroid = Platform.OS == 'android';
const viewPadding = 10;

class CompletedItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            tasks: []
        }
    }

    componentDidMount() {
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
        );

        Keyboard.addListener(
            isAndroid ? "keyboardDidHide" : "keyboardWillHide",
            () => this.setState({ viewPadding: viewPadding })
        );

        Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
        // SplashScreen.hide();
    }

    deleteTask = i => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks.slice();

                tasks.splice(i, 1);

                return { tasks: tasks };
            },
            () => Tasks.save(this.state.tasks)
        );
    };

    renderCardItem = (item, index) =>
        <AnimatedView animation={"bounceInRight"} duration={2000}>
            <TouchableHighlight
                style={{elevation: 1}}
                underlayColor={'red'}
                key={item.text}
                onLongPress={() => this.deleteTask(index)}>
                <ListItem
                    title={item.text}
                    key={index}
                />
            </TouchableHighlight>
        </AnimatedView>

    render() {//<View style={[styles.container, { paddingBottom: this.state.viewPadding - 100 }]}>

        const { tasks } = this.state;
        return (
            <View style={[styles.container, { paddingBottom: 10 }]}>
                <View style={styles.display}>
                    {
                        !tasks.length ?
                            <EmptyList
                                style={{flex: 1, justifyContent: 'center', alignItems:'center'}}
                            />
                            :
                            <FlatList
                                style={styles.tasks}
                                contentContainerStyle={styles.containerTasks}
                                data={this.state.tasks}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => this.renderCardItem(item, index)}
                            />

                    }
                </View>
            </View>
        );
    }

}

let Tasks = {
    convertToArrayOfObject(tasks, callback) {
        return callback(
            tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
        );
    },
    convertToStringWithSeparators(tasks) {
        return tasks.map(task => task.text).join("||");
    },
    all(callback) {
        return AsyncStorage.getItem("COMPLETED", (err, tasks) =>
            this.convertToArrayOfObject(tasks, callback)
        );
    },
    save(tasks) {
        AsyncStorage.setItem("COMPLETED", this.convertToStringWithSeparators(tasks));
    }
};

export default CompletedItemsScreen;