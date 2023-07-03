export default class APIService {
    static API_ADDRESS = "http://10.194.139.183:6400/api/v1/violations"

    static sendData = async (
        formData,
        address = this.API_ADDRESS
    ) => { 
        response = await fetch(address, {
                method: 'POST',
                body: formData,
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

        response = await this.sendData(formData, "http://10.194.139.183:6400/api/v1/violations")
        if (response !== undefined) {
            if (response.status === 201) {
                // Report Upload Success :)
                return true
            } else {
                // Report Upload Failed :(
            }
        }
        return false
    }
}