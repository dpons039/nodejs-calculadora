import { promptQuestion } from '#Lib/promptQuestion';


(async () => {
    // 1. Capturar entrada usuario
    const userAnswer = await promptQuestion('Introduce tu operación: \n');
    console.log(userAnswer);

    // 2. validar la entrada

    // 3. realizar la operación

    // 4. mostrar resultado
})();
