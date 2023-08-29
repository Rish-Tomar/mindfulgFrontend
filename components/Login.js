import { useContext, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { useNavigate } from "react-router-native"
import { userContext } from "../Context/Context"

const Login=()=>{

    const navigate =useNavigate()
    const {user,setUser} = useContext(userContext)
    // for setting values for form 
    const [email,setEmail]=useState("")
    const [phoneNumber,setPhoneNumber]=useState()

    // set values
    const setPhoneNumberHandler = value => {
        setPhoneNumber(value)
    }

    const handleLogin=async()=>{
        if(email==="" || phoneNumber===""){
            alert("some values missing")
            return;
        }
        const response = await fetch('http://localhost:8005/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // mode:'no-cors',
            body: JSON.stringify({
                email,
                phoneNumber,
            })
        })
        console.log("response",response)
        const data = await response.json()
        console.log("The response", data)
        if(data){
            setUser(data)
            navigate('/profile')
        }
    }


    return(
        <View style={styles.signUpForm}>
        <Text>Sign-In</Text>
        <View style={styles.inputDiv}>
            <TextInput style={styles.textBox} placeholder="email" value={email}   onChange={(e)=>setEmail(e.target.value)}/>
            <TextInput style={styles.textBox} placeholder="Phone/Password" value={phoneNumber} onChangeText={setPhoneNumberHandler}/>          

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text>LogIn</Text>
            </Pressable>
        </View>
    </View>
    )
}

export default Login

const styles =StyleSheet.create({
    signUpForm:{
        width:"50%",
        borderRadius:"5px",
        gap:"1rem",
        padding:"1rem",
        backgroundColor:"rgb(224 236 249)",
        boxShadow:" 1px 1px 3px 3px #97c5d7",
    },
    inputDiv:{
        gap:"0.5rem"
    },
    textBox:{
        padding:"1rem",
        border:"1px solid blue"
    },
    button:{
        marginLeft:"85%",
        padding:"5px",
        backgroundColor:"#a6a6a6",
        borderRadius:"5px"
    }
})