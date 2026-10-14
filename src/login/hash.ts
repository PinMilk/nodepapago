import Crypto from 'crypto'

/**
 * 기존 파파고 서명 방식의 HMAC-MD5 연산을 담당합니다.
 *
 * @remarks
 * 현재 번역·언어 감지 API의 요청에는 사용하지 않습니다.
 * 이 알고리즘을 비밀번호 저장 등 새로운 보안 용도로 사용하지 마세요.
 */
export class PapaCrypto {
    /** 서명 대상 문자열입니다. */
    private msg: string
    /** HMAC 연산에 사용할 비밀 키입니다. */
    private key: string

    /**
     * 서명 대상 문자열과 비밀 키를 저장합니다.
     *
     * @param msg - 서명할 문자열입니다.
     * @param key - HMAC 연산에 사용할 비밀 키입니다.
     */
    constructor(msg: string, key: string) {
        this.msg = msg
        this.key = key
    }

    /**
     * 저장된 문자열의 HMAC-MD5 서명을 생성합니다.
     *
     * @returns Base64로 인코딩된 서명 문자열입니다.
     */
    getHash(): string {
        // 문자열을 HMAC에 입력한 뒤 바이너리 서명을 Base64 문자열로 변환합니다.
        const hash: Crypto.Hmac = Crypto.createHmac('md5', this.key)
            .update(this.msg)
        return hash.digest('base64')
    }
}

export default PapaCrypto
