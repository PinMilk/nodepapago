import Axios, { AxiosRequestConfig } from 'axios';
import Crypto from "crypto";

export class Translator {
    constructor() { }
    /**
     * 
     * @param time UNIX time(milliseconds)
     * @private
     */
    private genUUID(time: number): string {
        let tower: number = time;
        const base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        const uuid: string = base.replace(/[xy]/g, e => {
            const chip: number = (time + 16 * Math.random()) % 16 | 0;
            tower = Math.floor(tower / 16);
            return (e === 'x' ? chip : 3 & chip | 8).toString();
        });
        return uuid;
    }
    /**
     * 
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
     * @param key hashing key
     * @param message message to be hashed
     * @private
     */
    private getHash(key: string, message: string): string {
        const hash: Crypto.Hmac = Crypto.createHmac('md5', key)
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
     * @param source original language code
     * @param target target language code
     * @param text text to be translated
     * @param verbose if it is true, returns raw json
     */
    public async translate(source: string = 'detect', target: string = 'en', text: string, verbose = false): Promise<any> {
        const time: number = Date.now();
        const uuid: string = this.genUUID(time);
        const url: string = 'https://papago.naver.com/apis/n2mt/translate';
        const hash: string = this.getHash('v1.5.1_4dfe1d83c2', `${uuid}\n${url}\n${time}`);

        if (source === 'detect') source = await this.detect(text);
        const headers: any = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en',
            'Authorization': `PPG ${uuid}:${hash}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Device-Type': 'pc',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4)\
                     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Origin': 'https://papago.naver.com',
            'Referer': 'https://papago.naver.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'Timestamp': time
        };
        const data: string = this.toFormData({
            'deviceId': uuid,
            'locale': 'en',
            'dict': true,
            'dictDisplay': 30,
            'honorific': false,
            'instant': true,
            'paging': false,
            'source': source,
            'target': target,
            'text': text
        });
        const document: any = await this.request(
            url,
            data,
            { headers: headers }
        );
        const result: any = (verbose ? document : document.translatedText);
        return result;
    }
    /**
     * 
     * @param source original language code
     * @param target target language code
     * @param content string array to be translated
     * @param verbose if it is true, returns raw json array
     */
    public async multiTranslate(source: string, target: string, content: string[], verbose = false): Promise<any[]> {
        let result: string[] = [];

        const promises = content.map(async (element, index) => await this.translate(source, target, element, verbose)
            .then(res => result[index] = res)
            .catch(error => console.log(error)));

        await Promise.all(promises).then(res => res).catch(error => console.log(error));

        return result;
    }
    /**
     * 
     * @param text Text to be detected language
     */
    public async detect(text: string): Promise<string> {
        const time: number = Date.now();
        const uuid: string = this.genUUID(time);
        const url: string = 'https://papago.naver.com/apis/langs/dect';
        const hash: string = this.getHash('v1.5.1_4dfe1d83c2', `${uuid}\n${url}\n${time}`);

        const headers: any = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en',
            'Authorization': `PPG ${uuid}:${hash}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Device-Type': 'pc',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4)\
                     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Origin': 'https://papago.naver.com',
            'Referer': 'https://papago.naver.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'Timestamp': time
        };
        const data: string = this.toFormData({
            'query': text
        });
        const document: any = await this.request(
            url,
            data,
            { headers: headers }
        );
        const result: string = document.langCode;
        return result;
    }
}
