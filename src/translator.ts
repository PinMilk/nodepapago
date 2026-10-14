import { AxiosRequestConfig } from 'axios'
import Authenticator from './login/auth'
import { LangDetector } from './detect_lang'

/**
 * 파파고 웹 API로 단일·다중 번역을 수행하고 언어 감지 기능을 제공합니다.
 *
 * @remarks 비공식 API이므로 파파고의 서비스 변경에 따라 동작이 달라질 수 있습니다.
 */
class Translator {
    /** 단일 번역 매개변수입니다. 생성자에 전달한 값으로 교체됩니다. */
    private parameter: TranslateParameter = {
        source: 'ko',
        target: 'en',
        text: '안녕'
    }
    /** 다중 번역에 사용할 매개변수 배열입니다. */
    private multiParam: TranslateParameter[] = []
    /** 생성자에서 기본 옵션을 보완한 번역 설정입니다. */
    private config: TranslateConfig
    /** URL 인코딩된 UTF-8 폼 본문을 나타내는 콘텐츠 타입입니다. */
    private C_TYPE: string = 'application/x-www-form-urlencoded; charset=UTF-8'
    /** HTTP 요청에 사용할 브라우저 식별 문자열입니다. */
    private UA: string = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.0.1 Safari/605.1.15'

    /**
     * 번역 설정을 저장하고 지정하지 않은 옵션을 false로 보완합니다.
     *
     * @param config - 번역 매개변수와 출력·높임말·다중 번역 옵션입니다.
     * @remarks 전달한 설정 객체를 직접 보완하며, 매개변수가 배열이면 다중 번역을 활성화합니다.
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
     * 한 개의 원문을 번역하고 설정에 맞는 형태로 결과를 반환합니다.
     *
     * @param config - 전체 응답 반환 여부와 높임말 옵션을 포함한 설정입니다.
     * @param parameter - 원문·대상 언어와 선택적인 원본 언어 코드입니다.
     * @returns verbose가 true이면 API 응답 객체, 아니면 번역 문자열입니다.
     * @throws 언어 감지·번역 요청 또는 응답 검증에 실패하면 프로미스가 거부됩니다.
     */
    private async makeTranslateReq(config: TranslateConfig, parameter: TranslateParameter): Promise<string | TranslateResult> {
        const url: string = 'https://papago.naver.com/api/text/translation'
        // 원본 언어가 없거나 detect이면 감지합니다. 호출자의 매개변수 객체는 변경하지 않습니다.
        const source: string = parameter.source === void 0 || parameter.source === 'detect'
            ? await new LangDetector(parameter.text).getLangCode()
            : parameter.source
        // 공개 API의 소문자 중국어 코드를 대소문자를 구분하는 파파고 코드로 변환합니다.
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
        // 특수문자를 안전하게 인코딩하고, 사전 정보는 요청하되 개인 용어집은 사용하지 않습니다.
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
        // API 경로 변경 등으로 번역 응답 대신 다른 문서가 반환되는 경우를 확인합니다.
        if (!document || typeof document.translatedText !== 'string') {
            throw new Error('Papago returned an invalid translation response')
        }
        const result: (string | TranslateResult) = (config.verbose ? document : document.translatedText)
        return result
    }

    /**
     * 생성자에 전달한 설정으로 번역을 실행합니다.
     *
     * @returns 단일 번역은 문자열 또는 응답 객체, 다중 번역은 해당 값들의 배열입니다.
     * @throws 요청 또는 응답 검증에 실패하면 프로미스가 거부됩니다.
     */
    public async translate(): Promise<string | TranslateResult | (string | TranslateResult)[]> {
        if (this.config.multi === true) return this.multiTranslate()
        const result: (string | TranslateResult) = await this.makeTranslateReq(this.config, this.parameter)
        return result
    }

    /**
     * 입력 배열의 각 원문을 병렬로 번역합니다.
     *
     * @returns 입력 순서와 동일한 순서의 번역 결과 배열입니다.
     * @throws 하나라도 실패하면 전체 프로미스가 거부됩니다. 다른 진행 중인 요청을 취소하지는 않습니다.
     */
    private async multiTranslate(): Promise<(string | TranslateResult)[]> {
        return Promise.all(this.multiParam.map(parameter => this.makeTranslateReq(this.config, parameter)))
    }

    /**
     * 번역 인스턴스를 생성하지 않고 원문의 언어를 감지합니다.
     *
     * @param text - 언어를 감지할 문자열입니다.
     * @returns 소문자로 변환한 언어 코드입니다.
     * @throws 요청 또는 응답 검증에 실패하면 프로미스가 거부됩니다.
     */
    static async detect(text: string): Promise<string> {
        const langCode: string = await new LangDetector(text).getLangCode()
        return langCode
    }
}

/**
 * 번역 인스턴스를 생성할 때 사용하는 설정입니다.
 */
interface TranslateConfig {
    /** 단일 번역 매개변수 또는 다중 번역 매개변수 배열입니다. 배열이면 다중 번역이 자동 활성화됩니다. */
    parameter: (TranslateParameter | TranslateParameter[])
    /** true이면 번역 문자열 대신 전체 API 응답 객체를 반환합니다. 기본값은 false입니다. */
    verbose?: boolean
    /** true이면 파파고에 높임말 번역을 요청합니다. 기본값은 false이며 지원 여부는 언어 쌍에 따릅니다. */
    honorific?: boolean
    /** 다중 번역 여부입니다. 기본값은 false이며, 일반적으로 parameter 배열로 활성화합니다. */
    multi?: boolean
}

/**
 * 한 개의 원문을 번역하는 데 필요한 매개변수입니다.
 */
interface TranslateParameter {
    /** 원본 언어 코드입니다. 생략하거나 detect를 지정하면 자동 감지합니다. */
    source?: string
    /** 번역할 대상 언어 코드입니다. */
    target: string
    /** 번역할 원문 문자열입니다. */
    text: string
}

/**
 * verbose 옵션으로 반환하는 파파고 번역 응답의 주요 필드입니다.
 *
 * @remarks 실제 응답에는 추가 필드가 포함될 수 있으며, 사전·발음 정보 등은 요청마다 달라집니다.
 */
interface TranslateResult {
    /** API가 사용한 원본 언어 코드입니다. */
    srcLangType: string
    /** API가 사용한 대상 언어 코드입니다. */
    tarLangType: string
    /** 번역된 문자열입니다. */
    translatedText: string
    /** 응답에 기록된 번역 엔진 식별자입니다. */
    engineType: string
    /** API가 제공하는 경우 포함되는 중간 번역 관련 값입니다. */
    pivot?: string
    /** 원본 언어의 사전 정보입니다. */
    dict?: Record<string, unknown>
    /** 대상 언어의 사전 정보입니다. */
    tarDict?: Record<string, unknown>
    /** 원문 발음·음역 정보입니다. */
    tlitSrc?: Record<string, unknown>
    /** 번역문 발음·음역 정보입니다. */
    tlit?: Record<string, unknown>
    /** API가 반환한 처리 지연 값입니다. 클라이언트에서 측정한 왕복 시간은 아닙니다. */
    delay: number
    /** API가 반환한 번역 처리 관련 지연 값입니다. */
    delaySmt: number
}

export {
    Translator,
    TranslateConfig,
    TranslateResult,
    TranslateParameter
}
