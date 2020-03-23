# MealDB-Search-CLI
Midterm project for CS4220 - Spring 2020

<a title="The MealDB API" href="https://themealdb.com/api.php" target="_blank">![MealDB Logo](mealdb.png)</a>

## Description

CLI application that utilizes the above API to allow users to find meals and how to cook them. User can search for meals directly by ID/Name or start by searching a specific category or meal. User will be walked through the process if they begin by searching *all* categories

To start use `git clone` then `npm install` in both */mealdb-search* and */foodsearch* directories.

## Available commands 

Usage: `node cli.js <cmd> [options]`
 - `search` - Get all the available food categories
   - `ingredient` - Get all the available meals with a given ingredient
   - `area` - Get all available meals that originate from a given country
 - `category` - Search for a category by name
 - `meal` - Search for a meal by ID **[-i]** or by name **[-n]**

## Available options

 - `i` (identification)
 - `n` (name)
 - `d` (description)
