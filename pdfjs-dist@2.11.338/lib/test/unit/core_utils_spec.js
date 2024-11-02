"use strict";var _primitives=require("../../core/primitives.js"),_core_utils=require("../../core/core_utils.js"),_test_utils=require("./test_utils.js");describe("core_utils",(function(){describe("getInheritableProperty",(function(){it("handles non-dictionary arguments",(function(){expect((0,_core_utils.getInheritableProperty)({dict:null,key:"foo"})).toEqual(void 0),expect((0,_core_utils.getInheritableProperty)({dict:void 0,key:"foo"})).toEqual(void 0)})),it("handles dictionaries that do not contain the property",(function(){const e=new _primitives.Dict;expect((0,_core_utils.getInheritableProperty)({dict:e,key:"foo"})).toEqual(void 0);const t=new _primitives.Dict;t.set("bar","baz"),expect((0,_core_utils.getInheritableProperty)({dict:t,key:"foo"})).toEqual(void 0)})),it("fetches the property if it is not inherited",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:"quux"}]),o=new _primitives.Dict(t);o.set("foo","bar"),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"foo"})).toEqual("bar"),o.set("baz",["qux",e]),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"baz",getArray:!0})).toEqual(["qux","quux"])})),it("fetches the property if it is inherited and present on one level",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:"quux"}]),o=new _primitives.Dict(t),l=new _primitives.Dict(t);o.set("Parent",l),l.set("foo","bar"),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"foo"})).toEqual("bar"),l.set("baz",["qux",e]),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"baz",getArray:!0})).toEqual(["qux","quux"])})),it("fetches the property if it is inherited and present on multiple levels",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:"quux"}]),o=new _primitives.Dict(t),l=new _primitives.Dict(t);o.set("Parent",l),o.set("foo","bar1"),l.set("foo","bar2"),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"foo"})).toEqual("bar1"),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"foo",getArray:!1,stopWhenFound:!1})).toEqual(["bar1","bar2"]),o.set("baz",["qux1",e]),l.set("baz",["qux2",e]),expect((0,_core_utils.getInheritableProperty)({dict:o,key:"baz",getArray:!0,stopWhenFound:!1})).toEqual([["qux1","quux"],["qux2","quux"]])}))})),describe("toRomanNumerals",(function(){it("handles invalid arguments",(function(){for(const e of["foo",-1,0])expect((function(){(0,_core_utils.toRomanNumerals)(e)})).toThrow(new Error("The number should be a positive integer."))})),it("converts numbers to uppercase Roman numerals",(function(){expect((0,_core_utils.toRomanNumerals)(1)).toEqual("I"),expect((0,_core_utils.toRomanNumerals)(6)).toEqual("VI"),expect((0,_core_utils.toRomanNumerals)(7)).toEqual("VII"),expect((0,_core_utils.toRomanNumerals)(8)).toEqual("VIII"),expect((0,_core_utils.toRomanNumerals)(10)).toEqual("X"),expect((0,_core_utils.toRomanNumerals)(40)).toEqual("XL"),expect((0,_core_utils.toRomanNumerals)(100)).toEqual("C"),expect((0,_core_utils.toRomanNumerals)(500)).toEqual("D"),expect((0,_core_utils.toRomanNumerals)(1e3)).toEqual("M"),expect((0,_core_utils.toRomanNumerals)(2019)).toEqual("MMXIX")})),it("converts numbers to lowercase Roman numerals",(function(){expect((0,_core_utils.toRomanNumerals)(1,!0)).toEqual("i"),expect((0,_core_utils.toRomanNumerals)(6,!0)).toEqual("vi"),expect((0,_core_utils.toRomanNumerals)(7,!0)).toEqual("vii"),expect((0,_core_utils.toRomanNumerals)(8,!0)).toEqual("viii"),expect((0,_core_utils.toRomanNumerals)(10,!0)).toEqual("x"),expect((0,_core_utils.toRomanNumerals)(40,!0)).toEqual("xl"),expect((0,_core_utils.toRomanNumerals)(100,!0)).toEqual("c"),expect((0,_core_utils.toRomanNumerals)(500,!0)).toEqual("d"),expect((0,_core_utils.toRomanNumerals)(1e3,!0)).toEqual("m"),expect((0,_core_utils.toRomanNumerals)(2019,!0)).toEqual("mmxix")}))})),describe("log2",(function(){it("handles values smaller than/equal to zero",(function(){expect((0,_core_utils.log2)(0)).toEqual(0),expect((0,_core_utils.log2)(-1)).toEqual(0)})),it("handles values larger than zero",(function(){expect((0,_core_utils.log2)(1)).toEqual(0),expect((0,_core_utils.log2)(2)).toEqual(1),expect((0,_core_utils.log2)(3)).toEqual(2),expect((0,_core_utils.log2)(3.14)).toEqual(2)}))})),describe("isWhiteSpace",(function(){it("handles space characters",(function(){expect((0,_core_utils.isWhiteSpace)(32)).toEqual(!0),expect((0,_core_utils.isWhiteSpace)(9)).toEqual(!0),expect((0,_core_utils.isWhiteSpace)(13)).toEqual(!0),expect((0,_core_utils.isWhiteSpace)(10)).toEqual(!0)})),it("handles non-space characters",(function(){expect((0,_core_utils.isWhiteSpace)(11)).toEqual(!1),expect((0,_core_utils.isWhiteSpace)(null)).toEqual(!1),expect((0,_core_utils.isWhiteSpace)(void 0)).toEqual(!1)}))})),describe("parseXFAPath",(function(){it("should get a correctly parsed path",(function(){const e="foo.bar[12].oof[3].rab.FOO[123].BAR[456]";expect((0,_core_utils.parseXFAPath)(e)).toEqual([{name:"foo",pos:0},{name:"bar",pos:12},{name:"oof",pos:3},{name:"rab",pos:0},{name:"FOO",pos:123},{name:"BAR",pos:456}])}))})),describe("escapePDFName",(function(){it("should escape PDF name",(function(){expect((0,_core_utils.escapePDFName)("hello")).toEqual("hello"),expect((0,_core_utils.escapePDFName)("\xfehello")).toEqual("#fehello"),expect((0,_core_utils.escapePDFName)("he\xfell\xffo")).toEqual("he#fell#ffo"),expect((0,_core_utils.escapePDFName)("\xfehe\xfell\xffo\xff")).toEqual("#fehe#fell#ffo#ff"),expect((0,_core_utils.escapePDFName)("#h#e#l#l#o")).toEqual("#23h#23e#23l#23l#23o"),expect((0,_core_utils.escapePDFName)("#()<>[]{}/%")).toEqual("#23#28#29#3c#3e#5b#5d#7b#7d#2f#25")}))})),describe("encodeToXmlString",(function(){it("should get a correctly encoded string with some entities",(function(){const e="\"\u0397ell\ud83d\ude02' & <W\ud83d\ude02rld>";expect((0,_core_utils.encodeToXmlString)(e)).toEqual("&quot;&#x397;ell&#x1F602;&apos; &amp; &lt;W&#x1F602;rld&gt;")})),it("should get a correctly encoded basic ascii string",(function(){const e="hello world";expect((0,_core_utils.encodeToXmlString)(e)).toEqual(e)}))})),describe("validateCSSFont",(function(){it("Check font family",(function(){const e={fontFamily:'"blah blah " blah blah"',fontWeight:0,italicAngle:0};expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily='"blah blah \\" blah blah"',expect((0,_core_utils.validateCSSFont)(e)).toEqual(!0),e.fontFamily="'blah blah ' blah blah'",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="'blah blah \\' blah blah'",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!0),e.fontFamily='"blah blah ',expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily='blah blah"',expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="'blah blah ",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="blah blah'",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="blah blah blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!0),e.fontFamily="blah 0blah blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="blah blah -0blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="blah blah --blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1),e.fontFamily="blah blah -blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!0),e.fontFamily="blah fdqAJqjHJK23kl23__--Kj blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!0),e.fontFamily="blah fdqAJqjH$JK23kl23__--Kj blah",expect((0,_core_utils.validateCSSFont)(e)).toEqual(!1)})),it("Check font weight",(function(){const e={fontFamily:"blah",fontWeight:100,italicAngle:0};(0,_core_utils.validateCSSFont)(e),expect(e.fontWeight).toEqual("100"),e.fontWeight="700",(0,_core_utils.validateCSSFont)(e),expect(e.fontWeight).toEqual("700"),e.fontWeight="normal",(0,_core_utils.validateCSSFont)(e),expect(e.fontWeight).toEqual("normal"),e.fontWeight=314,(0,_core_utils.validateCSSFont)(e),expect(e.fontWeight).toEqual("400")})),it("Check italic angle",(function(){const e={fontFamily:"blah",fontWeight:100,italicAngle:10};(0,_core_utils.validateCSSFont)(e),expect(e.italicAngle).toEqual("10"),e.italicAngle=-123,(0,_core_utils.validateCSSFont)(e),expect(e.italicAngle).toEqual("14"),e.italicAngle="91",(0,_core_utils.validateCSSFont)(e),expect(e.italicAngle).toEqual("14"),e.italicAngle=2.718,(0,_core_utils.validateCSSFont)(e),expect(e.italicAngle).toEqual("2.718")}))}))}));