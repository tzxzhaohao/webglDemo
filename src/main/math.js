// 将十进制的数转为二进制

const getTwo = (num,str = '')=>{
  if(Math.floor(num / 2) === 0 ){
    str += num % 2
   return str
  }else{
    str += num % 2
   return getTwo(Math.floor(num / 2),str)
  }
  

}
console.log(getTwo(2503))