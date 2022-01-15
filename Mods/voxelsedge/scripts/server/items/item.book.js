
ItemBook = class extends Item {
    constructor() {
        super(100);
        this.data.image = "book_006.png"; // The default texture to use for the item
        this.data.displayName = "Basic Book"; // Setting the books name
    }
}

new ItemBook();