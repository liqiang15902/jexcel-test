import {isStringOrRegExpEqual, isStringMatchedByStringOrRegExp} from '@/utils/is-reg-exp'

// 没有配置jest环境，不能直接运行
test('regExp', () => {
    console.log('1', isStringMatchedByStringOrRegExp('mceu_19', 'mceu_20'))
    console.log('2', isStringMatchedByStringOrRegExp('mceu_19', 'mceu_19'))
    console.log('3', isStringMatchedByStringOrRegExp('mceu_19', /^mceu_[0-9]+$/))
    console.log('5', isStringOrRegExpEqual('mceu_19', 'mceu_20'))
    console.log('6', isStringOrRegExpEqual('mceu_19', 'mceu_19'))
    console.log('7', isStringOrRegExpEqual('/^mceu_[0-9]+$/', /^mceu_[0-9]+$/))
    console.log('8', isStringOrRegExpEqual(/^mceu_[0-9]+$/, /^mceu_[0-9]+$/))
})
