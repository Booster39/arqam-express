import { group } from "console";

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

const getHours = (dayAbrev: string) => {
  let groupsOfDay: string[] = [];
  let hours: Object[] = [];
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
  for (const row of parsedData.data) {
    for (const f of fields) {
      const value = row[f];
      if (value) {
        groupsOfDay.forEach((group) => {
          if (value.includes(group)) {
            console.log(`${group}: ${f}`);
            hours.push({ group, f });
          }
        });
      }
    }
  }
  return hours;
};

let groupsLundi: string[] = getGroups("Lun");
let hoursLundi: Object[] = getHours("Lun");

let groupsMardi: string[] = getGroups("Mar");
let groupsMecredi: string[] = getGroups("Mer");
let groupsJeudi: string[] = getGroups("Jeu");
let groupsVendredi: string[] = getGroups("Ven");
