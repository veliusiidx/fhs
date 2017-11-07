This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

fhs is a calculator made to calculate a player's HS and green number usage for the game Beatmania IIDX (or called IIDX for short). The game features a cover system and a floating point high speed usage in game, and a green number system to calculate how fast the notes scroll on the screen. The formula to calculate the green number is 174000/(bpm * high speed * (1000/(1000 - white number - lift)). This is critical for players as IIDX is a very fast, precise game and everyone's reaction speeds differ so it's important that everyone gets the maximum comfort out of reading the notes. However, IIDX doesn't do a good job at syncing a player's green number where there are BPM changes. This is where the calculator comes into play. Enter all of your customized settings you use in game, and the start BPM and the main BPM number. The calculator will spit out which green number to trigger FHS mode so you will be able to play at your main green number when the song eventually speeds back up to it's main BPM. The biggest culprit of this in game is Max 300 where the song starts at 50 bpm for less than a second and speeds up to 300 for the rest of the song. This is horrible as when the song is loading, if you trigger FHS mode, you can only use to sync with 50 BPM and not 300 BPM, the main BPM of the song. If you read at 285 green number and used that number at the beginning of Max 300, the song would speed up to impossible to react speeds at 300 BPM. In case, players don't need FHS and want to mess around further, a normal mode option is added which instead lets you calculate the green number instead of your HS number.

A live demo can be found at http://www.lr2keyway.com/fhs
