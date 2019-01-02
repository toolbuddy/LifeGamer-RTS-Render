function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1: red
// 2: orange
// 3: yellow
// 4: green
// 5: blue
// 6: purple/black

function ownerGenerate(num) {
  switch (num)
  {
    case 1:
      return "Andy";
      break;
    case 2:
      return "Betty";
      break;
    case 3:
      return "Candy";
      break;
    case 4:
      return "David";
      break;
    case 5:
      return "Evea";
      break;
    default:
      return "NONE";
  }
}

var output = "[";
for (var y = 0; y < 50; ++y)
{
  for (var x = 0; x < 50; ++x)
  {
    var xPos = "\"x\": \"" + x + "\",";
    var yPos = "\"y\": \"" + y + "\",";
    var terrain = "\"terrain\": \"" + getRandom(0, 5) + "\",";
    var owner = "\"owner\": \"" + ownerGenerate(getRandom(1, 10)) + "\"";
    var tmp = "{" + xPos + yPos + terrain + owner + "}"
    if (!(x == 49 && y == 49))
    {
      tmp += ",";
    }
    output += tmp;
  }
}
output += "]";

console.log(output);