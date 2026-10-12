import Translator from './'

declare const process: {
    exitCode?: number
}

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

    // README 예제 3: verbose 다중 번역 → 전체 JSON 배열
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

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
