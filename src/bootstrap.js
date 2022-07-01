import { operations } from '#Constants/operations.js';
import { InvalidInputError } from '#Errors/invalidInputError.js';
import { extractByRegex } from '#Lib/extractByRegex.js';
import { promptQuestion } from '#Lib/promptQuestion.js';

export const bootstrap = async () => {
    try {
        // 1. Capturar entrada usuario
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2. validar la entrada
        const standarizeInput = userAnswer.trim().replaceAll(',','.');

        if (!standarizeInput) {
            throw new InvalidInputError();
        }
        if (standarizeInput === 'exit') {
            return true;
        }

        const [firstOperating, operator, secondOperating] =
            extractByRegex(standarizeInput);

        // 3. realizar la operación
        const result = operations[operator](firstOperating, secondOperating);
        const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

        // 4. mostrar resultado
        if (isNaN(roundedResult) || !isFinite(roundedResult))
            console.log('OPERACIÓN NO VÁLIDA\n');
        else console.log(`El resultado es: ${roundedResult}\n`);
    } catch (e) {
        if (e instanceof InvalidInputError) console.log(`${e.message}\n`);
        else
            console.log(`Error no esperado: ${e.message}. Stack: ${e.stack}\n`);
    }
};
