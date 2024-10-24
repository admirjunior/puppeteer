//-----------------------------------------------------------------------------------------------------------------------------------------
//Função para preencher um campo de texto dentro de um codemirror.
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
//-----------------------------------------------------------------------------------------------------------------------------------------
//Função para gerar hash randomizado de caracteres especiais
generateRandomHash(length) {
        const chars = "5456_àáâãçäü!@#$%¨&*()+abc=ab_ab-abc¹²³£¢¬abc€ab'c\"ab{}teste[].d,aîîïèø£åbæºcª§¶¾µ°100";
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }
//-----------------------------------------------------------------------------------------------------------------------------------------
//Digitando texto em um campo
async fillField(page, selector, text) {
        await page.waitForSelector(selector, { visible: true });
        const field = await page.$(selector);
        await field.focus();
        await page.waitForTimeout(100);
        await field.type(text);
    }
//-----------------------------------------------------------------------------------------------------------------------------------------
//Substituindo valor em um campo preenchido
async fillFieldWithValue(page, selector, text) {
        await page.focus(selector);
        await page.evaluate(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.value = '';
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }, selector);
        await page.type(selector, text);
    }
//-----------------------------------------------------------------------------------------------------------------------------------------
//Espera por um seletor fazendo 5 tentativas
async waitForSelectorEnhanced(page, selector, maxRetries = 5, delay = 1000) {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            await page.waitForTimeout(delay);
            const element = await page.$(selector);
            if (element) {
                await page.waitForSelector(selector, { visible: true });
                return;
            }
        }
    }
//-----------------------------------------------------------------------------------------------------------------------------------------
//Esperar uma requisição especifica carregar
async waitForSpecificRequest(page, urlPattern) {
        await page.waitForResponse(response => response.url().includes(urlPattern) && response.status() === 200);
        await page.waitForTimeout(1000);
    }
//-----------------------------------------------------------------------------------------------------------------------------------------
