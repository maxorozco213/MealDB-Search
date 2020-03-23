# MealDB-Search-CLI
Midterm project for CS4220 - Spring 2020

[![MealDB Logo](mealdb.png)](https://themealdb.com/api.php "The MealDB API")

## Description

CLI application that utilizes the above API to allow users to find meals and how to cook them. User can search for meals directly by ID/Name or start by searching a specific category or meal. User will be walked through the process if they begin by searching *all* categories

To start use `git clone` then `npm install` in both */mealdb-search* and */foodsearch* directories.

## Available commands 

Usage: `node cli.js <cmd> [options]`
 - `all` - Get all the available food categories
 - `category` - Search for a category by name **[-n]**
 - `meal` - Search for a meal by ID **[-i]** or by name **[-n]**

## Available options

 - `i` (identification)
 - `n` (name)
 - `d` (description)
