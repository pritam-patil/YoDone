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
import moment from 'moment';
import TimeHeader  from '../components/time-header';
import { ProgressBar } from '../components/progress-bar';
import EmptyList from '../containers/no-items';
import { styles } from './styles-current';
import {CardItem} from "../components/card-item";
const isAndroid = Platform.OS == 'android';
const viewPadding = 10;

class ToDoContainer extends Component {
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

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addTask = () => {
        let notEmpty = !!this.state.text && this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                prevState => {
                    let { tasks, text } = prevState;
                    return {
                        tasks: tasks.concat({ key: tasks.length, text: text, ts: moment().format('LT') }),
                        text: ""
                    };
                },
                () => Tasks.save(this.state.tasks)
            );
        }
    };

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

    renderNativeinput = () =>
        <Input
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            onSubmitEditing={this.addTask}
            value={this.state.text}
            maxLength={100}
            placeholder="Add a task"
            returnKeyType="go"
            returnKeyLabel="add"
        />;


    renderCardItem = (item, index) => (
        <AnimatedView key={`animated-view-card-${item.text}`} animation={"bounceInRight"} duration={2000}>
            <TouchableHighlight
                style={{elevation: 1}}
                underlayColor={'red'}
                onLongPress={() => this.deleteTask(index)}
                key={`touchable-card-${item.text}`} >
                <ListItem
                    title={item.text}
                    key={`li-card-${item.text}`}
                />
            </TouchableHighlight>
        </AnimatedView>
    );

    renderTextItem (item, index) {
        return (
            <View key={item.text}>
                <View key={item.id} style={styles.listItem}>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                    <Text> { item.ts } </Text>
                    <TouchableHighlight
                        style={styles.removeButton} onPress={() => this.deleteTask(index)}
                    >
                        <Icon name={"ios-remove-circle-outline"} size={30} />
                    </TouchableHighlight>
                </View>
                <View style={styles.hr} />
            </View>
        )
    }

    renderCardElements = (item, index) =>
        <TouchableNativeFeedback
            useForeground
            onPress={() => this.deleteTask(index)}
        >
            <Card
                featuredTitle={item.text}
                featuredTitleStyle={styles.text}
                image={{
                    uri: null, //urlToImage || defaultImg
                }}
                flexDirection={'column'}
                justifyContent={'space-between'}
            >
                <Text style={{ marginBottom: 10 }}>
                    {'Read More..'}
                </Text>
                <Divider style={{ backgroundColor: '#dfe6e9' }} />
            </Card>
        </TouchableNativeFeedback>


    render() {//<View style={[styles.container, { paddingBottom: this.state.viewPadding - 100 }]}>

        const { tasks } = this.state;
        return (
            <View style={[styles.container, { paddingBottom: 10 }]}>
                { //<TimeHeader/>

                }
                <View key={"display"} style={styles.display}>
                    <ProgressBar numItems={tasks.length} />
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
                                keyExtractor={(item, index) => item.id || item.text.toString()}
                                renderItem={({ item, index }) => <CardItem card={item} onPress={() => this.deleteTask(index)}/> }
                            />

                    }
                </View>
                <View style={styles.input}>
                    <View style={styles.form}>
                        { //<Input onChangeText={this.changeTextHandler}/>
                        }
                        { this.renderNativeinput() }
                        { !tasks.length ?
                            <AnimatedView
                                animation={"bounce"}
                                duration={2000}
                                iterationCount={5}
                            >
                                <Icon name={"ios-add-circle-outline"} size={30}   onPress={this.addTask}/>
                            </AnimatedView>
                            :
                            <AnimatedView animation={"bounce"} duration={5000}>
                                <Icon name={"ios-add-circle-outline"} size={30}   onPress={this.addTask}/>
                            </AnimatedView>
                        }

                    </View>
                </View>
            </View>

        );
    }

}

let Tasks = {
    convertToArrayOfObject(tasks, callback) {
        return callback(
            tasks ? tasks.split("||").map((task, i) => {
                const [text, ts] = task.split('_');
                return { key: i, text: text, ts: ts };
            })
            : []
        );
    },
    convertToStringWithSeparators(tasks) {
        return tasks.map(task => { return `${task.text}_${task.ts}`}).join("||");
    },
    all(callback) {
        return AsyncStorage.getItem("TASKS", (err, tasks) =>
            this.convertToArrayOfObject(tasks, callback)
        );
    },
    save(tasks) {
        AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
    }
};

export default ToDoContainer;