(function() {
    'use strict';

    var app = angular.module('ng-pinyin', []);

    app.filter('pinyin', function() {
        return function(text) {
            var tonePtn = /([aeiouvüAEIOUVÜ]{1,2}(n|ng|r|\'er|N|NG|R|\'ER){0,1}[1234])/g;
            var toneMap = {
                a: ['ā', 'á', 'ǎ', 'à'],
                A: ['Ā', 'Á', 'Ǎ', 'À'],
                ai: ['āi', 'ái', 'ǎi', 'ài'],
                AI: ['ĀI', 'ÁI', 'ǍI', 'ÀI'],
                ao: ['āo', 'áo', 'ǎo', 'ào'],
                AO: ['ĀO', 'ÁO', 'ǍO', 'ÀO'],
                e: ['ē', 'é', 'ě', 'è'],
                E: ['Ē', 'É', 'Ě', 'È'],
                ei: ['ēi', 'éi', 'ěi', 'èi'],
                EI: ['ĒI', 'ÉI', 'ĚI', 'ÈI'],
                i: ['ī', 'í', 'ǐ', 'ì'],
                I: ['Ī', 'Í', 'Ǐ', 'Ì'],
                ia: ['iā', 'iá', 'iǎ', 'ià'],
                IA: ['IĀ', 'IÁ', 'IǍ', 'IÀ'], 
                io: ['iō', 'ió', 'iǒ', 'iò'],
                IO: ['IŌ', 'IÓ', 'IǑ', 'IÒ'],
                iu: ['iū', 'iú', 'iǔ', 'iù'],
                IU: ['IŪ', 'IÚ', 'IǓ', 'IÙ'],
                o: ['ō', 'ó', 'ǒ', 'ò'],
                O: ['Ō', 'Ó', 'Ǒ', 'Ò'],
                ou: ['ōu', 'óu', 'ǒu', 'òu'],
                OU: ['ŌU', 'ÓU', 'ǑU', 'ÒU'],
                u: ['ū', 'ú', 'ǔ', 'ù'],
                U: ['Ū', 'Ú', 'Ǔ', 'Ù'],
                ua: ['uā', 'uá', 'uǎ', 'uà'],
                UA: ['UĀ', 'UÁ', 'UǍ', 'UÀ'],
                ue: ['uē', 'ué', 'uě', 'uè'],
                UE: ['UĒ', 'UÉ', 'UĚ', 'UÈ'],
                ui: ['uī', 'uí', 'uǐ', 'uì'],
                UI: ['UĪ', 'UÍ', 'UǏ', 'UÌ'],
                uo: ['uō', 'uó', 'uǒ', 'uò'],
                UO: ['UŌ', 'UÓ', 'UǑ', 'UÒ'],
                v: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
                V: ['Ǖ', 'Ǘ', 'Ǚ', 'Ǜ'],
                ve: ['ǖe', 'ǘe', 'ǚe', 'ǜe'],
                VE: ['ǕE', 'ǗE', 'ǙE', 'ǛE'],
                ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
                Ü: ['Ǖ', 'Ǘ', 'Ǚ', 'Ǜ'],
                üe: ['ǖe', 'ǘe', 'ǚe', 'ǜe'],
                ÜE: ['ǕE', 'ǗE', 'ǙE', 'ǛE']
            };
            var tones = text.match(tonePtn);
            if (tones) {
              tones.forEach(function(coda, idx, arr) {
                  var toneIdx = parseInt(coda.slice(-1)) - 1;
                  var vowel = coda.slice(0, -1);
                  var suffix = vowel.match(/(n|ng|r|\'er|N|NG|R|\'ER)$/);
                  vowel = vowel.replace(/(n|ng|r|\'er|N|NG|R|\'ER)$/, '');
                  var replacement = suffix && toneMap[vowel][toneIdx] + suffix[0] || toneMap[vowel][toneIdx];
                  text = text.replace(coda, replacement);
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