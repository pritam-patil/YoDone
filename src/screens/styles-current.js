import {
    StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
    },

    display: {
        flex: 1,
        flexDirection: 'row'
    },

    progressbar: {
        flex: 0,
        width: 4,
        backgroundColor: 'black'
    },


    tasks: {
        elevation: 1,
        marginLeft: 4,
        flex:1,
        flexDirection: 'column-reverse',
    },

    containerTasks: {
        justifyContent: 'flex-start',
    },

    input: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
    },

    form: {
        margin: 4,
        padding: 4,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textInput: {
        fontSize: 14,
        flexGrow: 1
    },

    text: {
        paddingLeft: 4,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    listItem: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    hr: {
        height: 1,
    },
});