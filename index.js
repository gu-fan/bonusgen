import fp from 'lodash/fp'
import { ceil, sum, random, range } from './util'

// divide()
//
// divide player_total and bonus_total into 3 parts
// by player_ratio, @default[1,5,10] and bonus_ratio @default[5,2,1]
// 
// e.g.:
//
// player_total: 7
// bonus_total: --
// player_ratio: 2:2:3
// bonus_ratio: 3:2:1
//
// |. .
// |    . .
// |        . . .
// +--------------
//
function divide(player_total, bonus_total, player_ratio, bonus_ratio){

  player_ratio = player_ratio && typeof player_ratio == 'object' ? player_ratio : [1, 5, 10]
  bonus_ratio = bonus_ratio && typeof bonus_ratio == 'object' ? bonus_ratio : [5, 2,  1]
  
  var sum_player_ratio = sum(player_ratio)
  // console.log('SUM player_ratio %d', sum_player_ratio)

  var p0 = ceil(player_total * player_ratio[0] / sum_player_ratio) 
  var p1 = ceil(player_total * player_ratio[1] / sum_player_ratio)    
  var p2 = player_total - p0 - p1

  while (p2 < 0 ) {
    p1--
    p2++
  }

  var bonus_ratio_product = [
        p0 * bonus_ratio[0],
        p1 * bonus_ratio[1],
        p2 * bonus_ratio[2]
      ]

  var sum_bonus_ratio = sum(bonus_ratio_product)

  var b0 = bonus_total * bonus_ratio_product[0] / sum_bonus_ratio
  var b1 = bonus_total * bonus_ratio_product[1] / sum_bonus_ratio
  var b2 = bonus_total * bonus_ratio_product[2] / sum_bonus_ratio

  return {
    0: {
      player: p0,
      bonus: b0/p0,
    },
    1: {
      player: p1,
      bonus: b1/p1,
    },
    2: {
      player: p2,
      bonus: b2/p2,
    },
  }

}

// incline()
//
// make a horizon line into a oblique line
//
// making the bonus greater for player came first,
// and smaller for later ones
//
// e.g.:
//
// before
//
// | 
// |  
// |. . . . . 
// |    
// |     
// +----------
//
// after
//
// |. 
// |  .
// |    .
// |      .
// |        .
// +----------
//
function incline(group,  delta_y){

  var player_arr = range(0, group.player)

  var dy = (delta_y[1] - delta_y[0]) / group.player
  var dx = 1

  player_arr = player_arr.map((i,idx)=>{

    return delta_y[1] - (group.player - idx) * dy / dx
  
  })

  return player_arr

}

// randomize()
//
// randomize bonus in array, and make final match the bonus total
// e.g.:
//
// before
//
// |. 
// |  .
// |    .
// |      .
// |        .
// +----------
//
// after
// |.
// |    .
// |     
// |  .   .
// |         
// |        .
// +----------
// 
// 
function randomize(bonus_arr, bonus_total){

  var avg_t = (bonus_total - sum(bonus_arr)) / bonus_arr.length

  // console.log('before fix %d', avg_t)

  bonus_arr = bonus_arr.map(i=>parseInt(i+avg_t))

  // console.log("before %d", sum(bonus_arr) )

  var norm_len = ceil(bonus_total / bonus_arr.length / 20)
  // console.log("norm_len %d", norm_len)


  // loop each
  var r_t = sum(bonus_arr) - bonus_total
  var r = random(-norm_len, norm_len)
  bonus_arr = bonus_arr.map(i=>{

    var k = i + r
    r_t += r

    if (r_t > norm_len) {
      r = random(-norm_len, 0)
    } else if (r_t < -norm_len) {
      r = random(0, norm_len)
    } else {
      r = random(-norm_len, norm_len)
    }

    if (k <= 0) {
      k = random(1, norm_len)
    }

    return k
  })

  // console.log("after %d", sum(bonus_arr) )

  // loop exceeds and cut down /add up each cash by 1
  var exceeds = bonus_total - sum(bonus_arr)
  // console.log("after exceeds %d", exceeds )
  var i = 0
  while (exceeds) {
    if (exceeds > 0) {
      bonus_arr[i]++
      exceeds--
    } else {
      if (bonus_arr[i] > 1) {
        bonus_arr[i]--
        exceeds++
      }
    }
    i++
    if (i >= bonus_arr.length) {
      i=0       // restart when reach arr end
    }
    // console.log('exceeds', exceeds)
  }

  // console.log("justify %d", sum(bonus_arr) )

  return bonus_arr

}

// get the delta ys (y0 and y1 of bonus) for each player group
function get_delta_ys(groups){

  var avg_b = [groups[0].bonus, groups[1].bonus, groups[2].bonus]
  var joints = [(avg_b[0] + avg_b[1])/2, (avg_b[1] + avg_b[2])/2]
  var delta_ys = [
    [avg_b[0] + avg_b[0] - joints[0], joints[0]],
    [joints[0], joints[1]],
    [joints[1], 1],
  ]
  return delta_ys
}


module.exports = function (player_total, bonus_total, player_ratio, bonus_ratio){

  const groups = divide(player_total, bonus_total, player_ratio, bonus_ratio)

  const delta_ys = get_delta_ys(groups)

  const plain = []
            .concat(incline(groups[0], delta_ys[0]))
            .concat(incline(groups[1], delta_ys[1]))
            .concat(incline(groups[2], delta_ys[2]))

  const randomized =  randomize(plain, bonus_total)

  return {randomized, plain}

}
