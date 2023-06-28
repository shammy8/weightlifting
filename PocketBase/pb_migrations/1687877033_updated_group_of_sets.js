migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tumwnj2i",
    "name": "session_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "nkyat6i89r2whay",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rh3esfl4",
    "name": "exercise_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "rapjjgrg42mkwpg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yogjk4gd",
    "name": "reps",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swcux3jf",
    "name": "time",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tumwnj2i",
    "name": "session_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "nkyat6i89r2whay",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
