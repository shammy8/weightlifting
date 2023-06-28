migrate((db) => {
  const collection = new Collection({
    "id": "4y80q0j9lrhclro",
    "created": "2023-06-27 14:24:29.297Z",
    "updated": "2023-06-27 14:24:29.297Z",
    "name": "group_of_sets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rh3esfl4",
        "name": "exercise_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "rapjjgrg42mkwpg",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "yogjk4gd",
        "name": "reps",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "swcux3jf",
        "name": "time",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro");

  return dao.deleteCollection(collection);
})
