# 2248-game-assignment
https://www.crazygames.com/game/2248

The goal of this exercise is for you to develop a small mobile game using Expo and React-Native. You will be evaluated based on the following criteria, ranked from most important to least important 

- Implementation choices / Design / Architecture
- Code Quality
- Is the game working

UI, visual effects, transitions… are optional and will not be evaluated.

Once you have completed the exercise, create a ZIP file containing all the sources and send it to the evaluator. You also need to build the expo app and publish it for testing (we will test on actual mobile devices or emulator!).

# 2248

<aside>
🎮 2248 is a game that consists of a 4x6 grid of tiles containing numbers (powers of 2). The player can merge multiple tiles with the same number (either horizontally, vertically or diagonally) to create a tile containing their sum and gain score points. The goal is to have the highest score.

</aside>

- [ ]  Create a managed Expo Project
- [ ]  Display a 4x6 grid
- [ ]  At the start of the game, fill every tile with a random power of 2 (either 2, 4 or 8)
- [ ]  Implement tile merging:
    - The player can create a “path” between multiple tiles that are adjacent (horizontally, vertically or diagonally) and that contain the same number, by pressing a tile and dragging across the tiles to create a path
    - The player can remove the last tiles from the path by dragging back to the previous tile
    - When the player stops the drag, the tiles in the path are merged into a single tile, located at the end of the path, containing the sum of all tiles
    - If the sum of the tiles does not equal a power of 2, the resulting tile will be rounded **down** to the nearest power of 2
    - Every other tile in the path will be replaced by a random power of 2 (either 2, 4 or 8)

![COMPIL.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1dd5f642-357b-48db-94d4-ef947e232f4a/COMPIL.png)

- [ ]  Add a score counter: when the player creates a new tile by merging, the score increases by $(\text{number of tiles merged} - 2) \times \text{original tile value}$, so in the example above where you merge 5 tiles of value 4, you gain (5 - 2) * 4 = 12 points
- [ ]  When the player creates a tile with value 2048 or greater, display a success message
- [ ]  After the success message, give the opportunity to the player to start a new game, resetting the grid and score
- [ ]  Display the highest score ever reached on the device (including previous games)
- [ ]  Store the current score, move counter and high score in Secure Store so the game can be exited and resumed easily

---

- [ ]  Build and publish the app with Expo
- [ ]  Create a **very small** readme explaining how to start the app locally and compress all the sources into a ZIP file

# BONUS

Some bonus if you had fun with the game and want some ideas to go further for yourself. These tasks are obviously optional: don’t do them if you haven’t already completed the tasks above.

- [ ]  Add “gravity”: the tiles destroyed in a path are replaced by the ones above, new tiles should appear from the top
- [ ]  Add a “shuffle” button that shuffles the board
- [ ]  Add shuffle tokens:
    - Pressing the shuffle button consumes one shuffle token
    - When the user has no shuffle token left, the shuffle button is disabled
    - Every time a user wins a game (creates the 2048 tile) he receives one shuffle token
- [ ]  Makes the app look nice and fun 😊
