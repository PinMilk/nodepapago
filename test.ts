/**
 * README의 실제 파파고 호출 예제를 순서대로 실행하는 통합 테스트입니다.
 *
 * 네트워크 연결이 필요하며, 번역 문구는 파파고 모델에 따라 달라질 수 있습니다.
 * 실행 방법: TypeScript로 컴파일한 뒤 `node test.js`를 실행합니다.
 */
import Translator from './'

// 테스트에서 사용하는 process.exitCode의 타입만 선언합니다. 런타임 객체는 생성하지 않습니다.
declare const process: {
    exitCode?: number
}

/**
 * 단일 번역, 높임말 다중 번역, 전체 응답 출력, 언어 감지 예제를 실행합니다.
 *
 * @returns 모든 예제의 실행이 완료되면 이행되는 프로미스입니다.
 * @throws 파파고 요청 또는 응답 검증에 실패하면 프로미스가 거부됩니다.
 */
async function main(): Promise<void> {
    // README 예제 1: 원본 언어 자동 감지 → 번역 문자열
    const translatedText = await new Translator({
        parameter: {
            target: 'ko',
            text: 'So far, so good!'
        }
    }).translate()
    console.log(translatedText)

    // README 예제 2: 높임말 다중 번역 → 문자열 배열
    const honorificTexts = await new Translator({
        parameter: [
            {
                source: 'en',
                target: 'ko',
                text: 'Morning, sir.'
            },
            {
                source: 'en',
                target: 'ko',
                text: 'Morning, ma\'am.'
            }
        ],
        honorific: true
    }).translate()
    console.log(honorificTexts)

    // README 예제 3: 전체 응답을 생략 없이 들여쓰기한 JSON 배열로 출력합니다.
    const verboseResults = await new Translator({
        parameter: [
            {
                source: 'en',
                target: 'ko',
                text: 'Morning!'
            },
            {
                source: 'en',
                target: 'ko',
                text: 'Morning, baby!'
            }
        ],
        verbose: true
    }).translate()
    console.log(JSON.stringify(verboseResults, null, 2))

    // README 예제 4: 언어 감지 → 언어 코드 문자열
    const langCode = await Translator.detect('So far, so bueno!')
    console.log(langCode)
}

// 오류는 표준 오류로 출력하고 실패 종료 코드를 설정해 자동 실행 환경에서도 실패를 감지합니다.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
