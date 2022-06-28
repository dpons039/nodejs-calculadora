import { BINARY_OPERATORS } from '#Constants/operators.js';
import { InvalidInputError } from '#Errors/invalidInputError.js';
import { getOperator } from '#Lib/getOperator.js';
import { promptQuestion } from '#Lib/promptQuestion.js';

(async () => {
    try {
        // 1. Capturar entrada usuario
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2. validar la entrada
        const standarizeInput = userAnswer.trim();

        if (!standarizeInput) {
            throw new InvalidInputError();
        }
        const operator = getOperator(standarizeInput);

        if (!operator) {
            throw new InvalidInputError();
        }

        const splittedInput = standarizeInput.split(operator);

        let firstOperating, secondOperating;

        if (BINARY_OPERATORS.includes(operator)) {
            if (!splittedInput[0] || !splittedInput[1])
                throw new InvalidInputError();

            firstOperating = Number(splittedInput[0].replaceAll(',', '.'));
            secondOperating = Number(splittedInput[1].replaceAll(',', '.'));
            if (isNaN(firstOperating) || !isFinite(firstOperating))
                throw new InvalidInputError();
            if (isNaN(secondOperating) || !isFinite(secondOperating))
                throw new InvalidInputError();
        } else {
            if (splittedInput[0] || !splittedInput[1])
                throw new InvalidInputError();

            firstOperating = splittedInput[1];
            if (
                firstOperating[0] !== '(' &&
                firstOperating[firstOperating.length - 1] !== ')'
            )
                throw new InvalidInputError();
            firstOperating = firstOperating.slice(1, -1);
            firstOperating = Number(firstOperating.replaceAll(',', '.'));
            if (isNaN(firstOperating) || !isFinite(firstOperating))
                throw new InvalidInputError();
        }
        console.log(firstOperating, operator, secondOperating);
    } catch (e) {
        if (e instanceof InvalidInputError) console.log(e.message);
        else console.log(`Error no esperado: ${e.message}. Stack: ${e.stack}`);
    }

    // 3. realizar la operación

    // 4. mostrar resultado
})();
