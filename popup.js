// Copyright (c) 2017 Jonathan Clarke. All rights reserved.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('translateButton').onclick = translate;
});

var result = [];

function translate(){
	var codeToTranslate = document.getElementById('Pretranslation').value;
    //Do translation
	var strArray = codeToTranslate.split(/\r?\n/);
	for(x = 0; x < strArray.length; x++){
        translateLine(strArray[x])
	}
	var resultstr = "";
	for(i = 0; i < result.length; i++){
	    resultstr = resultstr + "\n" + result[i];
	}
	resultstr = resultstr.replace(/'/g,"\"");
	document.getElementById('Aftertranslation').value = resultstr;
}

function translateLine(line){
    if (String(line).search("\\bgoto\\b") != -1) {
        var selector = String(line).match(/'([^']+)'/g)[0];
        var resultstr = ("browser.Visit(" + selector + ");");
        result.push(resultstr);
    }
    if (String(line).search("\\bclick\\b") != -1) {
        var selector = String(line).match(/'([^']+)'/g)[0];
        var resultstr = ("browser.FindCss(" + selector + ").Click();");
        result.push(resultstr);
    }
    if (String(line).search("\\btype\\b") != -1) {
        var selector1 = String(line).match(/'([^']+)'/g)[0];
        var selector2 = String(line).match(/'([^']+)'/g)[1];
        var resultstr = ("browser.FindCss(" + selector1 + ").SendKeys(" + selector2 + ");");
        result.push(resultstr);
    }
    if (String(line).search("\\bend\\b") != -1) {
        var selector = String(line).match(/'([^']+)'/g);
        var resultstr = ("browser.Dispose();");
        result.push(resultstr);
    }
}