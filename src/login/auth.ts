import PapaCrypto from './hash'
import Axios, { AxiosRequestConfig } from 'axios'

/**
 * 기존 인증 해시 생성, 폼 문자열 변환 및 HTTP 요청을 제공하는 유틸리티입니다.
 *
 * @remarks
 * 현재 번역·언어 감지 API는 서명 인증을 사용하지 않습니다.
 * 해당 API의 본문 인코딩은 각 호출부에서 URLSearchParams로 처리합니다.
 */
export class Authenticator {
    /**
     * 기존 파파고 서명 방식의 HMAC-MD5 해시를 생성합니다.
     *
     * @param msg - 서명할 문자열입니다.
     * @param key - HMAC 연산에 사용할 비밀 키입니다.
     * @returns Base64로 인코딩된 서명 문자열입니다.
     */
    static getHash(msg: string, key: string): string {
        const hash: string = new PapaCrypto(msg, key).getHash()
        return hash
    }

    /**
     * 객체의 속성을 `키=값` 형식으로 연결하는 기존 변환 함수입니다.
     *
     * @param formObj - 폼 문자열로 변환할 객체입니다.
     * @returns 각 항목을 `&`로 연결한 문자열입니다.
     * @remarks
     * 이 함수는 퍼센트 인코딩을 하지 않습니다. 특수문자가 포함된 HTTP 요청 본문에는
     * URLSearchParams를 사용해야 합니다.
     */
    static toFormData(formObj: any): string {
        let result: string[] = []
        for (let property in formObj) result.push(`${property}=${formObj[property]}`)
        return result.join('&')
    }

    /**
     * 지정한 주소로 POST 요청을 보내고 응답 본문만 반환합니다.
     *
     * @param url - 요청할 API의 전체 URL입니다.
     * @param data - 요청 본문입니다.
     * @param config - 헤더 등 Axios 요청 설정입니다.
     * @returns Axios 응답의 data에 해당하는 본문입니다.
     * @throws 요청에 실패하면 Axios 오류로 프로미스가 거부됩니다.
     */
    static async request(url: string, data: any, config: AxiosRequestConfig): Promise<any> {
        return (await Axios.post(url, data, config)).data
    }
}

export default Authenticator
