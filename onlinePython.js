let editor;
let output;
let input;
let score_log;
let pyodideReadyPromise;
let fileName="untitled.py";

let g_module;
let start_time=0;
let end_time=0;
let previous_code = "";

let currentCode="";
let score = 0;
let total_time = 0;
let executed=false;

let template = `
`;

let each_score = {};
let detail_log = []

let explanations = "";
let random_seed = 0;

const SETTING = {
    'FONT_SIZE':20
    ,'THEME': 'chrome'
    ,'CODE':'problem'
};
// const SETTING = JSON.parse(localStorage.getItem("SETTING"))??  {
//     'FONT_SIZE':24
//     ,'THEME': 'monokai'
//     ,'CODE':'problem'
// };

const theme_array_bright = [
    "chrome",
    "dawn",
    "github",
    "iplastic",
    "github",
    "tomorrow",
    "kuroir",
    "katzenmilch"
];
    
const theme_array_dark = [
    "ambiance",
    "dracula",
    "cobalt",
    "gruvbox",
    "kr_theme",
    "merbivore_soft",
    "mono_industrial",
    "monokai",
    "pastel_on_dark",
    "tomorrow_night"
];

function init(){

    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/python");
  
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        readOnly: true,
        showInvisibles: false, 
        hScrollBarAlwaysVisible: true,
        vScrollBarAlwaysVisible: true,
        fontSize:SETTING['FONT_SIZE'] + "px",
        theme: "ace/theme/"+SETTING['THEME']
    });

    output = ace.edit("output");
    output.setOptions({
        highlightActiveLine: false,
        readOnly: true,
        wrapBehavioursEnabled: true,
        hScrollBarAlwaysVisible: true,
        vScrollBarAlwaysVisible: true,
        highlightGutterLine:false,
        showGutter: false,
        fontSize:SETTING['FONT_SIZE'] + "px",
        theme: "ace/theme/"+SETTING['THEME']
    });
    output.session.setUseWrapMode(true);

    input = ace.edit("input");
    input.setOptions({
        highlightActiveLine: false,
        readOnly: false,
        wrapBehavioursEnabled: true,
        hScrollBarAlwaysVisible: true,
        vScrollBarAlwaysVisible: true,
        highlightGutterLine:false,
        showGutter: false,
        fontSize:SETTING['FONT_SIZE'] + "px",
        theme: "ace/theme/"+SETTING['THEME']
    });

    score_log = ace.edit("score_log");
    score_log.setOptions({
        highlightActiveLine: false,
        readOnly: true,
        wrapBehavioursEnabled: true,
        hScrollBarAlwaysVisible: true,
        vScrollBarAlwaysVisible: true,
        highlightGutterLine:false,
        showGutter: false,
        fontSize:SETTING['FONT_SIZE'] + "px",
        theme: "ace/theme/"+SETTING['THEME']
    });

    // define a new console
    var console=(function(oldCons){
        return {
            log: function(text){
                // oldCons.log(text);
                output.session.setValue(output.getValue() + text+"\n");
            },
            info: function (text) {
                oldCons.info(text);
                // output.value+=text;
            },
            warn: function (text) {
                oldCons.warn(text);
                // output.value+=text;
            },
            error: function (text) {
                oldCons.log(text);
                output.session.setValue(output.getValue() + text+"\n");
                oldCons.error(text);
                // output.value+=text;
            }
        };
    }(window.console));
    //Then redefine the old console
    window.console = console;


    output.session.setValue("読み込み中...\n");

    // init Pyodide
    async function main() {
        let pyodide = await loadPyodide();
        
        // await pyodide.loadPackage("numpy");
        // await pyodide.loadPackage("matplotlib");
        // await pyodide.loadPackage("scikit-learn");
        
        output.session.setValue("準備完了!\n");    
        return pyodide;
    }
    pyodideReadyPromise = main();



    // JSONファイルを取得して表示
    fetch("exercises.json")
        .then( response => response.json())
        .then( data => {
            const exercises = document.querySelector("#exercises");

            data.forEach(item => {

                const optgroup = document.createElement('optgroup');
                optgroup.label=item.chapter;
                for(const key in item.exercises){
                    const option = document.createElement('option');
                    option.value=item.exercises[key];
                    option.textContent=key;

                    optgroup.appendChild(option);    
                }
                exercises.appendChild(optgroup);
            });
        });

    init_ui();
}

function init_ui(){
    // themeの選択肢を作成
    const set_theme = (elem, list)=>{
        for (const t of list){
            const option = document.createElement('option');
            option.value = t;
            option.textContent = t;
            if (option.value==SETTING['THEME'])
                option.selected=true;
            else
                option.selected=false;
    
                elem.appendChild(option);
        }    
    };
    const bright = document.querySelector("#theme-selector #Bright");
    const dark = document.querySelector("#theme-selector #Dark");
    set_theme(bright,theme_array_bright);
    set_theme(dark,theme_array_dark);

    // テーマ選択要素の変更イベントを監視
    const themeSelector = document.querySelector("#theme-selector");
    themeSelector.addEventListener("change", function() {
        // var selectedTheme = themeSelector.value;
        SETTING['THEME']=themeSelector.value;

        editor.setTheme("ace/theme/"+SETTING['THEME']);
        input.setTheme("ace/theme/"+SETTING['THEME']);
        output.setTheme("ace/theme/"+SETTING['THEME']);
        score_log.setTheme("ace/theme/"+SETTING['THEME']);

        save_settings();
    });

    function changeFontSize(value) {
        SETTING['FONT_SIZE']=SETTING['FONT_SIZE']+value;
        editor.setFontSize(SETTING['FONT_SIZE'] + "px");
        input.setFontSize(SETTING['FONT_SIZE'] + "px");
        output.setFontSize(SETTING['FONT_SIZE'] + "px");
        score_log.setFontSize(SETTING['FONT_SIZE'] + "px");
    }

    document.querySelector("#increase_font_size").addEventListener("click",function(){
        changeFontSize(1);
        save_settings();
    });

    document.querySelector("#decrease_font_size").addEventListener("click",function(){
        changeFontSize(-1);
        save_settings();
    });

    document.querySelector("#run").addEventListener("click",function(){
        if (executed)
            return;

        // SETTING['CODE']=editor.session.getValue();
        save_settings();

        output.session.setValue("");
        evaluatePython().then(value => {
            executed = true;
            let input_data = input.getValue().trim().replaceAll(" ","");
            let output_data = output.getValue().trim().replaceAll(" ","");
            let result = ((output_data.includes("PythonError:") && input_data==="") || 
                        output_data === input_data)? "正解":"不正解";

            end_time = performance.now();
            let elapsed_time = (end_time-start_time)*0.001;
            
            if (result==="正解"){
                score+=10;
                total_time += elapsed_time;
            }
            else{
                score-=10;
            }

            each_score[currentCode]=score;
            detail_log.push(currentCode+" "+random_seed+" "+elapsed_time.toFixed(3)+"秒 "+result);

            let target_score = document.querySelector("#target_score").value;
            target_score = parseInt(target_score);
            if (score===target_score){
                let obj = document.querySelector("#achieved");
                obj.innerHTML=""+target_score+"点";
                obj.style.visibility = 'visible';
                setTimeout(function(){
                    document.querySelector("#achieved").style.visibility = 'hidden';
                }, 800);
            }

            let str="--- 各問題のスコア ---\n";
            const sortedKeys = Object.keys(each_score).sort();
            sortedKeys.forEach(key => {
                str+=`${key}: ${each_score[key]}点\n`;
            });
            str+="\n-- 詳細 --\n";
            // alert(str);
            for (const e of detail_log) {
                str+=e+"\n";
            }
            // alert(str);
            score_log.session.setValue(str);


            input.setOptions({readOnly: true});
            const deco_result = (result==="正解")? result+"！！" : result+"...";
            if (deco_result.includes("不正解")){
                output.session.setValue(output.getValue()+"\n"+deco_result+"\n"+elapsed_time.toFixed(3)+"秒"+"\n\n"+explanations);
            }
            else {
                output.session.setValue(output.getValue()+"\n"+deco_result+"\n"+elapsed_time.toFixed(3)+"秒");
            }
        });
    });

    document.querySelector("#nextQesution").addEventListener('click', function() {

        if (template!=="" && executed){
            input.session.setValue("");
            output.session.setValue("");
            executed = false;
            input.setOptions({readOnly: false});

            let seed = parseInt(document.querySelector("#seed").value);
            if (isNaN(seed)){
                seed = null;
            }

            let new_code="";
            let i=0;
            do{
                i++;
                [new_code, explanations, random_seed] = processTemplate(template, seed);
            }while(new_code === previous_code && i<100);
    
            // console.log("i:"+i);
            previous_code = new_code;
            editor.session.setValue(new_code);
            start_time = performance.now();
        }
    });
}

function save_settings(){
    localStorage.setItem("SETTING",JSON.stringify(SETTING));
}

async function evaluatePython() {
    output.session.setValue("");

    let pyodide = await pyodideReadyPromise;
    pyodide.FS.writeFile("test.py", editor.session.getValue());

    let promise = new Promise((resolve, reject) => {
        pyodide.runPython(`
            exec(open('test.py').read())
        `)
    }).catch(err => {
        console.log(err);
    });

    // await promise;//20250128
}

// function getScoreLog(){
//     navigator.clipboard.writeText(score_log.getValue());
// }

function getScoreLog() {
    // テキストエリアの内容を取得
    const text = score_log.getValue();
    
    // テキストが空の場合の確認
    if (text.trim() === '') {
        return;
    }
    
    // ファイル名を取得（空の場合はデフォルト名を使用）
    let fileName = 'score_log.txt';
        
    // Blobオブジェクトとしてテキストデータを作成
    // UTF-8エンコーディングで日本語も正しく保存
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    
    // ダウンロード用のURLを作成
    const url = URL.createObjectURL(blob);
    
    // 一時的なaタグを作成してダウンロードを実行
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // 一時的な要素とURLをクリーンアップ
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // ダウンロード完了の通知
    // alert(`ファイル "${fileName}" がダウンロードされました！`);
}

function setMaterial(){

    const sel = document.querySelector('#exercises');
    if (!sel.value){
        alert("ファイルがありません.");
        return;
    }

    const ques_index = sel.selectedIndex;
	currentCode = sel.options[ques_index].textContent;

    // currentCode = sel.textContent;
    fileName=sel.value;
    fetch("./exercises/"+fileName, {
        cache: "no-store",
        method: "GET",
    })
    .then(response => response.text())
    .then(text => {
        template = text;
        let new_code="";
        [new_code,explanations, random_seed] = processTemplate(template);
        editor.session.setValue(new_code);
    
        total_time=0;
        score=0;
        // document.querySelector("#score").innerHTML = currentCode+" ("+total_time.toFixed(3)+"秒) Score: "+score;
    
        // input.session.setValue("");
        // input.setOptions({readOnly: false});


        input.session.setValue("");
        output.session.setValue("");
        executed = false;
        input.setOptions({readOnly: false});

        start_time = performance.now();
    });
}
