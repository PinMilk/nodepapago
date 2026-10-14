import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'

/** 파파고 웹 API를 통해 입력 문자열의 언어를 감지합니다. */
export class LangDetector {
    /** 언어를 감지할 원문입니다. */
    private text: string
    /** URL 인코딩된 UTF-8 폼 본문을 나타내는 콘텐츠 타입입니다. */
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'
    /** HTTP 요청에 사용할 브라우저 식별 문자열입니다. */
    private UA: string = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.0.1 Safari/605.1.15'

    /**
     * 언어 감지에 사용할 원문을 저장합니다.
     *
     * @param text - 언어를 감지할 문자열입니다.
     */
    constructor(text: string) {
        this.text = text
    }

    /**
     * 파파고에 언어 감지를 요청합니다.
     *
     * @returns en, ko, zh-cn 등 소문자로 변환한 언어 코드입니다.
     * @throws 요청 실패 또는 유효한 언어 코드가 없는 응답으로 프로미스가 거부됩니다.
     */
    async getLangCode(): Promise<string> {
        const url: string = 'https://papago.naver.com/api/langs/dect'

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': this.C_TYPE,
                'User-Agent': this.UA
            }
        }
        // &, +, 줄바꿈 등 원문의 특수문자가 폼 구분자로 해석되지 않도록 인코딩합니다.
        const data: string = new URLSearchParams({
            'query': this.text
        }).toString()
        const document: any = await Authenticator.request(
            url,
            data,
            config
        )
        // 비정상 응답이나 HTML 응답을 언어 코드로 반환하지 않도록 구조를 확인합니다.
        if (!document || typeof document.langCode !== 'string' || !document.langCode) {
            throw new Error('Papago returned an invalid language detection response')
        }
        // README의 언어 코드 표와 동일하게 소문자로 반환합니다.
        return document.langCode.toLowerCase()
    }
}
