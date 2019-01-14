#Bonus Gen


A Simple Bonus Generator




## install

yarn install bonusgen


## use

```` javascript

import BonusGen from 'bonusgen'


const player_count = 5
const bonus_count = 10


const bonus = BonusGen(player_total, bonus_total, player_ratio, bonus_ratio)

console.log(bonus.randomized)

console.log(bonus.plain)


````



