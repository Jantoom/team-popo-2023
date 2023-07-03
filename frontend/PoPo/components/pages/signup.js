import * as React from "react";
import { TextInput, Button, ScrollView, TouchableHighlight } from "react-native";
import { Image, View, Text } from "react-native";
import APIService from "../../services/restAPIService";
import NavigationService from "../../services/navigationService";
import Spinner from 'react-native-loading-spinner-overlay';
import MainLayout from "../mainLayout";

export default class SignUpPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
          username: "sementha",
          password: "123",
          email: "sementha@gmail.com",
          isLoading: false,
          errorOccured: false,
          errorText: ""
        }

        this.signup = async () => {
          if (this.state.username === "" || this.state.password === "" || this.state.email === "") {
            this.setState({isLoading: false, errorOccured: true, errorText: "All fields are required"})
            return false
          }

          this.setState({isLoading: true, errorOccured: false})
          responseData = await APIService.signup(this.state.username, this.state.password, this.state.email)
          
          if (responseData.success) {
            this.setState({isLoading: false})
            NavigationService.navigate("login")
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
          <View style={{flex:1}}>
            <ScrollView style={{width:"100%", alignSelf:"center"}}>
              <Image source={require("../../assets/logo.png")} style={{alignSelf:"center", height:350, marginTop:"20%", aspectRatio:1, resizeMode:"contain", marginBottom:30}}>
              </Image>
              <View style={{paddingHorizontal:20}}>
                <TextInput value={this.state.username} onChangeText={(newValue) => this.setState({username: newValue})} placeholder="Username" style={{color:"black", borderWidth:1, padding:12, borderRadius:10, marginBottom:20, fontSize:16}}></TextInput>
                <TextInput value={this.state.email} onChangeText={(newValue) => this.setState({email: newValue})} placeholder="Email" style={{color:"black", borderWidth:1, padding:12, borderRadius:10, marginBottom:20, fontSize:16}}></TextInput>
                <TextInput value={this.state.password} onChangeText={(newValue) => this.setState({password: newValue})} placeholder="Password" style={{color:"black", borderWidth:1, padding:12, borderRadius:10, fontSize:16}}></TextInput>
                
                {this.state.errorOccured == true ? <Text style={{color:"red", alignSelf:"center"}}>{this.state.errorText}</Text> : <></>}

                <View style={{display:"flex", flexDirection:"row", marginTop:20}}>
                  <TouchableHighlight underlayColor={"#0000001f"} style={{padding:10, flex:1, marginRight:10, borderRadius: 10}} onPress={() => {NavigationService.navigate("login")}}>
                    <View style={{}}>
                      <Text style={{alignSelf:"center"}}>Login</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor={"#93acdb"} onPress={() => this.signup()} style={{padding:10, flex:1, marginLeft:10, backgroundColor:"#A3BFF4", borderRadius:10}}>
                    <View>
                      <Text style={{alignSelf:"center", color:"white"}}>Sign Up</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
            {this.state.isLoading == true ? (
              <View style={{flex:1, height:"100%", width:"100%",position:'absolute', backgroundColor:'#000000aa', justifyContent:'center'}}>
                <View style={{width:"100%", height:"100%", alignSelf:'center', flex:1}}>
                    <Spinner textContent={'Signing Up...'} textStyle={{color:"white"}} visible={true}></Spinner>
                </View>
            </View>
            ) : <></>}
          </View>
          );
    }
}

