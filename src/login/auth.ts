import PapaCrypto from './hash'
import Axios, { AxiosRequestConfig } from 'axios'

export class Authenticator {
    /**
     * 
     * 파파고 인증에 사용될 UUID를 생성한다.
     * @param time 밀리세컨드 단위의 UNIX 타임
     */
    static genUUID(time: number): string {
        let tower: number = time
        const base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        const uuid: string = base.replace(/[xy]/g, e => {
            const chip: number = (time + 16 * Math.random()) % 16 | 0
            tower = Math.floor(tower / 16)
            return (e === 'x' ? chip : 3 & chip | 8).toString(16)
        })
        return uuid
    }
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
     * js object 형식의 데이터를 form data로 변경한다.
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