export default class APIService {
    static API_ADDRESS = "10.194.139.183:6402"

    static sendData = (
        data = {data:"Test Data"},
        address = this.API_ADDRESS
    ) => { 
        fetch(`http://${address}/api/v1/users/health`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
    }
}