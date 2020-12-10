import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class RequestScreen extends Component {
    constructor() {
        super();

        this.state = {
            userId: firebase.auth().currentUser.email,
            bookName: "",
            reasonToRequest: "",
        }
    }
    createUniqueId() {
        return Math.random().toString(36).substring(7)
    }
    addRequset = (bookName, reasonToRequest) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('requseted_books').add({
            "user_id": userId,
            "book_name": bookName,
            "reason_to_request": reasonToRequest,
            "request_id": randomRequestId
        })
        this.setState({
            bookName: '',
            reasonToRequest: ''
        })
        return alert("book requsted succesfully")
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput style={styles.formTextInput} 
                    
                    placeholder={
                        "enterBookname"
                    } onChangeText={(text) => {
                        this.setState({
                            bookName: text
                        })
                    }}
                        value={
                            this.state.bookName
                        }
                    />
                    <TextInput style={styles.formTextInput}
                    
                    placeholder={
                        "reasonTRequest"
                    } onChangeText={(text) => {
                        this.setState({
                            reasonToRequest: text
                        })
                    }}
                        value={this.state.reasonToRequest}
                    />
                    <TouchableOpacity style={styles.button}onPress={
                        () => {
                            this.addRequset(this.state.bookName, this.state.reasonToRequest)
                        }
                    }>
                        <Text>
                            request
                    </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyboardStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formTextInput:{
        width:'75%',
        height:40,
        alignSelf:'center',
        marginTop:20,
        padding:10,
        borderWidth:2,
        borderRadius:10
    },
    button:{
        width:'75%',
        height:45,
        justifyContent:'center',
        borderRadius:10,
        alignItems:'center',
        marginTop:20
    }

})