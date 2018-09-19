var Az = require('az');


Az.Morph.init('./node_modules/az/dicts', function() {
    
    const quote = {
        text: `База на Марсе будет находиться достаточно далеко от Земли и с большей вероятностью останется целой [в случае войны], нежели база на Луне.`
    };
    
    //
    const tokenizer = new Az.Tokens(`База на Марсе будет находиться достаточно далеко от Земли и с большей вероятностью останется целой [в случае войны], нежели база на Луне.`, {
        html:true
    });
    
    const tokens = tokenizer.done(['SPACE','PUNCT'], true);
    
    const layer1 = [];
    const layer2 = [];
    const normalized = [];
    const tokenized = [];
    const layerNouns = [];
    const layerVerbs = [];
    const layerAdjectives = [];
    
    tokens.map(token => {
        
        if (token.type.toString() === 'WORD') {
            
            var word = token.source.substr(token.st, token.length);
            layer1.push(word);
            
            var parses = Az.Morph(word);
            var nomalized = parses[0].normalize().word;
            
            tokenized.push(parses);
            
            console.log(token.type.toString(),'->', token.source.substr(token.st, token.length),'->', parses[0].tag.POST, '->', nomalized);
            
            layer2.push(parses[0].tag.POST);
            
            
    
            normalized.push(nomalized);
            
            if (parses[0].tag.POST === 'NOUN') {
                layerNouns.push(nomalized);
            }
    
            if (parses[0].tag.POST === 'VERB') {
                layerVerbs.push(nomalized);
            }
            
            if (parses[0].tag.POST === 'INFN') {
                layerVerbs.push(nomalized);
            }
            
            if (parses[0].tag.POST === 'ADJF') {
                layerAdjectives.push(nomalized);
            }
            
        } else {
            console.log(token.type.toString(),'->',token.source.substr(token.st, token.length));
        }
        
        // return token.type;

    });
    
    quote.layer0 = quote.text;
    quote.layer1 = layer1;
    quote.normalized = normalized;
    quote.tokenized = tokenized;
    quote.layer2 = layer2;
    quote.nouns = layerNouns;
    quote.verbs = layerVerbs;
    quote.adjectives = layerAdjectives;
    
    console.log(quote.normalized);
    console.log(quote.nouns);
    console.log(quote.verbs);
    
    
});


