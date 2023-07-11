import MainLayout from "../components/mainLayout"
import FileService from "./fileService"

export default class APIService {
    static LAN_ADDRESS = "http://10.194.139.183:6400"
    static WEB_ADDRESS = "http://popo-1349446900.us-east-1.elb.amazonaws.com"

    static API_ADDRESS = APIService.WEB_ADDRESS
    static ACCESS_TOKEN = ""


    static sendData = async (
        formData,
        address = this.API_ADDRESS
    ) => { 
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

    static getData = async (
        address = this.API_ADDRESS,
        data = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${APIService.ACCESS_TOKEN}`}
        }
    ) => {
        response = await fetch(address, data).catch((reason) => {
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
            if (response.status === 201) {
                // Report Upload Success :)
                return true
            } else {
                console.log(response)
                console.log(await (await response).text())
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

    static running = false
    static getReportHistory = async () => {
        if (this.running === true) {
            return {success: false, reason: "already"}
        }

        this.running = true
        response = await this.getData(`${APIService.API_ADDRESS}/api/v1/violations`)
        if (response !== undefined) {
            reportHistory = await response.json()
            violations = reportHistory["violations"]

            var results = await Promise.all(violations.map(async (violation) => {
                imageLink = violation["presigned_url"]
                if (await FileService.checkCacheFileExists(violation["id"] + ".png") === false) {
                    uri = await FileService.saveReportHistoryImage(imageLink, violation["id"])

                    violation["uri"] = uri
                    console.log(violation["uri"])
                } else {
                    violation["uri"] = FileService.getCacheDir() + violation["id"] + ".png"
                }
                return violation
            }))


            MainLayout.mainLay.setState({reportHistory: reportHistory})
            if (response.status === 200) {
                // Success 
                this.running = false
                return {success:true, reason:"", reportHistory: reportHistory}
            } else {
                // Failed 
                this.running = false
                return {success:false, reason:"Could Not Fetch Report History"}
            }
        }

        this.running = false
        return {success:false, reason:"Server not found"}
    }
}