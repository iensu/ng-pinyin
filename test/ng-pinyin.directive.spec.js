(function() {
    'use strict';

    describe('ng-pinyin directive', function() {

        var scope,
            compile,
            defaultData,
            defaultTemplate,
            pinyin = null;

        var error = new Error("ng-pinyin: ng-model needs to refer to a string!");

        function createElement(data, template) {
            var elem;

            scope.data = data || defaultData;
            elem = compile(template || defaultTemplate)(scope);

            scope.$digest();

            return elem;
        }

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }

        beforeEach(module('ng-pinyin'));

        beforeEach(inject(function($compile, $rootScope) {
            defaultTemplate = "<input ng-pinyin ng-model='data' />";
            defaultData = "pin1yin";
            scope = $rootScope;
            compile = $compile;
        }));
        
        afterEach(function() {
            scope = compile = defaultTemplate = null;
        });

        it("should exist", function() {
            var elem = createElement();
            expect(elem).not.toBeUndefined();
        });

        it("should throw error if ng-model is not provided", function() {
            var template = "<input ng-pinyin />";
            expect( function() { createElement(defaultData, template); } ).toThrow();
        });

        it("should throw an error if ng-model has a value and is not a string", function() {
            expect( function() { createElement(12); } ).toThrow( error );
            expect( function() { createElement(true); } ).toThrow( error );
            expect( function() { createElement([]); } ).toThrow( error );
            expect( function() { createElement({}); } ).toThrow( error );
        });

        it("should not throw an error if ng-model refers to a string", function() {
            expect( function() { createElement(""); } ).not.toThrow( error );
            expect( function() { createElement("a string"); } ).not.toThrow( error );
        });

        it("should not throw an error if ng-model has a falsy value", function() {
            expect( function() { createElement(null); } ).not.toThrow( error );
            expect( function() { createElement(NaN); } ).not.toThrow( error );
            expect( function() { createElement(undefined); } ).not.toThrow( error );
            expect( function() { createElement(0); } ).not.toThrow( error );
            expect( function() { createElement(false); } ).not.toThrow( error );
            expect( function() { createElement(""); } ).not.toThrow( error );
        });

    });

})();