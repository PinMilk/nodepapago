import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'
import { LangDetector } from './detect_lang'

class Translator {
    private parameter: TranslateParameter = {
        source: 'ko',
        target: 'en',
        text: '안녕'
    }
    private multiParam: TranslateParameter[] = []
    private config: TranslateConfig
    private HASHING_KEY: string = 'v1.6.3_4f4591fdf3'
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'
    private UA: string = 'Mozilla/5.0 (Macintosh Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'
    /**
     * 
     * @param config 번역 옵션
     * @constructor
     */
    constructor(config: TranslateConfig) {
        this.config = config
        if (config.verbose === void 0) this.config.verbose = false
        if (config.honorific === void 0) this.config.honorific = false
        if (config.multi === void 0) this.config.multi = false
        if (Array.isArray(config.parameter)) {
            this.multiParam = config.parameter
            this.config.multi = true
        }
        else this.parameter = config.parameter
        return this
    }
    /**
     * 
     * @param config 번역 옵션
     * @param parameter 번역 파라미터
     * @returns 번역 결과
     */
    private async makeTranslateReq(config: TranslateConfig, parameter: TranslateParameter): Promise<string | TranslateResult> {
        const time: number = Date.now()
        const uuid: string = Authenticator.genUUID(time)
        const url: string = 'https://papago.naver.com/apis/n2mt/translate'
        const hash: string = Authenticator.getHash(`${uuid}\n${url}\n${time}`, this.HASHING_KEY)

        if (parameter.source === void 0 || parameter.source === 'detect') parameter.source = await new LangDetector(parameter.text).getLangCode()
        const authorization: string = `PPG ${uuid}:${hash}`
        const requestConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': authorization,
                'Content-Type': this.C_TYPE,
                'Timestamp': time,
                'User-Agent': this.UA
            }
        }
        const data: string = Authenticator.toFormData({
            'deviceId': uuid,
            'locale': 'ko',
            'dict': true,
            'dictDisplay': 30,
            'honorific': config.honorific,
            'instant': false,
            'paging': false,
            'source': parameter.source,
            'target': parameter.target,
            'text': parameter.text,
            'authroization': authorization,
            'timestamp': time
        })
        const document: any = await Authenticator.request(
            url,
            data,
            requestConfig
        )
        const result: (string | TranslateResult) = (config.verbose ? document : document.translatedText)
        return result
    }
    /**
     * 
     * @returns 번역 결과
     */
    public async translate(): Promise<string | TranslateResult | (string | TranslateResult)[]> {
        if (this.config.multi === true) return this.multiTranslate()
        const result: (string | TranslateResult) = await this.makeTranslateReq(this.config, this.parameter)
        return result
    }
    /**
     * 
     * @returns 번역 결과(리스트)
     */
    private async multiTranslate(): Promise<(string | TranslateResult)[]> {
        const result: string[] | TranslateResult[] = []
        const promises = this.multiParam.map(
            async (element: TranslateParameter, index: number) =>
                await this.makeTranslateReq(this.config, this.multiParam[index])
                    .then(res => result[index] = res)
                    .catch(error => console.log(error)))
        await Promise.all(promises).then(res => res)
            .catch(error => console.log(error))
        return result
    }
    /**
     * 
     * @param text 언어를 감지할 문장
     */
    static async detect(text: string): Promise<string> {
        const langCode: string = await new LangDetector(text).getLangCode()
        return langCode
    }
}
/**
 * 
 * @interface TranslateConfig
 * @property {TranslateParameter} TranslateConfig.parameter 번역 파라미터
 * @property {boolean} TranslateConfig.verbose raw json으로 반환할 지 여부
 * @property {boolean} TranslateConfig.honorific 경어(동아시아 언어에서 주로 사용)
 * @property {boolean} TranslateConfig.multi 한 번에 여러 문장을 번역할 지의 여부
 */
interface TranslateConfig {
    parameter: (TranslateParameter | TranslateParameter[])
    verbose?: boolean
    honorific?: boolean
    multi?: boolean
}
/**
 * 
 * @interface TranslateParameter
 * @property {string} source 원문 언어 코드
 * @property {string} target 목적 언어 코드
 * @property {string} text 번역할 문장
 */
interface TranslateParameter {
    source?: string
    target: string
    text: string
}

interface TranslateResult {
    // 원문 언어 코드
    srcLangType: string
    // 목적 언어 코드
    tarLangType: string
    // 결과
    translatedText: string
    engineType: string
    pivot: string
    dict: string
    tarDict: string
    tlitSrc: string
    tlit: string
    delay: string
    delaySmt: string
}

export {
    Translator,
    TranslateConfig,
    TranslateResult,
    TranslateParameter
}
