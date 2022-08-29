import PapaCrypto from './hash'
import Axios, { AxiosRequestConfig } from 'axios'

export class Authenticator {
    /**
     * 
     * @param msg 해싱할 평문
     * @param key 해시 키
     */
    static getHash(msg: string, key: string): string {
        const hash: string = new PapaCrypto(msg, key).getHash()
        return hash
    }
    /**
     * 
     * js object 형식의 데이터를 form data로 변경
     * @param formObj form data로 변경할 object
     */
    static toFormData(formObj: any): string {
        let result: string[] = []
        for (let property in formObj) result.push(`${property}=${formObj[property]}`)
        return result.join('&')
    }
    /**
     * 
     * @param url
     * @param data request data
     * @param config request config
     */
    static async request(url: string, data: any, config: AxiosRequestConfig): Promise<any> {
        return (await Axios.post(url, data, config)).data
    }
}

export default Authenticator