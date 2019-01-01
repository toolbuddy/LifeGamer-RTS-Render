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
for (var y = -25; y < 25; ++y)
{
  for (var x = -25; x < 25; ++x)
  {
    var xPos = "\"x\": " + x + ",";
    var yPos = "\"y\": " + y + ",";
    var terrain = "\"terrain\": \"" + getRandom(0, 5) + "\",";
    var owner = "\"owner\": \"" + ownerGenerate(getRandom(1, 10)) + "\"";
    var tmp = "{" + xPos + yPos + terrain + owner + "}"
    if (!(x == 24 && y == 24))
    {
      tmp += ",";
    }
    output += tmp;
  }
}
output += "]";

console.log(output);