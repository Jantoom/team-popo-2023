import * as React from "react";
import { TextInput, Button, ScrollView, TouchableHighlight } from "react-native";
import { Image, View, Text } from "react-native";
import APIService from "../../services/restAPIService";
import NavigationService from "../../services/navigationService";
import Spinner from 'react-native-loading-spinner-overlay';
import MainLayout from "../mainLayout";

/* border radiuses */
export const Border = {
    br_9xs: 4,
  };

  export const Color = {
    white: "#fff",
  };

export default class LoginPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
          username: "sementha",
          password: "123",
          isLoading: false,
          errorOccured: false,
        }

        this.login = async () => {
          if (this.state.username === "" || this.state.password === "") {
            this.setState({isLoading: false, errorOccured: true})
            return false
          }
          this.setState({isLoading: true, errorOccured: false})
          success = await APIService.login(this.state.username, this.state.password)
          console.log(success)
          if (success) {
            this.setState({isLoading: false})
            NavigationService.navigate("home")
          } else {
            this.setState({isLoading: false, errorOccured: true})
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
          <View>
            <ScrollView style={{width:"100%", alignSelf:"center"}}>
              <Image source={require("../../assets/logo.png")} style={{alignSelf:"center",height:"40%", marginTop:"20%", aspectRatio:1, resizeMode:"contain", marginBottom:30}}>
              </Image>
              <View style={{paddingHorizontal:20}}>
                <TextInput value={this.state.username} onChangeText={(newValue) => this.setState({username: newValue})} placeholder="Username" style={{color:"black", borderWidth:1, padding:15, borderRadius:10, marginBottom:20}}></TextInput>
                <TextInput value={this.state.password} onChangeText={(newValue) => this.setState({password: newValue})} placeholder="Password" style={{color:"black", borderWidth:1, padding:15, borderRadius:10}}></TextInput>
                
                {this.state.errorOccured == true ? <Text style={{color:"red", alignSelf:"center"}}>Username or password incorrect</Text> : <></>}

                <View style={{display:"flex", flexDirection:"row", marginTop:20}}>
                  <TouchableHighlight style={{padding:10, flex:1, marginRight:10}}>
                    <View style={{}}>
                      <Text style={{alignSelf:"center"}}>Forgot Password?</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={() => this.login()} style={{padding:10, flex:1, marginLeft:10, backgroundColor:"#A3BFF4", borderRadius:10}}>
                    <View>
                      <Text style={{alignSelf:"center", color:"white"}}>Login</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
            {this.state.isLoading == true ? (
              <View style={{flex:1, width:"100%", height:"100%", position:'absolute', backgroundColor:'#000000aa', justifyContent:'center'}}>
                  <View style={{width:"100%", aspectRatio:1, borderRadius:30, alignSelf:'center'}}>
                      <Spinner textContent={'Logging in...'} textStyle={{color:"white"}} visible={true} style={{width:"10%", aspectRatio:1, backgroundColor:"white"}}></Spinner>
                  </View>
              </View>
            ) : <></>}
          </View>
          );
    }
}

