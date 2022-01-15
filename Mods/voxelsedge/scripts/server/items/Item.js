ItemDatabase = {}

Item = class {
    constructor(itemID) {
        if(ItemDatabase[itemID]) { console.error("The item id is already registered: " + itemID); }
        else {
            console.log("Craeting item: " + itemID);
        }
        this.data = {};
        this.data.itemID = itemID; // The item ID

        //Here we are configuring the item itself
        this.data.displayName = "Display Name";//The name of the item displayed to the player TODO: Not yet implemented
        this.data.description = []; // An array of strings to display to the client as the item's "Lore" TODO: Not yet implemented
        this.data.image = "item.default.png"; // The default texture to use for the item TODO: Not yet implemented
        this.data.count = 1; // How many items are in this stack TODO: Not yet implemented
        this.data.maxStack = 64; // The max stack size TODO: Not yet implemented
    }

    get id() {
        return this.data.itemID;
    }

    //Writing the item to the client
    //Note: There is no readFromBuffer, because the client should NEVER control the items sent to the server
    writeToBuffer(buffer) {
        buffer.writeInt(this.data.itemID);
        buffer.writeString(this.data.displayName);
        buffer.writeString(this.data.image);
        buffer.writeInt(this.data.count);
        buffer.writeInt(this.data.maxStack);
    }
    
    onPlayerLeftClick(player) {} // TODO: Not yet implemented
    onPlayerRightClick(player) {} // TODO: Not yet implemented
    onPlayerInventoryOpen(player) {} // TODO: Not yet implemented
}

let defaultItem = new Item(0);
defaultItem.data.displayName = "NULL ITEM";