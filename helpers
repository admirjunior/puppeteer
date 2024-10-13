async fillQueryInCodeMirror(page, query) {
    // Aguarda até que o seletor do campo de texto esteja disponível na página.
    await page.waitForSelector('#query + .CodeMirror');
    
    // Executa uma função no contexto da página para preencher o campo de texto.
    await page.evaluate((query) => {
        // Seleciona o elemento CodeMirror associado ao campo de texto usando Angular.
        const queryTextAreaElement = angular.element(document.querySelector('#query + .CodeMirror'))[0];
        
        // Verifica se o elemento e o objeto CodeMirror existem.
        if (queryTextAreaElement && queryTextAreaElement.CodeMirror) {
            // Obtém a instância do CodeMirror.
            const queryCodeMirror = queryTextAreaElement.CodeMirror;
            
            // Define o valor do CodeMirror com a consulta fornecida.
            queryCodeMirror.setValue(query);
            
            // Foca no campo de texto para que o usuário possa interagir.
            queryCodeMirror.focus();
        }
    }, query); // Passa a consulta como argumento para a função da página.

    // Obtém o valor atual do campo CodeMirror após a inserção.
    const queryValue = await page.evaluate(() => {
        // Seleciona o elemento CodeMirror novamente.
        const codeMirrorSelector = '#query + .CodeMirror';
        const codeMirrorElement = document.querySelector(codeMirrorSelector);
        
        // Retorna o valor do CodeMirror ou null se não existir.
        return codeMirrorElement?.CodeMirror?.getValue() ?? null;
    });

    // Retorna o valor da consulta que foi preenchido no campo de texto.
    return queryValue;
}

