# LifeGamer RTS Game Render

Using [pixijs](http://www.pixijs.com/) to render the whole RTS game appearance.

## Appearance

Divide main page into multi sections.

![](https://i.imgur.com/vkQJ5vc.png)

- Main Map Render
- Mini Map Render
- Room
- User status
- Menu: contains **build**, **move**, **home** four buttons
    - build: using for building a building
    - move: using for moving population from one chunk to another chunk
    - home: using for moving field of version to user's home chunk

## Usage

### Main Map Render

- Render 4*2 chunks
> One chunk contains 16*16 space
- Rerender 8 chunks if getting map data from backend server
- **Press Q can show map info**

### User status

- Showing user's money, energy, and soldier
- Replace number when getting data from server

### Mini Map Render

- Render all data but with mask, user can only see part of them
- The color of block shows its environment
- The upper block color shows the belonger
    - none: no color
    - yours: green
    - others: red
- User can drag and drop to move mini map mask position

### Room

- Showing message/server message when getting data from server
- Click enter or send button to transfer message to server
- server message would save in server

### Menu

Contains build, move, and home button

#### Build

- Steps:
    - click button and select which building wonna to build
    - select the space on the main map where to build
        - green means user can build
        - red means user cannot build
    - sending request to server asking for updating

#### Move

- Steps:
    - click button
    - click from button
    - click chunk in mini map to select where the user moving solider from
    - click to button
    - click chunk in mini map to select where the user moving solider to
    - click -, + button to set the amount of population to move
    - click go button sending request to server asking for updating

> user can drag and drop minimap to see other space

#### Home

- click to move center chunk of main map postion to the place user first occupied

## Directory

- /src
    - /source
        - /img
        - /media
        - /fonts
    - /mainMap
    - /miniMap
    - /GameData
    - /status
    - /comm
    - /building
    - /room
    - /menu
- app.js - server enter point
