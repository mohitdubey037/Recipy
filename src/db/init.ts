require("dotenv").config();

import {
  Recipe,
  RecipeTag,
  Tag,
  Review,
  Ingredient,
  RecipeIngredient,
  Category,
  Post,
  User,
  Otp
} from "./models";

// const isDev = process.env.NODE_ENV === "development";
// const isTest = process.env.NODE_ENV !== "test";

const dbInit = () =>
  Promise.all([
    Tag.sync(/* { alter: isDev || isTest } */),
    Ingredient.sync(/* { alter: isDev || isTest } */),
    Recipe.sync(/* { alter: isDev || isTest } */),
    Review.sync(/* { alter: isDev || isTest } */),
    RecipeTag.sync(/* { alter: isDev || isTest } */),
    RecipeIngredient.sync(/* { alter: isDev || isTest } */),
    RecipeIngredient.sync(/* { alter: isDev || isTest } */),
    Category.sync(/* { alter: isDev || isTest } */),
    Post.sync(/* { alter: true } */),
    User.sync(/* { alter: true } */),
    Otp.sync(/* { alter: true } */)
  ]);

export default dbInit;
