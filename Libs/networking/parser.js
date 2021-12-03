bufferReader = function(data) {
    let p = {};

    //Returns: Byte
    p.readByte = function() {
        return data.shift();
    }

    //Returns the amount of bytes from the buffer
    p.readBytes = function(amount) {
        let data = [];
        for(let i = 0; i < amount; i++) {
            data[i] = p.readByte();
        }
        return data;
    }

    //Return: 32-Bit Integer
    p.readInt = function() {
        let bytedata = p.readBytes(4);
        //console.log(bytedata);
        bytedata.reverse();
        return Buffer.from(bytedata).readInt32BE();
    }

    //Return: Unsigned 32-Bit Integer
    p.readUInt = function() {
        let bytedata = p.readBytes(4);
        bytedata.reverse();
        return Buffer.from(bytedata).readUInt32BE();
    }

    //Returns: Character
    p.readChar = function() {
        return String.fromCharCode(p.readUShort());
    }

    //Returns: String
    p.readString = function() {
        let size = p.readInt();
        //console.log("string size: " + size);
        let msg = "";
        while(size>0) {
            size--;
            msg = msg + p.readChar();
        }
        return msg;
    }

    //Retun: Unsigned 16-Bit Short
    p.readUShort = function() {
        let bytedata = p.readBytes(2);
        bytedata.reverse();
        return Buffer.from(bytedata).readUInt16BE();
    }
    
    return p;
}

bufferWriter = function() {

    

    let data = [];

    let w = {};
    
    let insert = function(val) {data[data.length] = val}

    w.writeByte = function(val) {
        insert(val);
    }

    w.writeInt = function(val) {
        var bytes = [];
        var i = 4;
        do {
            insert(val & (255));
            val = val>>8;
            --i
        } while ( i )
        return bytes;
    }
    
    w.writeShort = function(val) {
        var bytes = [];
        var i = 2;
        do {
            insert(val & (255));
            val = val>>8;
            --i
        } while ( i )
        return bytes;
    }

    w.writeString = function(val) {
        w.writeInt(val.length);
        for(var i = 0; i < val.length; i++) {
            w.writeShort(val.charCodeAt(i)); // Writing the character
        }
    }

    w.getData = function() {
        return data;
    }


    return w;
}