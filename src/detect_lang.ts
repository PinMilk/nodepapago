import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'
import { v4 as UUIDV4 } from 'uuid'

export class LangDetector {
    private text: string
    private HASHING_KEY: string = 'v1.8.5_f89009cc84'                                                                                                 // Hashing 시 사용하는 Key, main.xxxxx File 내에서 authorization으로 찾을 수 있음
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'                                                                       // Content-Type
    private UA: string = 'Mozilla/5.0 (Macintosh Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'     // User-Agent
    /**
     * 
     * @param text 언어를 감지할 문장
     */
    constructor(text: string) {
        this.text = text
    }
    async getLangCode() {
        const time: number = Date.now()                                                                                                                  // Timestamp 생성
        const uuid: string = UUIDV4()                                                                                                                    // UUID 생성
        const url: string = 'https://papago.naver.com/apis/langs/dect'                                                                                   // 요청 URL
        const hash: string = Authenticator.getHash(`${uuid}\n${url}\n${time}`, this.HASHING_KEY)                                                         // Authorization Header Hash 생성

        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `PPG ${uuid}:${hash}`,
                'Content-Type': this.C_TYPE,
                'User-Agent': this.UA,
                'Timestamp': time
            }
        }
        const data: string = Authenticator.toFormData({
            'query': this.text
        })
        const document: any = await Authenticator.request(
            url,
            data,
            config
        )
        const result: string = document.langCode
        return result
    }
}
