import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { useState } from "react"
import MessageDisplay from "./MessageDisplay"
import feed from "./OpenAI"



const style = StyleSheet.create({
    messageContainer: {
        borderRadius: 20,
        justifyContent: "flex-end",
        backgroundColor: "#E0ECDE",
        height: 800,
        flexDirection: "column",

    },
    inputContainer: {
        backgroundColor: "#F0EFC3",
        borderRadius: 20,
        height: 100,
        flexDirection: "column",
    },

    input: {
        backgroundColor: 'white',
        height: 40,
        width: '80%',
        margin: 12,
        borderRadius: 10,
        marginLeft: 20,
        paddingLeft: 8,
    },
})



export default function AISearch() {
    const [input, setInput] = useState(null)
    const [message, setMessage] = useState([])
    const [num, setNum] = useState(1)

    const handleSubmission = () => {
        setMessage(prevMessages => [...prevMessages, {text: input, sender: 'me', id: num}]);
        feed(input).then(rs => setMessage(prevMessages => [...prevMessages, {text: rs.message, sender: 'assistant', movieTitle: rs.movieTitles, id: num + 1}]))
        setInput(null)
        setNum(num + 2)

    }


    return (
        <View style={[{marginTop: 0}]}>
            <KeyboardAvoidingView style={style.messageContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <MessageDisplay messages={message} />
                <View style={style.inputContainer}>
                    <TextInput style={style.input} value={input} placeholder="Ask me"
                        onChangeText={(text) => {
                            setInput(text)
                        }} onSubmitEditing={handleSubmission} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}