import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'
import { LangDetector } from './detect_lang'

class Translator {
    private parameter: TranslateParameter = {
        source: 'ko',                                                                                                                                 // 기본 Source Language
        target: 'en',                                                                                                                                 // 기본 Target Language
        text: '안녕'                                                                                                                                  // 기본 Text
    }
    private multiParam: TranslateParameter[] = []
    private config: TranslateConfig
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'                                                                       // Content-Type
    private UA: string = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.0.1 Safari/605.1.15'     // User-Agent
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
        const url: string = 'https://papago.naver.com/api/text/translation'
        const source: string = parameter.source === void 0 || parameter.source === 'detect'
            ? await new LangDetector(parameter.text).getLangCode()
            : parameter.source
        const toApiLangCode = (code: string): string => {
            switch (code.toLowerCase()) {
                case 'zh-cn': return 'zh-CN'
                case 'zh-tw': return 'zh-TW'
                default: return code
            }
        }
        const requestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': this.C_TYPE,
                'Accept-Language': 'ko',
                'User-Agent': this.UA
            }
        }
        const data: string = new URLSearchParams({
            'dict': 'true',
            'dictDisplay': '30',
            'honorific': String(config.honorific === true),
            'useGlossary': 'false',
            'source': toApiLangCode(source),
            'target': toApiLangCode(parameter.target),
            'text': parameter.text,
        }).toString()
        const document: any = await Authenticator.request(
            url,
            data,
            requestConfig
        )
        if (!document || typeof document.translatedText !== 'string') {
            throw new Error('Papago returned an invalid translation response')
        }
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
        return Promise.all(this.multiParam.map(parameter => this.makeTranslateReq(this.config, parameter)))
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
    pivot?: string
    dict?: Record<string, unknown>
    tarDict?: Record<string, unknown>
    tlitSrc?: Record<string, unknown>
    tlit?: Record<string, unknown>
    delay: number
    delaySmt: number
}

export {
    Translator,
    TranslateConfig,
    TranslateResult,
    TranslateParameter
}
