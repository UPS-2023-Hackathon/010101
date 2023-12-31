import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'



const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("Home")
          }
        })
    
        return unsubscribe
      }, [])

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }

  return (
    <View
        style={styles.container} behavior='padding'
    >
      {/* <Text>LoginScreen</Text> */}

      <View style={styles.inputContainer}>
        <TextInput 
            value={email}
            onChangeText = {text => setEmail(text)}
            placeholder='ADID' 
            style={styles.input} />
        
        <TextInput 
            placeholder='Password' 
            value={password}
            onChangeText = {text => setPassword(text)}
            style={styles.input} 
            secureTextEntry />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            onPress={handleLogin} 
            style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'white',
        color:'black',
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderRadius:10,
    },
    buttonContainer:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        
        backgroundColor:'#7D3F16',
        width:'100%',
        padding:15,
        borderRadius:15,
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#7D3F16',
        borderWidth:2,
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    },
    buttonOutlineText:{
        color:'#7D3F16',
        textAlign:'center',
    },
})