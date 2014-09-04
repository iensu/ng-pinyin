(function() {
    'use strict';

    describe('pinyin filter', function() {

        var pinyin = null;

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
    });
})();