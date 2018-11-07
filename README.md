# LifeGamer RTS Game Render

Using [pixijs](http://www.pixijs.com/) to render the whole RTS game appearance.

## Appearance

Divide main page into multi sections.

![](https://i.imgur.com/aQyDEXa.jpg)

- Main Map Render
- Mini Map Render
- Options (a,b)
    - (a) button for changing room to chat room
    - (b) button for changing room to server message room
- Chat/Server message room
- User status
- Menu: contains **build**, **destory**, **move**, **home** four buttons
    - build: using for building a building
    - destory: using for destorying a building
    - move: using for moving people from one chunk to another chunk
    - home: using for moving field of version to user's home chunk

## Usage

### Main Map Render

- Render 3*3 chunks
> One chunk contains 16*16 space
- Rerender 9 chunks if getting map data from backend server

### User status

- Showing user's money, energy, and soldier
- Replace number when getting data from server

### Mini Map Render

- Render all data but with mask, user can only see part of them
- The color of block shows its environment
- The color of block's border shows its belongs
    - none, yours, others, limited
- User can using mouse to move mini map mask position
    - moving speed and direction according to mouse position

### Chat/Server Message Room

#### Chat Room

- Showing message when getting data from server
- Click enter or send button to transfer message to server

#### Server Message Room

- Showing server message when getting data from server
- server message would save in server

### Menu

Contains build, destory, move, and home button

#### Build

- Steps:
    - click button and select which building wonna to build
    - select the space on the main map where to build
        - green means user can build
        - red means user cannot build
    - sending request to server asking for updating

#### Destroy

- Steps:
    - click button
    - click the building on the main map to destory
        - when hover the building, it'll render the border let user seeing
    - sending request to server asking for updating

#### Move

- Steps:
    - click button
    - click chunk in mini map to select where the user moving solider from
    - using scroll bar to change number
    - click chunk in mini map to select where the user moving solider to
    - sending request to server asking for updating

#### Home

- click to move center chunk of main map postion to the place user first occupied

## Directory

- /src - putting front-end file here
    - /source
        - /img
        - /media
    - /mainMap
    - /miniMap
    - /status
    - /room
    - /menu
- /backend - putting back-end file here
- app.js - server enter point
