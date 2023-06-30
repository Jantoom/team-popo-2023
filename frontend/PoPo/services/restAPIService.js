export default class APIService {
    static API_ADDRESS = "10.194.139.183:6400"

    static sendData = (
        data = {data:"Test Data"},
        address = this.API_ADDRESS
    ) => { 

        response = fetch(`http://${address}/api/v1/users/health`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "multipart/form-data; charset=UTF-8"
                }
            }).then(response => console.log(response))

    }
}