import { Pressable, StyleSheet, Text, View } from "react-native"
import SignUpForm from "./SignupForm"
import { useState } from "react"
import Login from "./Login"

const LoginSignup=({navigation})=>{
    
  const [isLogin,setIsLogin]=useState(true)

  const handlePress=()=>{
        setIsLogin(!isLogin)
  }
    return(
        <View style={styles.container}>
            <Pressable style={styles.navigationButtons} onPress={handlePress}><Text>{isLogin?"Register":"Login"}</Text></Pressable>
            {isLogin?<Login/>:<SignUpForm/>}
        </View>
    )
}

export default LoginSignup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navigationButtons:{
        width:"6rem",
        textAlign:"center",
        border:"1px solid black",
        marginBottom:"1rem",
        padding:"0.5rem",
        paddingLeft:"1rem",
        paddingRight:"1rem"
    }
  });