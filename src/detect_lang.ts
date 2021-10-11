import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'

export class LangDetector {
    private text: string
    private HASHING_KEY: string = 'v1.6.3_4f4591fdf3'
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'
    private UA: string = 'Mozilla/5.0 (Macintosh Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'
    /**
     * 
     * @param text 언어를 감지할 문장
     */
    constructor(text: string) {
        this.text = text
    }
    async getLangCode() {
        const time: number = Date.now()
        const uuid: string = Authenticator.genUUID(time)
        const url: string = 'https://papago.naver.com/apis/langs/dect'
        const hash: string = Authenticator.getHash(`${uuid}\n${url}\n${time}`, this.HASHING_KEY)

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