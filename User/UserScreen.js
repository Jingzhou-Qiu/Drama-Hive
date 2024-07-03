import { useContext } from "react"
import { Text, View } from "react-native"
import UserContext from "../MyContext/UserContext"
import { screenStyle } from "../MyContext/ConstantContext"


export default function UserScreen() {
    const user = useContext(UserContext)

    return (
        <View style={screenStyle.container}>
            <Text>Hi, {user}</Text>
        </View>
    )
}