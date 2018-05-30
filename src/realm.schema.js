import Realm from "realm";

class User extends Realm.Object {}
class Education extends Realm.Object {}
class Information extends Realm.Object {}
class Opportunities extends Realm.Object {}
class CurrentPrices extends Realm.Object {}
class Bookmark extends Realm.Object {}
class Pagination extends Realm.Object {}

User.schema = {
  name: "User",
  properties: {
    userId: "string"
  }
};

Pagination.schema = {
  name: "Pagination",
  primaryKey: "category",
  properties: {
    category: "string",
    pageCount: "string"
  }
};

Education.schema = {
  name: "Education",
  primaryKey: "id",
  properties: {
    oid: { type: "int", indexed: true },
    id: "string",
    title: "string",
    content: "string",
    category: "string",
    tags: "string[]",
    draft: "bool",
    created_at: "string",
    likes_count: "string",
    user_liked: "string",
    bookmarked: "bool",
    schemaType: "string",
    src: "string"
  }
};

Information.schema = {
  name: "Information",
  primaryKey: "id",
  properties: {
    oid: { type: "int", indexed: true },
    id: "string",
    title: "string",
    content: "string",
    category: "string",
    tags: "string[]",
    draft: "bool",
    created_at: "string",
    likes_count: "string",
    user_liked: "string",
    bookmarked: "bool",
    schemaType: "string",
    src: "string"
  }
};

Opportunities.schema = {
  name: "Opportunities",
  primaryKey: "id",
  properties: {
    oid: { type: "int", indexed: true },
    id: "string",
    title: "string",
    content: "string",
    category: "string",
    tags: "string[]",
    draft: "bool",
    created_at: "string",
    likes_count: "string",
    user_liked: "string",
    bookmarked: "bool",
    schemaType: "string",
    src: "string"
  }
};

CurrentPrices.schema = {
  name: "CurrentPrices",
  primaryKey: "id",
  properties: {
    oid: { type: "int", indexed: true },
    id: "string",
    title: "string",
    content: "string",
    category: "string",
    tags: "string[]",
    draft: "bool",
    created_at: "string",
    likes_count: "string",
    user_liked: "string",
    bookmarked: "bool",
    schemaType: "string",
    src: "string"
  }
};

Bookmark.schema = {
  name: "Bookmark",
  primaryKey: "id",
  properties: {
    oid: { type: "int", indexed: true },
    id: "string",
    title: "string",
    content: "string",
    category: "string",
    tags: "string[]",
    draft: "bool",
    created_at: "string",
    likes_count: "string",
    user_liked: "string",
    bookmarked: "bool",
    schemaType: "string",
    src: "string"
  }
};

export default new Realm({
  schema: [
    User,
    Pagination,
    Education,
    Information,
    Opportunities,
    CurrentPrices,
    Bookmark
  ],
  schemaVersion: 5
});
