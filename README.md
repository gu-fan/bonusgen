# Bonus Gen

A Simple Bonus Generator.


through this generator,
bonus will break into 3 parts,
latter player will got less bonus,
and make bonus randomized,

also you can change the player\_ratio and bonus\_ratio as your demands

## example
<img src="https://user-images.githubusercontent.com/579129/51132010-23f05b80-186c-11e9-8671-a157c34f6f5f.png" width="200" />
<img src="https://user-images.githubusercontent.com/579129/51132019-2a7ed300-186c-11e9-9544-1bcc8922877b.png" width="200" />
<img src="https://user-images.githubusercontent.com/579129/51132035-323e7780-186c-11e9-9f78-c95aeef63140.png" width="200" />
<img src="https://user-images.githubusercontent.com/579129/51132048-39658580-186c-11e9-8243-c1e59baaf74d.png" width="200" />

## install

yarn install bonusgen


## use

```` javascript

import BonusGen from 'bonusgen'

const player_total = 5
const bonus_total = 100


// this means player count ratio for each part, default is 1:5:10
// that is, player of part 3 is 10 times of part 1 
const player_ratio = [1,2,10]

// this means avg bonus ratio, default is 5:2:1
// that is, avg bonus of part 1 player is 5 times of part 3 player
const bonus_ratio = [5,3,1]

const bonus = BonusGen(player_total, bonus_total, player_ratio, bonus_ratio)

console.log(bonus.randomized)
// []

console.log(bonus.plain)


````










