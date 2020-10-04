export const Colors = [
  "#55eb07",
  "#50df74",
  "#1a6402",
  "#ddfe9a",
  "#d7cb67",
  "#7682c8",
  "#9895a1",
  "#761673",
  "#d3942f",
  "#57e8d5",
];

export const getColors = (n)=> {
  const colors = []
  for(let i=0;i<n;i++){
   colors.push(generateRandomColor())
  }
  return colors
}

 function generateRandomColor() {
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (randomColor.length !== 7) {
    // In any case, the color code is invalid
    randomColor = generateRandomColor();
  }
  return randomColor;
  // The random color will be freshly served
}