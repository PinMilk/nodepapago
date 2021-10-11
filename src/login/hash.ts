import Crypto from 'crypto'

export class PapaCrypto {
    private msg: string
    private key: string
    /**
     * 
     * @param msg 해싱할 평문
     * @param key 해시 키
     */
    constructor(msg: string, key: string) {
        this.msg = msg
        this.key = key
    }
    /**
     * 
     * 파파고 Authorication을 진행하기 위한 정보를 넣어 해시를 생성한다.
     */
    getHash(): string {
        const hash: Crypto.Hmac = Crypto.createHmac('md5', this.key)
            .update(this.msg)
        return hash.digest('base64')
    }
}

export default PapaCrypto
