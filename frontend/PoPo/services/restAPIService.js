import { getContentUriAsync } from "expo-file-system"

export default class APIService {
    static API_ADDRESS = "http://popo-1349446900.us-east-1.elb.amazonaws.com"
    static ACCESS_TOKEN = ""


    static sendData = async (
        formData,
        address = this.API_ADDRESS
    ) => { 
        let h = new Headers()
        h.append("access_token", APIService.ACCESS_TOKEN)

        response = await fetch(address, {
                method: 'POST',
                body: formData,
                headers: {"Authorization": `Bearer ${APIService.ACCESS_TOKEN}`}
            }).catch((reason) => {
                console.log(reason)
                response = undefined
            })
        
        return response
    }

    static sendReport = async (imageURI, type, extraComments) => {
        let formData = new FormData();
            formData.append("image", {
                uri: imageURI,
                type: "image/png",
                name: "image.png",
            })
        formData.append("type", type)
        formData.append("extra_comments", extraComments)

        response = await this.sendData(formData, `${APIService.API_ADDRESS}/api/v1/violations`)
        
        if (response !== undefined) {
            console.log(response)
            console.log(await response.text())
            if (response.status === 201) {
                // Report Upload Success :)
                return true
            } else {
                // Report Upload Failed :(
            }
        }
        // Report Upload Failed :(
        return false
    }

    static login = async (username="", password="") => {
        if (username == "" || password == "") {
            // Auto Login
        }
        
        let formData = new FormData();
        formData.append("username", username)
        formData.append("password", password)

        response = await this.sendData(formData, `${APIService.API_ADDRESS}/api/v1/auth/login`)
        if (response !== undefined) {
            if (response.status === 200) {
                // Success Login
                responseContent = await response.json()
                accessToken = responseContent["access_token"]
                APIService.ACCESS_TOKEN = accessToken

                return {success:true, reason:""}
            } else {
                // Failed Login
                return {success:false, reason:"Username or password incorrect"}
            }
        }
        console.log("login failed")
        return {success:false, reason:"Server not found"}
    }

    static signup = async (username, password, email) => {
        let formData = new FormData();
        formData.append("username", username)
        formData.append("password", password)
        formData.append("email", email)

        response = await this.sendData(formData, `${APIService.API_ADDRESS}/api/v1/auth/signup`)

        if (response !== undefined) {

            if (response.status === 201) {
                // Success SignUp
                return {success:true, reason:""}
            } else {
                // Failed SignUp
                return {success:false, reason:"Could Not Create Account"}
            }
        }

        return {success:false, reason:"Server not found"}
    }
}