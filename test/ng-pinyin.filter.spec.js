(function() {
    'use strict';

    describe('pinyin filter', function() {

        var pinyin = null;

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Base for constructing all permutations of pinyin syllables,
         * for testing purposes.
         * 
         * Based on http://en.wikipedia.org/wiki/Pinyin_table
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        var pinyinData = {
            "codas": [
                ["i", "ī", "í", "ǐ", "ì"],
                ["a", "ā", "á", "ǎ", "à"],
                ["o", "ō", "ó", "ǒ", "ò"],
                ["e", "ē", "é", "ě", "è"],
                ["ai", "āi", "ái", "ǎi", "ài"],
                ["ei", "ēi", "éi", "ěi", "èi"],
                ["ao", "āo", "áo", "ǎo", "ào"],
                ["ou", "ōu", "óu", "ǒu", "òu"],
                ["an", "ān", "án", "ǎn", "àn"],
                ["en", "ēn", "én", "ěn", "èn"],
                ["ang", "āng", "áng", "ǎng", "àng"],
                ["eng", "ēng", "éng", "ěng", "èng"],
                ["ia", "iā", "iá", "iǎ", "ià"],
                ["ie", "iē", "ié", "iě", "iè"],
                ["iao", "iāo", "iáo", "iǎo", "iào"],
                ["iu", "iū", "iú", "iǔ", "iù"],
                ["ian", "iān", "ián", "iǎn", "iàn"],
                ["in", "īn", "ín", "ǐn", "ìn"],
                ["iang", "iāng", "iáng", "iǎng", "iàng"],
                ["ing", "īng", "íng", "ǐng", "ìng"],
                ["u", "ū", "ú", "ǔ", "ù"],
                ["ua", "uā", "uá", "uǎ", "uà"],
                ["uo", "uō", "uó", "uǒ", "uò"],
                ["uai", "uāi", "uái", "uǎi", "uài"],
                ["ui", "uī", "uí", "uǐ", "uì"],
                ["uan", "uān", "uán", "uǎn", "uàn"],
                ["un", "ūn", "ún", "ǔn", "ùn"],
                ["uang", "uāng", "uáng", "uǎng", "uàng"],
                ["ong", "ōng", "óng", "ǒng", "òng"],
                ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
                ["üe", "üē", "üé", "üě", "üè"],
                ["ün", "ǖn", "ǘn", "ǚn", "ǜn"],
                ["iong", "iōng", "ióng", "iǒng", "iòng"],

            ],
            "onsets": [
                "b", "p", "m", "f",
                "d", "t", "n", "l",
                "g", "k", "h", 
                "j", "q", "x", 
                "zh", "ch", "sh", "r",
                "z", "c", "s"
            ],
            "independentSyllables": [
                ["a", "ā", "á", "ǎ", "à"],
                ["o", "ō", "ó", "ǒ", "ò"],
                ["e", "ē", "é", "ě", "è"],
                ["ai", "āi", "ái", "ǎi", "ài"],
                ["ei", "ēi", "éi", "ěi", "èi"],
                ["ao", "āo", "áo", "ǎo", "ào"],
                ["ou", "ōu", "óu", "ǒu", "òu"],
                ["an", "ān", "án", "ǎn", "àn"],
                ["en", "ēn", "én", "ěn", "èn"],
                ["ang", "āng", "áng", "ǎng", "àng"],
                ["eng", "ēng", "éng", "ěng", "èng"],
                ["er", "ēr", "ér", "ěr", "èr"],
                ["yi", "yī", "yí", "yǐ", "yì"],
                ["ya", "yā", "yá", "yǎ", "yà"],
                ["yo", "yō", "yó", "yǒ", "yò"],
                ["ye", "yē", "yé", "yě", "yè"],
                ["yai", "yāi", "yái", "yǎi", "yài"],
                ["yao", "yāo", "yáo", "yǎo", "yào"],
                ["you", "yōu", "yóu", "yǒu", "yòu"], 
                ["yan", "yān", "yán", "yǎn", "yàn"],
                ["yin", "yīn", "yín", "yǐn", "yìn"],
                ["yang", "yāng", "yáng", "yǎng", "yàng"],
                ["ying", "yīng", "yíng", "yǐng", "yìng"],
                ["wu", "wū", "wú", "wǔ", "wù"],
                ["wa", "wā", "wá", "wǎ", "wà"],
                ["wo", "wō", "wó", "wǒ", "wò"],
                ["wai", "wāi", "wái", "wǎi", "wài"],
                ["wei", "wēi", "wéi", "wěi", "wèi"],
                ["wan", "wān", "wán", "wǎn", "wàn"],
                ["wen", "wēn", "wén", "wěn", "wèn"],
                ["wang", "wāng", "wáng", "wǎng", "wàng"],
                ["weng", "wēng", "wéng", "wěng", "wèng"],
                ["yu", "yū", "yú", "yǔ", "yù"],
                ["yue", "yuē", "yué", "yuě", "yuè"],
                ["yuan", "yuān", "yuán", "yuǎn", "yuàn"],
                ["yun", "yūn", "yún", "yǔn", "yùn"],
                ["yong", "yōng", "yóng", "yǒng", "yòng"],
            ]
        };

        function permutate(onsets, codas) {
            var permutations = [];
            for(var onsetIdx = 0; onsetIdx < onsets.length; onsetIdx++) {
                for(var codaIdx = 0; codaIdx < codas.length; codaIdx++) {
                    var syllables = [];
                    for(var i = 0; i < codas[codaIdx].length; i++) {
                        syllables.push(onsets[onsetIdx] + codas[codaIdx][i]);
                    }
                    permutations.push(syllables);
                }
            }
            return permutations;
        }

        function testSyllablesNoTones(syllables, description) {
            var i = 0;
            while(i < syllables.length) {
                var syllable = syllables[i]; 
                expect(pinyin(syllable)).toEqual(syllable);
                i++;
            }
            console.log("Correctly handled " + i + " " + description + " without tone markings...");
        }

        function testSyllablesWithTones(syllables) {

        }

        beforeEach(module('ng-pinyin'));

        beforeEach(inject(function(pinyinFilter) {
            pinyin = pinyinFilter;
        }));

        it('should be defined', function() {
            expect(pinyin).not.toBeUndefined();
        });

        it('should turn "gao1" into "gāo"', function() {
            expect(pinyin("gao1")).toBe("gāo");
        });
        
        it('should turn "ma1" into "mā"', function() {
            expect(pinyin("ma1")).toBe("mā");
        });
        
        it('should turn "ma2" into "má"', function() {
            expect(pinyin("ma2")).toBe("má");
        });
            
        it('should turn "mang2mang4" into "mángmàng"', function() {
            expect(pinyin("mang2mang4")).toBe("mángmàng");
        });
           
        it('should turn "wo3 jiao4 yan1si1!" into "wǒ jiào yānsī!"', function() {
            expect(pinyin("wo3 jiao4 yan1si1!")).toBe("wǒ jiào yānsī!");
        });

        it('should turn "Ma1ma" into "Māma"', function() {
            expect(pinyin("Ma1ma")).toBe("Māma");
        });

        it('should turn "MA1MA" into "MĀMA"', function() {
            expect(pinyin("MA1MA")).toBe("MĀMA");
        });

        it('should turn "MAN2" into "MÁN"', function() {
            expect(pinyin("MAN2")).toBe("MÁN");
        });

        it('should turn "Ao2" into "Áo"', function() {
            expect(pinyin("Ao2")).toBe("Áo");
        });

        it('should turn "aO2" into "áO"', function() {
            expect(pinyin("aO2")).toBe("áO");
        });

        it('should turn "yAN1Si1" into "yĀNSī', function() {
            expect(pinyin("yAN1Si1")).toBe("yĀNSī");
        });

        it('should turn "xie3" into "xiě"', function() {
            expect(pinyin("xie3")).toEqual("xiě");
        });

        it('should turn "xie3 dian3er shen2me ba" into "xiě diǎner shénme ba"', function() {
            expect(pinyin("xie3 dian3er shen2me ba")).toEqual("xiě diǎner shénme ba");
        });

        it('should not modify inputs without tonemarkings', function() {
            var text = "hej";
            expect(pinyin(text)).toBe(text);
            text = "this little sentence should not be modified!";
            expect(pinyin(text)).toBe(text);
            text = "battery will run out in 15 minutes...";
            expect(pinyin(text)).toBe(text);
            text = "AKB48 akb48";
            expect(pinyin(text)).toBe(text);
            text = "odjoadqfofnoisdjafhoc8dw778 RT28EH39R9DASaD2 !!";
            expect(pinyin(text)).toBe(text);
        });

        it('should not convert any lowercase syllables without any tone markings', function() {
            var syllables = pinyinData.independentSyllables;
            var i = 0;
            while (i < syllables.length) {
                var syllable = syllables[i][0];
                expect(pinyin(syllable)).toEqual(syllable);
                i++;
            }
            console.log("Correctly handled " + i + " lowercase syllables without tone markings...");
        });

        it('should not convert generate lowercase syllables without tone markings', function() {
            var syllables = permutate(pinyinData.onsets, pinyinData.codas).map(function(syllableRow) {
                return syllableRow[0];
            });
            var i = 0;
            while(i < syllables.length) {
                var syllable = syllables[i]; 
                expect(pinyin(syllable)).toEqual(syllable);
                i++;
            }
            console.log("Correctly handled " + i + " generated lowercase syllables without tone markings...");
        });

        it('should convert all lowercase syllables with tone markings correctly', function() {
            var syllables = pinyinData.independentSyllables;
            var total = 0;
            for (var i = 0; i < syllables.length; i++) {
                
                var syllable = syllables[i];
                for(var tone = 1; tone < 5; tone++) {
                    var input = syllable[0] + tone;
                    var output = syllable[tone];
                    expect(pinyin(input)).toEqual(output);
                    total++;
                }
            }
            console.log("Correctly handled " + total + " lowercase syllables with tone markings...");
        });

        it('should convert lowercase syllables with tone markings correctly', function() {
            var syllables = permutate(pinyinData.onsets, pinyinData.codas);
            var total = 0;
            for (var i = 0; i < syllables.length; i++) {
                
                var syllable = syllables[i];
                for(var tone = 1; tone < 5; tone++) {
                    var input = syllable[0] + tone;
                    var output = syllable[tone];
                    expect(pinyin(input)).toEqual(output);
                    total++;
                }
            }
            console.log("Correctly handled " + total + " generated lowercase syllables with tone markings...");
        });

        it('should not convert any uppercase syllables without any tone markings', function() {
            var syllables = pinyinData.independentSyllables;
            var i = 0;
            while (i < syllables.length) {
                var syllable = syllables[i][0];
                expect(pinyin(syllable.toUpperCase())).toEqual(syllable.toUpperCase());
                i++;
            }
            console.log("Correctly handled " + i + " uppercase syllables without tone markings...");
        });

        it('should not convert generate uppercase syllables without tone markings', function() {
            var syllables = permutate(pinyinData.onsets, pinyinData.codas).map(function(syllableRow) {
                return syllableRow[0];
            });
            var i = 0;
            while(i < syllables.length) {
                var syllable = syllables[i]; 
                expect(pinyin(syllable.toUpperCase())).toEqual(syllable.toUpperCase());
                i++;
            }
            console.log("Correctly handled " + i + " generated uppercase syllables without tone markings...");
        });
        
        it('should be able to convert all uppercase syllables with tone markings correctly', function() {
            var syllables = pinyinData.independentSyllables;
            var total = 0;
            for (var i = 0; i < syllables.length; i++) {
                
                var syllable = syllables[i];
                for(var tone = 1; tone < 5; tone++) {
                    var input = syllable[0] + tone;
                    var output = syllable[tone];
                    expect(pinyin(input.toUpperCase())).toEqual(output.toUpperCase());
                    total++;
                }
            }
            console.log("Correctly handled " + total + " uppercase syllables with tone markings...");
        });

        it('should be able to convert uppercase syllables with tone markings correctly', function() {
            var syllables = permutate(pinyinData.onsets, pinyinData.codas);
            var total = 0;
            for (var i = 0; i < syllables.length; i++) {
                
                var syllable = syllables[i];
                for(var tone = 1; tone < 5; tone++) {
                    var input = syllable[0] + tone;
                    var output = syllable[tone];
                    expect(pinyin(input.toUpperCase())).toEqual(output.toUpperCase());
                    total++;
                }
            }
            console.log("Correctly handled " + total + " generated uppercase syllables with tone markings...");
        });
    });
})();