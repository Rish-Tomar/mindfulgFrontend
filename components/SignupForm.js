import { useMemo, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import RadioGroup from 'react-native-radio-buttons-group'
import DropDownPicker from 'react-native-dropdown-picker'
import CheckBox from 'expo-checkbox'

const SignUpForm =(props)=>{

    // for radio buttons
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'Male'
        },
        {
            id: '2',
            label: 'Female',
            value: 'Female'
        },
        {
            id: '3',
            label: 'Others',
            value: 'Others'
        }
    ]), []);
    const [selectedRadioId, setSelectedRadioId] = useState();

    // for setting values for form 
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phoneNumber,setPhoneNumber]=useState(0)

    // for dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Mumbai', value: 'Mumbai'},
        {label: 'Pune', value: 'Pune'},
        {label:"Ahmedabad",value:"Ahmedabad"}
    ]);

    // for checkBox
    const [heardFromLindedIn,setHeardFromLindedIn]=useState(false)
    const [heardFromFriend,setHeardFromFriend]=useState(false)
    const [heardFromOthers,setHeardFromOthers]=useState(false)

    // set values
    const setPhoneNumberHandler = value => {
        setPhoneNumber(value)
    }

    // handlePressFunction
    const handlePress =async()=>{
        if(name==="" || email==="" ||radioButtons[selectedRadioId-1]===undefined){
            alert("some values missing")
            return;
        }
        if(value==null){
            alert("select city")
        }
        const heardFrom=[]
        let gender=radioButtons[selectedRadioId-1].value
        if(heardFromFriend==true)
            heardFrom.push("friend")            
        if(heardFromLindedIn==true)
            heardFrom.push("LinkedIn")            
        if(heardFromOthers==true)
            heardFrom.push("Others")            
        console.log( name,email,phoneNumber,gender,heardFrom,value)

        const response = await fetch('http://localhost:8005/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // mode:'no-cors',
            body: JSON.stringify({
                name,
                email,
                phoneNumber,
                gender,
                heardFrom,
                city:value
            })
        })
        console.log("response",response)
        const data = await response.json()
        console.log("The response", data)
    }

    return(
        <View style={styles.signUpForm}>
        <Text>Sign Up/Register</Text>
        <View style={styles.inputDiv}>
            <TextInput style={styles.textBox} placeholder="Name"  value={name}    onChange={(e)=>setName(e.target.value)}/>
            <TextInput style={styles.textBox} placeholder="email" value={email}   onChange={(e)=>setEmail(e.target.value)}/>
            <TextInput style={styles.textBox} placeholder="Phone" value={phoneNumber} onChangeText={setPhoneNumberHandler}/>

           <View style={{display:"flex",flexDirection:"row",gap:"3rem"}}>
            <Text >Gender</Text>
            <RadioGroup
                    layout="row"
                    radioButtons={radioButtons} 
                    onPress={setSelectedRadioId}
                    selectedId={selectedRadioId}
                />
            </View>

           <View style={{display:"flex",flexDirection:"row",gap:"3rem"}}>
            <Text>Where Did You Hear From</Text>
            <View>
                <CheckBox 
                    value={heardFromLindedIn} onValueChange={setHeardFromLindedIn}
                />
                <Text>LinkedIn</Text>
            </View>
            <View>
                <CheckBox 
                    value={heardFromFriend} onValueChange={setHeardFromFriend}
                />
                <Text>Friends</Text>
            </View>
            <View>
                <CheckBox 
                    value={heardFromOthers} onValueChange={setHeardFromOthers}
                />
                <Text>Others</Text>
            </View>
           </View>
            <View style={{display:"flex",flexDirection:"row",gap:"3rem"}}>
                <Text>City</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{width:"70%"}}
                />
            </View>

            <Pressable style={styles.button} onPress={handlePress}>
                <Text>Sign-Up</Text>
            </Pressable>
        </View>
    </View>
    )
}

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

export default SignUpForm
