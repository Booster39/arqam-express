const fs = require("fs");
const papa = require("papaparse");

const csvFile = fs.readFileSync("../assets/csv/EXP_PLANNING.csv", "utf8");

const week = {
  Lundi: {},
  Mardi: {},
  Mercredi: {},
  Jeudi: {},
  Vendredi: {},
};

const DAYS = {
  LUNDI: "",
  MARDI: "",
  MERCREDI: "",
  JEUDI: "",
  VENDREDIS: "",
};

const parsedData = papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
});

const getGroups = (dayAbrev: string) => {
  let groupsOfDay: string[] = [];
  const fields = Object.keys(parsedData.data[0]).filter((name) =>
    name.startsWith(dayAbrev)
  );

  for (const row of parsedData.data) {
    for (const f of fields) {
      const value = row[f];

      if (value) {
        const groups: string[] = value.split(", ");
        groupsOfDay.push(...groups);
      }
    }
  }
  groupsOfDay = [...new Set(groupsOfDay)];
  return groupsOfDay;
};

let groupsLundi: string[] = getGroups("Lun");
let groupsMardi: string[] = getGroups("Mar");
let groupsMecredi: string[] = getGroups("Mer");
let groupsJeudi: string[] = getGroups("Jeu");
let groupsVendredi: string[] = getGroups("Ven");
