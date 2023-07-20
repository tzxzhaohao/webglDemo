// 定义坐标原点
const firstPoint = [0, 0, 0]
const secondPoint = [1, 0, 0]
const thirdPoint = [1, 1, 0]
const fourthPoint = [0, 1, 0]
const fivePoint = [0, 0, 1]
const sixthPoint = [1, 0, 1]
const seventhPoint = [1, 1, 1]
const eighthPoint = [0, 1, 1]

// 定义六个面
// 前面
const frontFlat = [
  fivePoint,
  sixthPoint,
  seventhPoint,
  fivePoint,
  seventhPoint,
  eighthPoint,
]
// 后面
const backFlat = [
  firstPoint,
  secondPoint,
  thirdPoint,
  firstPoint,
  thirdPoint,
  fourthPoint,
]
// 左面
const leftFlat = [
  firstPoint,
  fivePoint,
  eighthPoint,
  firstPoint,
  fourthPoint,
  eighthPoint,
]
// 右面
const rightFlat = [
  secondPoint,
  thirdPoint,
  seventhPoint,
  secondPoint,
  sixthPoint,
  seventhPoint,
]
// 上面
const topFlat = [
  thirdPoint,
  fourthPoint,
  seventhPoint,
  eighthPoint,
  fourthPoint,
  seventhPoint,
]
// 下面
const bottomFlat = [
  firstPoint,
  secondPoint,
  sixthPoint,
  firstPoint,
  fivePoint,
  sixthPoint,
]

const pointsArr = [
  frontFlat,
  backFlat,
  leftFlat,
  rightFlat,
  topFlat,
  bottomFlat,
].flat(2)
const red = [1, 0, 0]
const blue = [0, 1, 0]
const green = [0, 0, 1]
const yellow = [0, 1, 1]
const pick = [1, 1, 0]
const ss = [1, 0, 1]
const colorArr = [
  red,
  red,
  red,
  red,
  red,
  red,
  blue,
  blue,
  blue,
  blue,
  blue,
  blue,
  green,
  green,
  green,
  green,
  green,
  green,
  yellow,
  yellow,
  yellow,
  yellow,
  yellow,
  yellow,
  pick,
  pick,
  pick,
  pick,
  pick,
  pick,
  ss,
  ss,
  ss,
  ss,
  ss,
  ss,
].flat()

export { pointsArr, colorArr }
