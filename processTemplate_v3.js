function processTemplate(template, random_seed = null) {

    function getIndent(line) {
        const match = line.match(/^(\s*)/);
        return match ? match[1] : '';
    }

    const multiAttrRegex = /(\w+)\s*=\s*(['"])(.*?)\2/g;

    function parseSelfClosingTags(xmlString) {
        const tags = [];
        let currentIndex = 0;
        
        const commentIndex = xmlString.indexOf('#');
        if (commentIndex === -1)
            return tags;

        const commentText = xmlString.substring(commentIndex + 1).trim();
        
        while (currentIndex < commentText.length) {
            // タグの開始を検索
            const tagStartMatch = commentText.substring(currentIndex).match(/<([\w-]+)/);
            if (!tagStartMatch) break;
            
            const tagStartIndex = currentIndex + tagStartMatch.index;
            const tagName = tagStartMatch[1];
            
            // タグの終了を検索（/>を探す）
            let tagEndIndex = -1;
            let searchIndex = tagStartIndex + tagStartMatch[0].length;
            let inQuote = false;
            let quoteChar = '';
            
            while (searchIndex < commentText.length) {
                const char = commentText[searchIndex];
                
                if (!inQuote && (char === '"' || char === "'")) {
                    inQuote = true;
                    quoteChar = char;
                } else if (inQuote && char === quoteChar) {
                    // エスケープされていない引用符かチェック
                    if (searchIndex === 0 || commentText[searchIndex - 1] !== '\\') {
                        inQuote = false;
                        quoteChar = '';
                    }
                } else if (!inQuote && char === '/' && searchIndex + 1 < commentText.length && commentText[searchIndex + 1] === '>') {
                    tagEndIndex = searchIndex + 1;
                    break;
                }
                
                searchIndex++;
            }
            
            if (tagEndIndex === -1) break;
            
            // タグ全体を抽出
            const fullTag = commentText.substring(tagStartIndex, tagEndIndex + 1);
            const attributesPart = commentText.substring(tagStartIndex + tagName.length + 1, tagEndIndex - 1).trim();
            const attributes = parseAttributes(attributesPart);
            
            tags.push({
                tagName: tagName,
                attributes: attributes,
                fullTag: fullTag
            });
            
            currentIndex = tagEndIndex + 1;
        }
        
        return tags;
    }

    function parseAttributes(attributeString) {
        if (!attributeString.trim()) {
            return {};
        }
        
        const attributes = {};
        // 属性を解析する正規表現: name = "value" または name = 'value' または name="value"
        const attrRegex = /([\w-]+)\s*=\s*(['"])((?:\\.|(?!\2)[^\\])*?)\2/g;
        let match;
        
        while ((match = attrRegex.exec(attributeString)) !== null) {
            const attrName = match[1];
            const quote = match[2];
            let attrValue = match[3];
            
            // エスケープされた引用符を処理
            attrValue = attrValue.replace(new RegExp('\\\\' + quote, 'g'), quote);
            
            attributes[attrName] = attrValue;
        }
        
        return attributes;
    }    

    //----loop1----
    function innerLoop1(template){
        const lines = template.trim().split('\n');
        let processedLines = [];
        let inSelect = false;
        let currentOption = [];
        let options = [];
        let shouldInclude = false;
        let inIncludeBlock = false;

        let explanationBlock = false;
        let explanationLines = [];

        function handleIncludeBlock(line) {
            if (!line.includes('<includeBlock'))
                return null;

            const attrs = parseAttributes(line);
            if (!attrs["p"])
                return null;

            return parseFloat(attrs["p"]);
        }

        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const indent = getIndent(line);
            const trimmedLine = line.trim();
    
            if (trimmedLine === '' && !inIncludeBlock && !inSelect && !explanationBlock) {
                processedLines.push(line);
                i++;
                continue;
            }
        
            if (trimmedLine.startsWith('#')) {
    
                // Handle select and options
                if (trimmedLine.includes('<select>')) {
                    inSelect = true;
                    i++;
                    continue;
                }
                if (trimmedLine.includes('</select>')) {
                    if (options.length > 0) {
                        const selectedOption = options[Math.floor(Math.random() * options.length)];
                        processedLines.push(...selectedOption.split('\n'));
                    }
                    inSelect = false;
                    options = [];
                    i++;
                    continue;
                }
                if (trimmedLine.includes('<option>')) {
                    currentOption = [];
                    i++;
                    continue;
                }
                if (trimmedLine.includes('</option>')) {
                    if (currentOption.length > 0) {
                        options.push(currentOption.join('\n'));
                    }
                    currentOption = [];
                    i++;
                    continue;
                }

                // Handle includeBlock
                const includeProb = handleIncludeBlock(trimmedLine);
                if (includeProb !== null) {

                    inIncludeBlock = true;
                    if (Math.random() < includeProb)
                        shouldInclude=true;

                    i++;
                    continue;
                }

                if (trimmedLine.includes('</includeBlock>')) {
                    inIncludeBlock = false;
                    i++;
                    continue;
                }
    
                if (trimmedLine.includes('<explanation>')){
                    explanationBlock = true;
                    i++;
                    continue;
                }

                if (trimmedLine.includes('</explanation>')){
                    explanationBlock = false;
                    i++;
                    continue;
                }

                if (explanationBlock) {
                    let pos = line.indexOf("#");
                    let s = (pos!==-1)? line.substring(pos+1).trim(): line.trim();
                    explanationLines.push(s);
                    i++;
                    continue;
                }
                else{
                    processedLines.push(line);//普通のコメント文を残すために
                    i++;
                    continue;
                }
            }
    
            if (inSelect) {                
                currentOption.push(indent + trimmedLine);
                i++;
                continue;
            }
    
            if (inIncludeBlock) {
                if (shouldInclude){
                    processedLines.push(line);
                }
                i++;
                continue;
            }
    
            processedLines.push(line);
            i++;
        }
        return [processedLines, explanationLines.join("\n")];//.join("\n");
    }

    //----loop2----
    function innerLoop2(lines){

        let processedLines = [];
        let replacements = new Map();
        
        function handleReplaceAll(line) {

            const attrs = parseAttributes(line);
            if (!attrs["targets"] || !attrs["with"])
                return false;
    
            const targets = JSON.parse(attrs["targets"]);
            const values = JSON.parse(attrs["with"]);
            
            const availableValues = [...values];
            targets.forEach(target => {
                if (availableValues.length === 0) return;
                const index = Math.floor(Math.random() * availableValues.length);
                const selectedValue = availableValues.splice(index, 1)[0];
                replacements.set(target, selectedValue);
            });
            return true;
        }

        function handleSkipLine(line) {
            const indent = getIndent(line);

            const match = line.match(/#\s*<skipLine.*?\/>/);
            const attrs = parseAttributes(line);
            if (!attrs["p"] || !match){
                return {
                    exists: false,
                    shouldSkip: false,
                    line: line
                };    
            }
                        
            const probability = parseFloat(attrs["p"]);
            const shouldSkip = Math.random() < probability;
            const cleanedLine = line.replace(match[0], '').trim();
            return {
                exists: true,
                shouldSkip:shouldSkip,
                line: indent + cleanedLine
            };
        }
    
        function handleReplace(line) {
            const attrs = parseAttributes(line);
            if (!attrs["p"] || !attrs["from"] || !attrs["to"])
                return line;
    
            const match = line.match(/#\s*<replace.*?\/>/);
            if (!match)
                return line;
    
            const fullMatch = match[0];
            const probability = JSON.parse(attrs["p"]);
            const from = JSON.parse(attrs["from"]);
            const choices = JSON.parse(attrs["to"]);

            const indent = getIndent(line);
            
            if (Math.random() < parseFloat(probability)) {
                const selectedValue = choices[Math.floor(Math.random() * choices.length)];
                return indent + line.replace(fullMatch, '').replace(from, selectedValue).trim();
            } else {
                return indent + line.replace(fullMatch, '').trim();
            }
        }

        function handleReplace_v2(line, tag) {
            if (!tag.attributes.p || !tag.attributes.from || !tag.attributes.to)
                return line;
        
            // const fullMatch = match[0];
            const probability = tag.attributes.p;
            const from = JSON.parse(tag.attributes.from);
            const choices = JSON.parse(tag.attributes.to);

            // const indent = getIndent(line);
            
            if (Math.random() < parseFloat(probability)) {
                const selectedValue = choices[Math.floor(Math.random() * choices.length)];
                return line.replace(from, selectedValue);
            } else {
                return line;
            }
        }

        function applyReplacements(line) {
            let result = line;
            for (const [target, value] of replacements.entries()) {
                result = result.replace(new RegExp(target, 'g'), value);
            }
            return result;
        }
            
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const trimmedLine = line.trim();
            const indent = getIndent(line);

            if (trimmedLine === '') {
                processedLines.push(line);
                i++;
                continue;
            }
    
            const parsedTags = parseSelfClosingTags(line);
            let tempLine = line;
            let shouldSkip = false;
            for (tag of parsedTags){
                if (tag.tagName==="replace"){
                    tempLine = handleReplace_v2(tempLine,tag);
                }
                else if (tag.tagName==="replaceAll") {
                    let b = handleReplaceAll(line);
                    shouldSkip = true;
                    break;
                }
                else if (tag.tagName==="skipLine") {
                    if (tag.attributes.p && Math.random()<parseFloat(tag.attributes.p)){
                        shouldSkip = true;
                        break;
                    }
                }
            }
            if (!shouldSkip){
                tempLine = tempLine.replace(/#.*$/, '')
                processedLines.push(tempLine);
            }
            i++;

        }

        return processedLines.map(x => {return applyReplacements(x)}).join('\n');
    }

    let d = (random_seed === null)? new Date().getTime() : random_seed;
    Math.seedrandom(d);

    let [processedLines1, explanations] = innerLoop1(template);
    let processedLine = innerLoop2(processedLines1);
    return [processedLine, explanations, d];
}

// テスト用テンプレート
const _template =`
# <select>
# <option>
def func(_VAR1_,_VAR2_):
    result = _VAR1_+_VAR2_ # <replace p="0.7" from='"+"' to='["-","*","/","//"]' />
    return result

x=1 # <replace p="0.7" from='1' to='[2,3,4]' />
y=2 # <replace p="0.7" from='2' to='[2,3,4]' />
print(func(x,y))
# </option>
# <option>
def func(_VAR1_,_VAR2_):
    if _VAR1_<=_VAR2_:# <replace p="0.7" from='"<="' to='["<",">=","==","!="]' />
        return _VAR2_

x=1 # <replace p="1.0" from='1' to='[1,2,3,4,5]' />
y=1 # <replace p="1.0" from='1' to='[1,2,3,4,5]' />
print(func(x,y))
# </option>
# </select>
`;

// // 生成例を表示
// console.log("Generated Code Variations:");
// for (let i = 0; i < 1; i++) {
//     console.log(`\n=== Variation ${i + 1} ===`);
//     console.log(processTemplate(_template));
//     console.log("---");
// }