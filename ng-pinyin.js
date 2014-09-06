(function() {
    'use strict';

    var app = angular.module('ng-pinyin', []);

    app.filter('pinyin', function() {

        function getUpperCaseIndices(str) {
            var indices = [];
            for(var i = 0; i < str.length; i++) {
                if(str[i] === str[i].toUpperCase()) {
                    indices.push(i);
                }
            }
            return indices;
        }

        function revertToUpperCase(str, indices) {
            var chars = str.split('');
            indices.map(function(idx) { 
                chars[idx] = chars[idx].toUpperCase();
            });
            return chars.join('');
        }

        return function(text) {
            var tonePtn = /([aeiouvüAEIOUVÜ]{1,2}(n|ng|r|\'er|N|NG|R|\'ER){0,1}[1234])/g;
            var toneMap = {
                a: ['ā', 'á', 'ǎ', 'à'],
                ai: ['āi', 'ái', 'ǎi', 'ài'],
                ao: ['āo', 'áo', 'ǎo', 'ào'],
                e: ['ē', 'é', 'ě', 'è'],
                ei: ['ēi', 'éi', 'ěi', 'èi'],
                i: ['ī', 'í', 'ǐ', 'ì'],
                ia: ['iā', 'iá', 'iǎ', 'ià'],
                ie: ['iē', 'ié', 'iě', 'iè'],
                io: ['iō', 'ió', 'iǒ', 'iò'],
                iu: ['iū', 'iú', 'iǔ', 'iù'],
                o: ['ō', 'ó', 'ǒ', 'ò'],
                ou: ['ōu', 'óu', 'ǒu', 'òu'],
                u: ['ū', 'ú', 'ǔ', 'ù'],
                ua: ['uā', 'uá', 'uǎ', 'uà'],
                ue: ['uē', 'ué', 'uě', 'uè'],
                ui: ['uī', 'uí', 'uǐ', 'uì'],
                uo: ['uō', 'uó', 'uǒ', 'uò'],
                v: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
                ve: ['üē', 'üé', 'üě', 'üè'],
                ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
                üe: ['üē', 'üé', 'üě', 'üè'],
            };
            var tones = text.match(tonePtn);
            if (tones) {
              tones.forEach(function(coda, idx, arr) {
                  var toneIdx = parseInt(coda.slice(-1)) - 1;
                  var vowel = coda.slice(0, -1);
                  var suffix = vowel.match(/(n|ng|r|\'er|N|NG|R|\'ER)$/);
                  vowel = vowel.replace(/(n|ng|r|\'er|N|NG|R|\'ER)$/, '');
                  var upperCaseIdxs = getUpperCaseIndices(vowel);
                  vowel = vowel.toLowerCase();
                  var replacement = suffix && toneMap[vowel][toneIdx] + suffix[0] || toneMap[vowel][toneIdx];
                  text = text.replace(coda, revertToUpperCase(replacement, upperCaseIdxs));
              });
            }
            return text;
        };
    });

    app.directive('ngPinyin', ['$timeout', 'pinyinFilter', function($timeout, pinyinFilter){
        
        function link(scope, element, attrs, ngModelCtrl) {

            function convertToPinyin(text) {
                var updatedText = text;
                if (text && typeof text !== "string") {
                    throw Error("ng-pinyin: ng-model needs to refer to a string!");
                } else if (text) {
                    updatedText = pinyinFilter(text);
                }
                if(updatedText !== text) {
                    ngModelCtrl.$setViewValue(updatedText);
                    ngModelCtrl.$render();
                }
                return text;
            }

            var modelValue = scope[attrs.ngModel];
            if (modelValue && typeof modelValue !== "string") {
                    throw Error("ng-pinyin: ng-model needs to refer to a string!");
            }

            ngModelCtrl.$parsers.push(convertToPinyin);
        }

        return {
            require: 'ngModel',
            restrict: 'A',
            link: link
        };
    }]);
})();