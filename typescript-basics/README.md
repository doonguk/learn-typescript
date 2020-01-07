# TypeScript 기초 연습

> [TypeScript HandBook(한글)](https://typescript-kr.github.io/) 참조



### 1. 타입스크립트 설정파일 생성

```bash
$ yarn init -y 
```

프로젝트 폴더에서 yarn init을 통해 package.json 을 생성 해준다. y 옵션은 그냥 yarn init 했을 경우 나오는 질문들을 yes 하는 옵션

```bash
$ yarn global add typescript
$ tsc --init
```

typescript를 글로벌로 설치 후 <code>tsc --init</code> 으로 타입스크립트 설정파일 tsconfig.json을 생성한다.

```json
//tsconfig.json
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": false
  }
}
```

- <code>target</code> : 컴파일된 코드를 어떤 환경에서 실행할 지 정해준다. 예를들어 화살표 함수를 사용하고 es5로 설정한다면 function키워드로 바꿔준다. es6로 하면 화살표 함수를 유지한다.
- <code>module</code> : 컴파일된 코드가 어떤 모듈 시스템을 적용할 지 정해준다. export default target 으로 코드를 작성하고 commonjs로 설정 하면 module.export = target 으로 변경 해준다. es2015로 한다면 export default가 유지 된다.
- <code>strict</code>: 모든 타입 체킹 옵션을 활성화 해준다는 의미.
- <code>esModuleInterop</code> : commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러 올 수 있게 해준다.
- <code>forceConsistentCasingInFileNames</code> : 파일명에 대소문자 구분하지 않아도 되는지 여부 체크

```json
//tsconfig.json
{
  ...
  "outDIr" : "/dist"
}
```

컴파일된 코드를 확인하기 위해 출력 저장소 옵션을 추가 해준다.