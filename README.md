# Palette Search

Color palette inspiration from directly within Slack

![alt tag](http://i62.tinypic.com/2rnyl34.gif)

<h2>How To Use:</h2>
**Build palettes matching a key word**
- Use the format `/palette <search term>` to build a list of palettes based on any given key term. 
```
/palette forest
```

**Build palettes containing a specific color**
- Use the format `/palette <HEX value>` or `/palette <HEX value>, <HEX value>` to build a list of palettes that includes up to five HEX colors of your choosing. 
```
/palette #3B5998, #6D84B4
```

The questions will be shown on the same channel that the command was entered and only visible to you.
 
<h2> How To Install On Slack:</h2>
1. As an admin, go to your team's Slack channel
2. Click on your teams name, then on <b>Configure Integrations</b>
3. Scroll to the very bottom of the page, then click on <b>DIY Integrations & Customizations section</b>
4. Click on <b>Add</b> next to <b>Slash Commands</b>
  - URL: ```https://alecortega-palettable.herokuapp.com/palette```
  - Command: ```/palette```
  - Method: ```POST```
  - Usage Hint ```[search term]```
