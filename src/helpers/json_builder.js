const json_builder = (params) => {
  let final_json = [];

  params.creatures.forEach(creature => {
    final_json.push({
      key: value
    })
  })

  return final_json;
};

module.exports = json_builder;

/*
== TYPES ==
Lv
Name
HP
MP
St
Dx
Ma
Ag
Lu
Phys
Gun
Fire
Ice
Elec
Force
Light
Dark
*/