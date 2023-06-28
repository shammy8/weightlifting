migrate((db) => {
  const collection = new Collection({
    "id": "rapjjgrg42mkwpg",
    "created": "2023-06-27 13:51:47.019Z",
    "updated": "2023-06-27 13:51:47.019Z",
    "name": "exercises",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ljmunbll",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xx7tiefx",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "reps",
            "time",
            "score",
            "note"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg");

  return dao.deleteCollection(collection);
})
