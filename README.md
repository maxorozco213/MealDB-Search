# MealDB-Search-CLI
Midterm project for CS4220 - Spring 2020

<a title="The MealDB API" href="https://themealdb.com/api.php" target="_blank">![MealDB Logo](mealdb.png)</a>

## Description

CLI application that utilizes the above API to allow users to find meals and how to cook them. User can search for meals directly by ID/Name or start by searching a specific category or meal. User will be walked through the process if they begin by searching *all* categories

To start use `git clone` then `npm install` in both */mealdb-search* and */foodsearch* directories.

## Available commands 

#### Usage: `node cli.js <cmd> [cmd] [options]`
 - `search` - Get all the available food categories
   - `ingredient` - Get all the available meals with a given ingredient
   - `area` - Get all available meals that originate from a given country
 - `category` - Search for a category by name
 - `meal` - Search for a meal by ID **[-i]** or by name **[-n]**

#### Examples
- `node cli.js search area American` </br>
  Output:</br>
  >All American food</br>
  >**ID** **NAME**</br>
  >52855 Banana Pancakes</br>
  >52995 BBQ Pork Sloppy Joes with Pickled Onion & Sweet Potato Wedges</br>
  >52812 Beef Brisket Pot Roast</br>
  >52818 Chicken Fajita Mac and Cheese</br>
  >...

- `node cli.js meal -i 52772 -d` </br>
  
  Output:</br>
  > **ID:** 52772
  > **Name:** Teriyaki Chicken Casserole</br>
  > **Origin:** Japanese</br>
  > **Youtube Tutorial:** https://www.youtube.com/watch?v=4aZr5hZXP_s</br>
  > **Cooking instructions:**
  > Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray. </br>
  >...


## Available options

 - `i` (identification)
 - `n` (name)
 - `d` (description)
