ng-pinyin
=========

Angular attribute directive and filter for dynamic rendering of Chinese pinyin tone diactrics.

Each tone is indicated by a digit between 1-4, after the syllable to which the tone applies:
* ni3hao3 -> nǐhǎo
* pin1yin1 -> pīnyīn
* zhong1guo2 -> zhōngguó
* lv4se4 -> lǜsè

## Usage

ng-pinyin can be used as either an attribute directive or as a filter.

### ng-pinyin directive

As an attribute directive it can be applied to any user input field which has a ng-model assigned to it. The ng-model must of course refer to a string.

```html
<input ng-pinyin ng-model="text" />
```

```html
<textarea ng-pinyin ng-model="text" />
```

### pinyin filter

```html
<div>{{someStringVar | pinyin}}</div>
```