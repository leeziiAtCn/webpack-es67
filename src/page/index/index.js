/**
 * Created: leezii
 * Date: 2018/1/22
 * Time: 15:30
 */

import $ from 'jquery'
import './index.less'

$('body').css({background: 'green'})

async function a () {
  let c = await  Promise.resolve({a: 7786})
  return c
}

a()
$('#h1').html(222)
console.log('ccc'.includes('c'))