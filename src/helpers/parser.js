import { lexer } from './lexer';

export function parser(children) {
    const results = [];
    lexer(children, {}, results, true);
    const countResults = results.length;
    let valueIndex = -1;
    const value = [];
    for(let resultIndex = 0; resultIndex < countResults; resultIndex++) {
        const currentResult = results[resultIndex];
        let currentValue = value[valueIndex];
        if(
            !currentValue ||
            (currentValue && (
                (currentValue.weight !== (currentResult.props.weight || 1)) ||
                (currentValue.index !== (currentResult.index))
            ))
        ) {
            currentValue = value[++valueIndex] = {
                weight: currentResult.props.weight || 1,
                words: [],
                props: [],
                index: currentResult.index
            };
        }
        currentValue.words.push(currentResult.word);
        currentValue.props.push(currentResult.props);
    }
    return value;
}