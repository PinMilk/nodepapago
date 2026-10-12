import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'

export class LangDetector {
    private text: string
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'                                                                       // Content-Type
    private UA: string = 'Mozilla/5.0 (Macintosh Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'     // User-Agent
    /**
     * 
     * @param text 언어를 감지할 문장
     */
    constructor(text: string) {
        this.text = text
    }
    async getLangCode(): Promise<string> {
        const url: string = 'https://papago.naver.com/api/langs/dect'                                                                                    // 요청 URL

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': this.C_TYPE,
                'User-Agent': this.UA
            }
        }
        const data: string = new URLSearchParams({
            'query': this.text
        }).toString()
        const document: any = await Authenticator.request(
            url,
            data,
            config
        )
        if (!document || typeof document.langCode !== 'string' || !document.langCode) {
            throw new Error('Papago returned an invalid language detection response')
        }
        return document.langCode.toLowerCase()
    }
}
