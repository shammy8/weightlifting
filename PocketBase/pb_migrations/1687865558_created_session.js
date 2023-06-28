migrate((db) => {
  const collection = new Collection({
    "id": "nkyat6i89r2whay",
    "created": "2023-06-27 11:32:38.106Z",
    "updated": "2023-06-27 11:32:38.106Z",
    "name": "session",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ei3zh9vj",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "cvaidulx",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay");

  return dao.deleteCollection(collection);
})
