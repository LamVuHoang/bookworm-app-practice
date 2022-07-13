import axios from "axios";

export default function GetData(objName, url, propName) {
    return axios.get(url)
        .then(res => {
            objName.setState({ [propName]: res.data })
        })
        .catch(err => {
            console.log(err)
        })
}