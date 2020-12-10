import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import db from "../config"
import firebase from "firebase"

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();

        this.state={
            emailId:"",
            password:"",
            firstName:"",
            lastName:"",
            address:"",
            conatact:"",
            confirmPassword:"",
            isModalVisible:false
        }
    }

    showModal=()=>{
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
                <View style={styles.modalContanier}>
                <ScrollView style={{width:"100%"}}>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                       <Text style={styles.title}>REGISTRATION FORM</Text>
                       <TextInput 
                       style={styles.formTextInput}
                       placeholder="First Name"
                       maxLength={10}
                       onChangeText={(text)=>{
                           this.setState({
                               firstName:text
                           })
                       }}/>  

                       <TextInput 
                       style={styles.formTextInput}
                       placeholder="Last Name"
                       maxLength={10}
                       onChangeText={(text)=>{
                           this.setState({
                               lastName:text
                           })
                       }}/>  
                </KeyboardAvoidingView>
                </ScrollView>
                </View>
            </Modal>
        )
    }


    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            this.props.navigation.navigate('donateBooks')
            console.log("donate")
        }).catch((error)=>{
            var errorCode=error.errorCode
            var errorMessage=error.message
            return alert (errorMessage)
        })
    }

    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
            return alert ('usser Add Sucessfully')
        })

        .catch((error)=>{
            var errorCode=error.errorCode
            var errorMessage=error.message
            return alert (errorMessage)
        })
    }

    render(){
        return(
            <KeyboardAvoidingView>

            {this.showModal()}

            <View style={styles.container}>
                <Text>BOOK SANTA</Text>
            </View>

            <View style={styles.buttonContainer}>
            <TextInput 
               style={styles.loginBox}
               placeholder="abc@xyz.com"
               keyboardType="email-address"
               onChangeText={(text)=>{
                   this.setState({
                       emailId:text
                   })
               }}/> 
               <TextInput 
               style={styles.loginBox}
               placeholder="Password"
               secureTextEntry={true}
               onChangeText={(text)=>{
                   this.setState({
                       password:text
                   })
               }}/> 
            </View>
            <View>
                <TouchableOpacity style={styles.loginButton} onPress={()=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }}>
                    <Text style={{textAlign:'center'}}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={()=>{
                    this.setState({isModalVisible:true})
                }}>
                    <Text style={{textAlign:'center'}}>SignUp</Text>
                </TouchableOpacity>
                
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#f8be85"
    },
    loginBox:{
        borderWidth:2,
        fontSize:20,
        width:300,
        height:40,
        margin:10,
        padding:10
    },
    loginButton:{
        height:40,
        width:100,
        borderWidth:2,
        marginTop:20,
        borderRadius:10
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalContanier:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        backgroundColor:"#ffffff",
        marginTop:80,
        marginBottom:80,
        marginLeft:30,
        marginRight:30
    },
    title:{
        justifyContent:"center",
        alignItems:"center",
        fontSize:30,
        margin:50,
        color:"#ff5522"
    },
    formTextInput:{
        width:"75%",
        height:30,
        alignSelf:"center",
        marginTop:10,
        padding:10,
        borderWidth:1,
        borderRadius:10,
    }
})