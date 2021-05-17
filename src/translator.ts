import Axios, { AxiosRequestConfig } from 'axios';
import Crypto from 'crypto';

class Translator {
    private parameter: TranslateParameter = {
        source: 'ko',
        target: 'en',
        text: '안녕'
    };
    private multiParam: TranslateParameter[] = [];
    private config: TranslateConfig;
    /**
     * 
     * @param config translate config
     * @constructor
     */
    constructor(config: TranslateConfig) {
        this.config = config;
        if (config.verbose === void 0) this.config.verbose = false;
        if (config.honorific === void 0) this.config.honorific = false;
        if (config.multi === void 0) this.config.multi = false;
        if (Array.isArray(config.parameter)) {
            this.multiParam = config.parameter;
            this.config.multi = true;
        }
        else this.parameter = config.parameter;
        return this;
    }
    /**
     * 
     * Generating UUID
     * @param time UNIX time(milliseconds)
     * @private
     */
    private genUUID(time: number): string {
        let tower: number = time;
        const base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        const uuid: string = base.replace(/[xy]/g, e => {
            const chip: number = (time + 16 * Math.random()) % 16 | 0;
            tower = Math.floor(tower / 16);
            return (e === 'x' ? chip : 3 & chip | 8).toString(16);
        });
        return uuid;
    }
    /**
     * 
     * Change form data object to raw data
     * @param formObj Object to be converted to form data
     * @private
     */
    private toFormData(formObj: any): string {
        let result: string[] = [];
        for (let property in formObj) result.push(`${property}=${formObj[property]}`);
        return result.join('&');
    }
    /**
     * 
     * Hashing with algorithm that is used by Papago
     * @param key hashing key
     * @param message message to be hashed
     * @private
     */
    private getHash(key: string, message: string): string {
        const hash: Crypto.Hmac = Crypto
            .createHmac('md5', key)
            .update(message);
        return hash.digest('base64');
    }
    /**
     * 
     * @param url request url
     * @param data request data
     * @param config request config
     * @private
     */
    private async request(url: string, data: any, config: AxiosRequestConfig): Promise<any> {
        return await (await Axios.post(url, data, config)).data;
    }
    /**
     * 
     * @param config translate config
     * @param parameter translate parameter
     * @returns translate result
     */
    private async makeTranslateReq(config: TranslateConfig, parameter: TranslateParameter): Promise<string | TranslateResult> {
        const time: number = Date.now();
        const uuid: string = this.genUUID(time);
        const url: string = 'https://papago.naver.com/apis/n2mt/translate';
        const hash: string = this.getHash('v1.5.6_97f6918302', `${uuid}\n${url}\n${time}`);

        if (parameter.source === void 0 || parameter.source === 'detect') parameter.source = await Translator.detect(parameter.text);
        const authorization: string = `PPG ${uuid}:${hash}`
        const requestConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Timestamp': time,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'
            }
        }
        const data: string = this.toFormData({
            'deviceId': uuid,
            'locale': 'en',
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
        });
        const document: any = await this.request(
            url,
            data,
            requestConfig
        );
        const result: (string | TranslateResult) = (config.verbose ? document : document.translatedText);
        return result;
    }
    /**
     * 
     * @returns Translate result
     */
    public async translate(): Promise<string | TranslateResult | (string | TranslateResult)[]> {
        if (this.config.multi === true) return this.multiTranslate();
        const result: (string | TranslateResult) = await this.makeTranslateReq(this.config, this.parameter);
        return result;
    }
    /**
     * 
     * @returns translate result list
     */
    private async multiTranslate(): Promise<(string | TranslateResult)[]> {
        const result: string[] | TranslateResult[] = [];
        const promises = this.multiParam.map(async (element: TranslateParameter, index: number) => await this.makeTranslateReq(this.config, this.multiParam[index])
            .then(res => result[index] = res)
            .catch(error => console.log(error)));
        await Promise.all(promises).then(res => res).catch(error => console.log(error));
        return result;
    }
    /**
     * 
     * @param text Text to be detected language
     */
    static async detect(text: string): Promise<string> {
        const time: number = Date.now();
        const uuid: string = this.prototype.genUUID(time);
        const url: string = 'https://papago.naver.com/apis/langs/dect';
        const hash: string = this.prototype.getHash('v1.5.6_97f6918302', `${uuid}\n${url}\n${time}`);

        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `PPG ${uuid}:${hash}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
                'Timestamp': time
            }
        }
        const data: string = this.prototype.toFormData({
            'query': text
        });
        const document: any = await this.prototype.request(
            url,
            data,
            config
        );
        const result: string = document.langCode;
        return result;
    }
}
/**
 * 
 * @interface TranslateConfig
 * @property {TranslateParameter} TranslateConfig.parameter translate parameter
 * @property {boolean} TranslateConfig.verbose returns at raw json
 * @property {boolean} TranslateConfig.honorific respectability(Widely used in East Asian languages)
 * @property {boolean} TranslateConfig.multi multi translate
 */
interface TranslateConfig {
    parameter: (TranslateParameter | TranslateParameter[]);
    verbose?: boolean;
    honorific?: boolean;
    multi?: boolean;
}
/**
 * 
 * @interface TranslateParameter
 * @property {string} source original language code
 * @property {string} target target language code
 * @property {string} text text to be translated
 */
interface TranslateParameter {
    source?: string;
    target: string;
    text: string;
}

interface TranslateResult {
    // origin language code
    srcLangType: string;
    // destination language code
    tarLangType: string;
    // result
    translatedText: string;
    engineType: string;
    pivot: string;
    dict: string;
    tarDict: string;
    tlitSrc: string;
    tlit: string;
    delay: string;
    delaySmt: string;
}

export {
    Translator,
    TranslateConfig,
    TranslateResult,
    TranslateParameter
}
