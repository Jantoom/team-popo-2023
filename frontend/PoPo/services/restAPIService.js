export default class APIService {
    static API_ADDRESS = "http://10.194.139.183:6400/api/v1/violations"
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
        console.log("ACCESS TOKEN")
        console.log(this.ACCESS_TOKEN)
        let formData = new FormData();
            formData.append("image", {
                uri: imageURI,
                type: "image/png",
                name: "image.png",
            })
        formData.append("type", type)
        formData.append("extra_comments", extraComments)



        response = await this.sendData(formData, "http://10.194.139.183:6400/api/v1/violations")
        
        if (response !== undefined) {
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

        response = await this.sendData(formData, "http://10.194.139.183:6400/api/v1/auth/login")
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

    static signup = async (username, password) => {
        let formData = new FormData();
        formData.append("username", username)
        formData.append("password", password)

        response = await this.sendData(formData, "http://10.194.139.183:6400/api/v1/auth/login")
        if (response !== undefined) {
            if (response.status === 200) {
                // Success Login
                responseContent = await response.json()
                accessToken = responseContent["access_token"]
                APIService.ACCESS_TOKEN = accessToken

                return true
            } else {
                // Failed Login
            }
        }
        console.log("login failed")
        return false
    }
}