import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'
import { LangDetector } from './detect_lang'
import { v4 as UUIDV4 } from 'uuid'

class Translator {
    private parameter: TranslateParameter = {
        source: 'ko',                                                                                                                                 // 기본 Source Language
        target: 'en',                                                                                                                                 // 기본 Target Language
        text: '안녕'                                                                                                                                  // 기본 Text
    }
    private multiParam: TranslateParameter[] = []
    private config: TranslateConfig
    private HASHING_KEY: string = 'v1.7.0_0d2601d5cf'                                                                                                 // Hashing 시 사용하는 Key, main.xxxxx File 내에서 authorization으로 찾을 수 있음
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'                                                                       // Content-Type
    private UA: string = 'Mozilla/5.0 (Macintosh Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'     // User-Agent
    /**
     * 
     * @param config 번역 옵션
     * @constructor
     */
    constructor(config: TranslateConfig) {
        this.config = config
        if (config.verbose === void 0) this.config.verbose = false                                                                                     // Raw JSON으로의 출력 여부, 기본 False
        if (config.honorific === void 0) this.config.honorific = false                                                                                 // 경어 사용 여부, 기본 False
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
        const time: number = Date.now()                                                                                                                  // Timestamp 생성
        const uuid: string = UUIDV4()                                                                                                                    // UUID 생성
        const url: string = 'https://papago.naver.com/apis/n2mt/translate'                                                                               // 요청 URL
        const hash: string = Authenticator.getHash(`${uuid}\n${url}\n${time}`, this.HASHING_KEY)                                                         // Authorization Header Hash 생성

        if (parameter.source === void 0 || parameter.source === 'detect') parameter.source = await new LangDetector(parameter.text).getLangCode()        // Language Code를 확인 후, 없을 시 언어감지
        const authorization: string = `PPG ${uuid}:${hash}`                                                                                              // Authorization Header 생성
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
            async (_element: TranslateParameter, index: number) =>
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
 * @property {boolean} TranslateConfig.verbose raw json 반환 여부
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
    srcLangType: string
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
