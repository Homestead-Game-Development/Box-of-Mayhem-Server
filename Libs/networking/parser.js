bufferReader = function(data) {
    let p = {};

    
    //Returns all the data
    p.getData = function() {
        return data;
    }

    //Returns: Byte
    p.readByte = function() {
        return data.shift();
    }

    //Returns the amount of bytes from the buffer
    p.readBytesRaw = function(amount) {
        let data = [];
        for(let i = 0; i < amount; i++) {
            data[i] = p.readByte();
        }
        return data;
    }

    //Return: 32-Bit Integer
    p.readInt = function() {
        let bytedata = p.readBytesRaw(4);
        //console.log(bytedata);
        bytedata.reverse();
        return Buffer.from(bytedata).readInt32BE();
    }

    //Return: Unsigned 32-Bit Integer
    p.readUInt = function() {
        let bytedata = p.readBytesRaw(4);
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

    //Returns: Unsigned 16-Bit Short
    p.readUShort = function() {
        let bytedata = p.readBytesRaw(2);
        bytedata.reverse();
        return Buffer.from(bytedata).readUInt16BE();
    }

    //Returns: Float
    p.readFloat = function() {
        let bytedata = p.readBytesRaw(4);
        bytedata.reverse();
        return Buffer.from(bytedata).readFloatBE();
    }
    
    return p;
}

bufferWriter = function() {

    

    let data = [];

    let w = {};
    
    let insert = function(val) {data[data.length] = val}

    w.writeBytes = function(valArr) {
        for(let index = 0; index < valArr.length; index++) {
            w.writeByte(valArr[index]);
        }
    }

    w.writeByte = function(val) {
        insert(val);
    }

    w.writeInt = function(val) {
        var i = 4;
        do {
            insert(val & (255));
            val = val>>8;
            --i
        } while ( i )
    }
    
    w.writeShort = function(val) {
        var i = 2;
        do {
            insert(val & (255));
            val = val>>8;
            --i
        } while ( i )
    }

    w.writeFloat = function(val) {
        buf = Buffer.allocUnsafe(4);
        buf.writeFloatBE(val, 0);
        buf.reverse();
        
        var arrByte = Uint8Array.from(buf);
        arrByte.forEach((val) => {
            insert(val);
        });
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