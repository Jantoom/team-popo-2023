import * as React from "react";
import { TextInput, Button, ScrollView, TouchableHighlight } from "react-native";
import { Image, View, Text } from "react-native";
import APIService from "../../services/restAPIService";
import NavigationService from "../../services/navigationService";
import Spinner from 'react-native-loading-spinner-overlay';
import MainLayout from "../mainLayout";

export default class LoginPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
          username: "B",
          password: "B",
          isLoading: false,
          errorOccured: false,
          errorText: ""
        }

        this.login = async () => {
          if (this.state.username === "" || this.state.password === "") {
            this.setState({isLoading: false, errorOccured: true, errorText: "Username Or Password Empty"})
            return false
          }
          this.setState({isLoading: true, errorOccured: false})
          responseData = await APIService.login(this.state.username, this.state.password)
          
          if (responseData.success) {
            this.setState({isLoading: false})
            NavigationService.navigate("home")
          } else {
            this.setState({
              isLoading: false,
              errorOccured: true,
              errorText: responseData.reason
            })
          }
        }
    }

    componentDidMount() {
      MainLayout.mainLay.setState({hideNav: true})
    }

    componentWillUnmount() {
      MainLayout.mainLay.setState({hideNav: false})
    }

    render() {
        return (
          <View style={{flex:1}} >
            <ScrollView style={{width:"100%", alignSelf:"center"}}>
              <Image source={require("../../assets/logo.png")} style={{alignSelf:"center",height: 350, marginTop:"20%", aspectRatio:1, resizeMode:"contain", marginBottom:30}}>
              </Image>
              <View style={{paddingHorizontal:20}}>
                <TextInput value={this.state.username} onChangeText={(newValue) => this.setState({username: newValue})} placeholder="Username" style={{color:"black", borderWidth:1, padding:12, borderRadius:10, marginBottom:20, fontSize:16}}></TextInput>
                <TextInput secureTextEntry={true} value={this.state.password} onChangeText={(newValue) => this.setState({password: newValue})} placeholder="Password" style={{color:"black", borderWidth:1, padding:12, borderRadius:10, fontSize:16}}></TextInput>
                
                {this.state.errorOccured == true ? <Text style={{color:"red", alignSelf:"center"}}>{this.state.errorText}</Text> : <></>}

                <View style={{display:"flex", flexDirection:"row", marginTop:20}}>
                  <TouchableHighlight style={{padding:10, flex:1, marginRight:10, borderRadius:10}} underlayColor={"#0000001f"} onPress={() => {NavigationService.navigate("signup")}}>
                    <View style={{}}>
                      <Text style={{alignSelf:"center"}}>Sign Up</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor={"#93acdb"} onPress={() => this.login()} style={{padding:10, flex:1, marginLeft:10, backgroundColor:"#6494e9", borderRadius:10, marginBottom:20}}>
                    <View>
                      <Text style={{alignSelf:"center", color:"white"}}>Login</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
            {this.state.isLoading == true ? (
              <View style={{flex:1, height:"100%", width:"100%",position:'absolute', backgroundColor:'#000000aa', justifyContent:'center'}}>
                  <View style={{width:"100%", height:"100%", alignSelf:'center', flex:1}}>
                      <Spinner textContent={'Logging in...'} textStyle={{color:"white"}} visible={true}></Spinner>
                  </View>
              </View>
            ) : <></>}
          </View>
          );
    }
}

