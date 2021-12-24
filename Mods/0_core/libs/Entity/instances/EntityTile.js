
EntityTile = class extends Entity {
    constructor() {
        super();
        console.log("EntityTile created")
    }

    /* List of events the player can subscribe to */
    onPlayerRightClick(player) { }
    onPlayerLeftClick(player) { }
}