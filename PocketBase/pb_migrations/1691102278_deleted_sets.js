migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hqwqxw68tj8cyib");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "hqwqxw68tj8cyib",
    "created": "2023-06-28 08:37:11.014Z",
    "updated": "2023-06-29 15:00:44.547Z",
    "name": "sets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2la6dyal",
        "name": "groupOfSetsId",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "4y80q0j9lrhclro",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "v8wzvpwv",
        "name": "order",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "dygegjai",
        "name": "reps",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "u9lupmz4",
        "name": "time",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "6ie9azso",
        "name": "weight",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
