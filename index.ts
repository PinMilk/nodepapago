/**
 * 라이브러리의 공개 진입점입니다.
 *
 * 기본 내보내기와 이름 있는 내보내기로 번역 클래스를 제공하며,
 * 번역 설정·매개변수·결과 타입과 언어 감지 클래스도 함께 노출합니다.
 */
export {
    Translator,
    Translator as default,
    TranslateConfig,
    TranslateResult,
    TranslateParameter
} from './src/translator';
export { LangDetector } from './src/detect_lang';
