import { InvalidInputError } from '#Errors/invalidInputError.js';
import { getOperator } from '#Lib/getOperator.js';
import { promptQuestion } from '#Lib/promptQuestion.js';

(async () => {
    try {
        // 1. Capturar entrada usuario
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2. validar la entrada
        const standarizeInput = userAnswer.trim();

        if (standarizeInput === '') {
            throw new InvalidInputError();
        }
        const operator = getOperator(standarizeInput);

        if (!operator) {
            throw new InvalidInputError();
        }
    } catch (e) {
        if (e instanceof InvalidInputError) console.log(e.message);
        else
            console.log(`Error no controlado: ${e.message}. Stack: ${e.stack}`);
    }

    // 3. realizar la operación

    // 4. mostrar resultado
})();
