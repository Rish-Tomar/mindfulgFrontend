import { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { userContext } from "../Context/Context"

const Profile =()=>{
    
    const {user, setUser} = useContext(userContext)
    console.log("user",user)
    return(
        <View style={styles.Wrapper}>
            <View style={styles.cardEntry}>
                <Text style={styles.text}>User Name:</Text><Text>{user.name}</Text>
            </View>
            <View style={styles.cardEntry}>
            <Text style={styles.text}>User Email:</Text><Text>{user.email}</Text>
            </View>
            <View style={styles.cardEntry}>
            <Text style={styles.text}>User Phone Number:</Text><Text>{user.phoneNumber}</Text>
            </View>
        </View>
    )
}


const styles =StyleSheet.create({
    Wrapper:{
        margin:"auto",
        width:"50%",
        borderRadius:"5px",
        gap:"1rem",
        padding:"1rem",
        backgroundColor:"rgb(224 236 249)",
        boxShadow:" 1px 1px 3px 3px #97c5d7",
    },
    cardEntry:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
    text:{
        fontSize:"500",
        padding:"1rem",
    },
    button:{
        marginLeft:"85%",
        padding:"5px",
        backgroundColor:"#a6a6a6",
        borderRadius:"5px"
    }
})

export default Profile