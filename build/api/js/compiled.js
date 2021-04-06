/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const errmsg = $root.errmsg = (() => {

    /**
     * Namespace errmsg.
     * @exports errmsg
     * @namespace
     */
    const errmsg = {};

    errmsg.Error = (function() {

        /**
         * Properties of an Error.
         * @memberof errmsg
         * @interface IError
         * @property {string|null} [statusText] Error statusText
         * @property {string|null} [message] Error message
         */

        /**
         * Constructs a new Error.
         * @memberof errmsg
         * @classdesc Represents an Error.
         * @implements IError
         * @constructor
         * @param {errmsg.IError=} [properties] Properties to set
         */
        function Error(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Error statusText.
         * @member {string} statusText
         * @memberof errmsg.Error
         * @instance
         */
        Error.prototype.statusText = "";

        /**
         * Error message.
         * @member {string} message
         * @memberof errmsg.Error
         * @instance
         */
        Error.prototype.message = "";

        /**
         * Creates a new Error instance using the specified properties.
         * @function create
         * @memberof errmsg.Error
         * @static
         * @param {errmsg.IError=} [properties] Properties to set
         * @returns {errmsg.Error} Error instance
         */
        Error.create = function create(properties) {
            return new Error(properties);
        };

        /**
         * Encodes the specified Error message. Does not implicitly {@link errmsg.Error.verify|verify} messages.
         * @function encode
         * @memberof errmsg.Error
         * @static
         * @param {errmsg.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.statusText != null && Object.hasOwnProperty.call(message, "statusText"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.statusText);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link errmsg.Error.verify|verify} messages.
         * @function encodeDelimited
         * @memberof errmsg.Error
         * @static
         * @param {errmsg.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @function decode
         * @memberof errmsg.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {errmsg.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.errmsg.Error();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.statusText = reader.string();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof errmsg.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {errmsg.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Error message.
         * @function verify
         * @memberof errmsg.Error
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Error.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.statusText != null && message.hasOwnProperty("statusText"))
                if (!$util.isString(message.statusText))
                    return "statusText: string expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof errmsg.Error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {errmsg.Error} Error
         */
        Error.fromObject = function fromObject(object) {
            if (object instanceof $root.errmsg.Error)
                return object;
            let message = new $root.errmsg.Error();
            if (object.statusText != null)
                message.statusText = String(object.statusText);
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof errmsg.Error
         * @static
         * @param {errmsg.Error} message Error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Error.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.statusText = "";
                object.message = "";
            }
            if (message.statusText != null && message.hasOwnProperty("statusText"))
                object.statusText = message.statusText;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this Error to JSON.
         * @function toJSON
         * @memberof errmsg.Error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Error;
    })();

    return errmsg;
})();

export const delivery = $root.delivery = (() => {

    /**
     * Namespace delivery.
     * @exports delivery
     * @namespace
     */
    const delivery = {};

    delivery.LatLng = (function() {

        /**
         * Properties of a LatLng.
         * @memberof delivery
         * @interface ILatLng
         * @property {number|null} [lat] LatLng lat
         * @property {number|null} [lng] LatLng lng
         */

        /**
         * Constructs a new LatLng.
         * @memberof delivery
         * @classdesc Represents a LatLng.
         * @implements ILatLng
         * @constructor
         * @param {delivery.ILatLng=} [properties] Properties to set
         */
        function LatLng(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LatLng lat.
         * @member {number} lat
         * @memberof delivery.LatLng
         * @instance
         */
        LatLng.prototype.lat = 0;

        /**
         * LatLng lng.
         * @member {number} lng
         * @memberof delivery.LatLng
         * @instance
         */
        LatLng.prototype.lng = 0;

        /**
         * Creates a new LatLng instance using the specified properties.
         * @function create
         * @memberof delivery.LatLng
         * @static
         * @param {delivery.ILatLng=} [properties] Properties to set
         * @returns {delivery.LatLng} LatLng instance
         */
        LatLng.create = function create(properties) {
            return new LatLng(properties);
        };

        /**
         * Encodes the specified LatLng message. Does not implicitly {@link delivery.LatLng.verify|verify} messages.
         * @function encode
         * @memberof delivery.LatLng
         * @static
         * @param {delivery.ILatLng} message LatLng message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LatLng.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.lat);
            if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.lng);
            return writer;
        };

        /**
         * Encodes the specified LatLng message, length delimited. Does not implicitly {@link delivery.LatLng.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.LatLng
         * @static
         * @param {delivery.ILatLng} message LatLng message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LatLng.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LatLng message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.LatLng
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.LatLng} LatLng
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LatLng.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.LatLng();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.lat = reader.double();
                    break;
                case 2:
                    message.lng = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LatLng message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.LatLng
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.LatLng} LatLng
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LatLng.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LatLng message.
         * @function verify
         * @memberof delivery.LatLng
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LatLng.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lat != null && message.hasOwnProperty("lat"))
                if (typeof message.lat !== "number")
                    return "lat: number expected";
            if (message.lng != null && message.hasOwnProperty("lng"))
                if (typeof message.lng !== "number")
                    return "lng: number expected";
            return null;
        };

        /**
         * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.LatLng
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.LatLng} LatLng
         */
        LatLng.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.LatLng)
                return object;
            let message = new $root.delivery.LatLng();
            if (object.lat != null)
                message.lat = Number(object.lat);
            if (object.lng != null)
                message.lng = Number(object.lng);
            return message;
        };

        /**
         * Creates a plain object from a LatLng message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.LatLng
         * @static
         * @param {delivery.LatLng} message LatLng
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LatLng.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.lat = 0;
                object.lng = 0;
            }
            if (message.lat != null && message.hasOwnProperty("lat"))
                object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
            if (message.lng != null && message.hasOwnProperty("lng"))
                object.lng = options.json && !isFinite(message.lng) ? String(message.lng) : message.lng;
            return object;
        };

        /**
         * Converts this LatLng to JSON.
         * @function toJSON
         * @memberof delivery.LatLng
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LatLng.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LatLng;
    })();

    delivery.VehicleCapacity = (function() {

        /**
         * Properties of a VehicleCapacity.
         * @memberof delivery
         * @interface IVehicleCapacity
         * @property {number|null} [weight] VehicleCapacity weight
         * @property {number|null} [length] VehicleCapacity length
         * @property {number|null} [width] VehicleCapacity width
         * @property {number|null} [height] VehicleCapacity height
         */

        /**
         * Constructs a new VehicleCapacity.
         * @memberof delivery
         * @classdesc Represents a VehicleCapacity.
         * @implements IVehicleCapacity
         * @constructor
         * @param {delivery.IVehicleCapacity=} [properties] Properties to set
         */
        function VehicleCapacity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VehicleCapacity weight.
         * @member {number} weight
         * @memberof delivery.VehicleCapacity
         * @instance
         */
        VehicleCapacity.prototype.weight = 0;

        /**
         * VehicleCapacity length.
         * @member {number} length
         * @memberof delivery.VehicleCapacity
         * @instance
         */
        VehicleCapacity.prototype.length = 0;

        /**
         * VehicleCapacity width.
         * @member {number} width
         * @memberof delivery.VehicleCapacity
         * @instance
         */
        VehicleCapacity.prototype.width = 0;

        /**
         * VehicleCapacity height.
         * @member {number} height
         * @memberof delivery.VehicleCapacity
         * @instance
         */
        VehicleCapacity.prototype.height = 0;

        /**
         * Creates a new VehicleCapacity instance using the specified properties.
         * @function create
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {delivery.IVehicleCapacity=} [properties] Properties to set
         * @returns {delivery.VehicleCapacity} VehicleCapacity instance
         */
        VehicleCapacity.create = function create(properties) {
            return new VehicleCapacity(properties);
        };

        /**
         * Encodes the specified VehicleCapacity message. Does not implicitly {@link delivery.VehicleCapacity.verify|verify} messages.
         * @function encode
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {delivery.IVehicleCapacity} message VehicleCapacity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VehicleCapacity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.weight);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.length);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.height);
            return writer;
        };

        /**
         * Encodes the specified VehicleCapacity message, length delimited. Does not implicitly {@link delivery.VehicleCapacity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {delivery.IVehicleCapacity} message VehicleCapacity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VehicleCapacity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VehicleCapacity message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.VehicleCapacity} VehicleCapacity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VehicleCapacity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.VehicleCapacity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.weight = reader.int32();
                    break;
                case 2:
                    message.length = reader.int32();
                    break;
                case 3:
                    message.width = reader.int32();
                    break;
                case 4:
                    message.height = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VehicleCapacity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.VehicleCapacity} VehicleCapacity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VehicleCapacity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VehicleCapacity message.
         * @function verify
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VehicleCapacity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight))
                    return "weight: integer expected";
            if (message.length != null && message.hasOwnProperty("length"))
                if (!$util.isInteger(message.length))
                    return "length: integer expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            return null;
        };

        /**
         * Creates a VehicleCapacity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.VehicleCapacity} VehicleCapacity
         */
        VehicleCapacity.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.VehicleCapacity)
                return object;
            let message = new $root.delivery.VehicleCapacity();
            if (object.weight != null)
                message.weight = object.weight | 0;
            if (object.length != null)
                message.length = object.length | 0;
            if (object.width != null)
                message.width = object.width | 0;
            if (object.height != null)
                message.height = object.height | 0;
            return message;
        };

        /**
         * Creates a plain object from a VehicleCapacity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.VehicleCapacity
         * @static
         * @param {delivery.VehicleCapacity} message VehicleCapacity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VehicleCapacity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.weight = 0;
                object.length = 0;
                object.width = 0;
                object.height = 0;
            }
            if (message.weight != null && message.hasOwnProperty("weight"))
                object.weight = message.weight;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = message.length;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            return object;
        };

        /**
         * Converts this VehicleCapacity to JSON.
         * @function toJSON
         * @memberof delivery.VehicleCapacity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VehicleCapacity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VehicleCapacity;
    })();

    delivery.GoodsMetadata = (function() {

        /**
         * Properties of a GoodsMetadata.
         * @memberof delivery
         * @interface IGoodsMetadata
         * @property {string|null} [name] GoodsMetadata name
         * @property {number|null} [weight] GoodsMetadata weight
         * @property {number|null} [length] GoodsMetadata length
         * @property {number|null} [width] GoodsMetadata width
         * @property {number|null} [height] GoodsMetadata height
         */

        /**
         * Constructs a new GoodsMetadata.
         * @memberof delivery
         * @classdesc Represents a GoodsMetadata.
         * @implements IGoodsMetadata
         * @constructor
         * @param {delivery.IGoodsMetadata=} [properties] Properties to set
         */
        function GoodsMetadata(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GoodsMetadata name.
         * @member {string} name
         * @memberof delivery.GoodsMetadata
         * @instance
         */
        GoodsMetadata.prototype.name = "";

        /**
         * GoodsMetadata weight.
         * @member {number} weight
         * @memberof delivery.GoodsMetadata
         * @instance
         */
        GoodsMetadata.prototype.weight = 0;

        /**
         * GoodsMetadata length.
         * @member {number} length
         * @memberof delivery.GoodsMetadata
         * @instance
         */
        GoodsMetadata.prototype.length = 0;

        /**
         * GoodsMetadata width.
         * @member {number} width
         * @memberof delivery.GoodsMetadata
         * @instance
         */
        GoodsMetadata.prototype.width = 0;

        /**
         * GoodsMetadata height.
         * @member {number} height
         * @memberof delivery.GoodsMetadata
         * @instance
         */
        GoodsMetadata.prototype.height = 0;

        /**
         * Creates a new GoodsMetadata instance using the specified properties.
         * @function create
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {delivery.IGoodsMetadata=} [properties] Properties to set
         * @returns {delivery.GoodsMetadata} GoodsMetadata instance
         */
        GoodsMetadata.create = function create(properties) {
            return new GoodsMetadata(properties);
        };

        /**
         * Encodes the specified GoodsMetadata message. Does not implicitly {@link delivery.GoodsMetadata.verify|verify} messages.
         * @function encode
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {delivery.IGoodsMetadata} message GoodsMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GoodsMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weight);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.length);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.height);
            return writer;
        };

        /**
         * Encodes the specified GoodsMetadata message, length delimited. Does not implicitly {@link delivery.GoodsMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {delivery.IGoodsMetadata} message GoodsMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GoodsMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GoodsMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.GoodsMetadata} GoodsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GoodsMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.GoodsMetadata();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.weight = reader.int32();
                    break;
                case 3:
                    message.length = reader.int32();
                    break;
                case 4:
                    message.width = reader.int32();
                    break;
                case 5:
                    message.height = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GoodsMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.GoodsMetadata} GoodsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GoodsMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GoodsMetadata message.
         * @function verify
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GoodsMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight))
                    return "weight: integer expected";
            if (message.length != null && message.hasOwnProperty("length"))
                if (!$util.isInteger(message.length))
                    return "length: integer expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            return null;
        };

        /**
         * Creates a GoodsMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.GoodsMetadata} GoodsMetadata
         */
        GoodsMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.GoodsMetadata)
                return object;
            let message = new $root.delivery.GoodsMetadata();
            if (object.name != null)
                message.name = String(object.name);
            if (object.weight != null)
                message.weight = object.weight | 0;
            if (object.length != null)
                message.length = object.length | 0;
            if (object.width != null)
                message.width = object.width | 0;
            if (object.height != null)
                message.height = object.height | 0;
            return message;
        };

        /**
         * Creates a plain object from a GoodsMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.GoodsMetadata
         * @static
         * @param {delivery.GoodsMetadata} message GoodsMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GoodsMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.weight = 0;
                object.length = 0;
                object.width = 0;
                object.height = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.weight != null && message.hasOwnProperty("weight"))
                object.weight = message.weight;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = message.length;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            return object;
        };

        /**
         * Converts this GoodsMetadata to JSON.
         * @function toJSON
         * @memberof delivery.GoodsMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GoodsMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GoodsMetadata;
    })();

    delivery.TimeWindow = (function() {

        /**
         * Properties of a TimeWindow.
         * @memberof delivery
         * @interface ITimeWindow
         * @property {google.protobuf.ITimestamp|null} [startedAt] TimeWindow startedAt
         * @property {google.protobuf.ITimestamp|null} [endedAt] TimeWindow endedAt
         */

        /**
         * Constructs a new TimeWindow.
         * @memberof delivery
         * @classdesc Represents a TimeWindow.
         * @implements ITimeWindow
         * @constructor
         * @param {delivery.ITimeWindow=} [properties] Properties to set
         */
        function TimeWindow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TimeWindow startedAt.
         * @member {google.protobuf.ITimestamp|null|undefined} startedAt
         * @memberof delivery.TimeWindow
         * @instance
         */
        TimeWindow.prototype.startedAt = null;

        /**
         * TimeWindow endedAt.
         * @member {google.protobuf.ITimestamp|null|undefined} endedAt
         * @memberof delivery.TimeWindow
         * @instance
         */
        TimeWindow.prototype.endedAt = null;

        /**
         * Creates a new TimeWindow instance using the specified properties.
         * @function create
         * @memberof delivery.TimeWindow
         * @static
         * @param {delivery.ITimeWindow=} [properties] Properties to set
         * @returns {delivery.TimeWindow} TimeWindow instance
         */
        TimeWindow.create = function create(properties) {
            return new TimeWindow(properties);
        };

        /**
         * Encodes the specified TimeWindow message. Does not implicitly {@link delivery.TimeWindow.verify|verify} messages.
         * @function encode
         * @memberof delivery.TimeWindow
         * @static
         * @param {delivery.ITimeWindow} message TimeWindow message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TimeWindow.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.startedAt != null && Object.hasOwnProperty.call(message, "startedAt"))
                $root.google.protobuf.Timestamp.encode(message.startedAt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.endedAt != null && Object.hasOwnProperty.call(message, "endedAt"))
                $root.google.protobuf.Timestamp.encode(message.endedAt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TimeWindow message, length delimited. Does not implicitly {@link delivery.TimeWindow.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.TimeWindow
         * @static
         * @param {delivery.ITimeWindow} message TimeWindow message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TimeWindow.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TimeWindow message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.TimeWindow
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.TimeWindow} TimeWindow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TimeWindow.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.TimeWindow();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.startedAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.endedAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TimeWindow message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.TimeWindow
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.TimeWindow} TimeWindow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TimeWindow.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TimeWindow message.
         * @function verify
         * @memberof delivery.TimeWindow
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TimeWindow.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.startedAt != null && message.hasOwnProperty("startedAt")) {
                let error = $root.google.protobuf.Timestamp.verify(message.startedAt);
                if (error)
                    return "startedAt." + error;
            }
            if (message.endedAt != null && message.hasOwnProperty("endedAt")) {
                let error = $root.google.protobuf.Timestamp.verify(message.endedAt);
                if (error)
                    return "endedAt." + error;
            }
            return null;
        };

        /**
         * Creates a TimeWindow message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.TimeWindow
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.TimeWindow} TimeWindow
         */
        TimeWindow.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.TimeWindow)
                return object;
            let message = new $root.delivery.TimeWindow();
            if (object.startedAt != null) {
                if (typeof object.startedAt !== "object")
                    throw TypeError(".delivery.TimeWindow.startedAt: object expected");
                message.startedAt = $root.google.protobuf.Timestamp.fromObject(object.startedAt);
            }
            if (object.endedAt != null) {
                if (typeof object.endedAt !== "object")
                    throw TypeError(".delivery.TimeWindow.endedAt: object expected");
                message.endedAt = $root.google.protobuf.Timestamp.fromObject(object.endedAt);
            }
            return message;
        };

        /**
         * Creates a plain object from a TimeWindow message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.TimeWindow
         * @static
         * @param {delivery.TimeWindow} message TimeWindow
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TimeWindow.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.startedAt = null;
                object.endedAt = null;
            }
            if (message.startedAt != null && message.hasOwnProperty("startedAt"))
                object.startedAt = $root.google.protobuf.Timestamp.toObject(message.startedAt, options);
            if (message.endedAt != null && message.hasOwnProperty("endedAt"))
                object.endedAt = $root.google.protobuf.Timestamp.toObject(message.endedAt, options);
            return object;
        };

        /**
         * Converts this TimeWindow to JSON.
         * @function toJSON
         * @memberof delivery.TimeWindow
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TimeWindow.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TimeWindow;
    })();

    /**
     * DriverStatus enum.
     * @name delivery.DriverStatus
     * @enum {number}
     * @property {number} DRIVER_STATUS_UNDEFINED=0 DRIVER_STATUS_UNDEFINED value
     * @property {number} DRIVER_STATUS_OFFLINE=1 DRIVER_STATUS_OFFLINE value
     * @property {number} DRIVER_STATUS_AVAILABLE=2 DRIVER_STATUS_AVAILABLE value
     * @property {number} DRIVER_STATUS_SERVING=3 DRIVER_STATUS_SERVING value
     */
    delivery.DriverStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DRIVER_STATUS_UNDEFINED"] = 0;
        values[valuesById[1] = "DRIVER_STATUS_OFFLINE"] = 1;
        values[valuesById[2] = "DRIVER_STATUS_AVAILABLE"] = 2;
        values[valuesById[3] = "DRIVER_STATUS_SERVING"] = 3;
        return values;
    })();

    delivery.VehicleState = (function() {

        /**
         * Properties of a VehicleState.
         * @memberof delivery
         * @interface IVehicleState
         * @property {delivery.IVehicleCapacity|null} [vehicleCapacity] VehicleState vehicleCapacity
         * @property {Array.<delivery.IBoxItem>|null} [boxItems] VehicleState boxItems
         */

        /**
         * Constructs a new VehicleState.
         * @memberof delivery
         * @classdesc Represents a VehicleState.
         * @implements IVehicleState
         * @constructor
         * @param {delivery.IVehicleState=} [properties] Properties to set
         */
        function VehicleState(properties) {
            this.boxItems = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VehicleState vehicleCapacity.
         * @member {delivery.IVehicleCapacity|null|undefined} vehicleCapacity
         * @memberof delivery.VehicleState
         * @instance
         */
        VehicleState.prototype.vehicleCapacity = null;

        /**
         * VehicleState boxItems.
         * @member {Array.<delivery.IBoxItem>} boxItems
         * @memberof delivery.VehicleState
         * @instance
         */
        VehicleState.prototype.boxItems = $util.emptyArray;

        /**
         * Creates a new VehicleState instance using the specified properties.
         * @function create
         * @memberof delivery.VehicleState
         * @static
         * @param {delivery.IVehicleState=} [properties] Properties to set
         * @returns {delivery.VehicleState} VehicleState instance
         */
        VehicleState.create = function create(properties) {
            return new VehicleState(properties);
        };

        /**
         * Encodes the specified VehicleState message. Does not implicitly {@link delivery.VehicleState.verify|verify} messages.
         * @function encode
         * @memberof delivery.VehicleState
         * @static
         * @param {delivery.IVehicleState} message VehicleState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VehicleState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.vehicleCapacity != null && Object.hasOwnProperty.call(message, "vehicleCapacity"))
                $root.delivery.VehicleCapacity.encode(message.vehicleCapacity, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.boxItems != null && message.boxItems.length)
                for (let i = 0; i < message.boxItems.length; ++i)
                    $root.delivery.BoxItem.encode(message.boxItems[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified VehicleState message, length delimited. Does not implicitly {@link delivery.VehicleState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.VehicleState
         * @static
         * @param {delivery.IVehicleState} message VehicleState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VehicleState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VehicleState message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.VehicleState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.VehicleState} VehicleState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VehicleState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.VehicleState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.vehicleCapacity = $root.delivery.VehicleCapacity.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.boxItems && message.boxItems.length))
                        message.boxItems = [];
                    message.boxItems.push($root.delivery.BoxItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VehicleState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.VehicleState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.VehicleState} VehicleState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VehicleState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VehicleState message.
         * @function verify
         * @memberof delivery.VehicleState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VehicleState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.vehicleCapacity != null && message.hasOwnProperty("vehicleCapacity")) {
                let error = $root.delivery.VehicleCapacity.verify(message.vehicleCapacity);
                if (error)
                    return "vehicleCapacity." + error;
            }
            if (message.boxItems != null && message.hasOwnProperty("boxItems")) {
                if (!Array.isArray(message.boxItems))
                    return "boxItems: array expected";
                for (let i = 0; i < message.boxItems.length; ++i) {
                    let error = $root.delivery.BoxItem.verify(message.boxItems[i]);
                    if (error)
                        return "boxItems." + error;
                }
            }
            return null;
        };

        /**
         * Creates a VehicleState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.VehicleState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.VehicleState} VehicleState
         */
        VehicleState.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.VehicleState)
                return object;
            let message = new $root.delivery.VehicleState();
            if (object.vehicleCapacity != null) {
                if (typeof object.vehicleCapacity !== "object")
                    throw TypeError(".delivery.VehicleState.vehicleCapacity: object expected");
                message.vehicleCapacity = $root.delivery.VehicleCapacity.fromObject(object.vehicleCapacity);
            }
            if (object.boxItems) {
                if (!Array.isArray(object.boxItems))
                    throw TypeError(".delivery.VehicleState.boxItems: array expected");
                message.boxItems = [];
                for (let i = 0; i < object.boxItems.length; ++i) {
                    if (typeof object.boxItems[i] !== "object")
                        throw TypeError(".delivery.VehicleState.boxItems: object expected");
                    message.boxItems[i] = $root.delivery.BoxItem.fromObject(object.boxItems[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a VehicleState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.VehicleState
         * @static
         * @param {delivery.VehicleState} message VehicleState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VehicleState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.boxItems = [];
            if (options.defaults)
                object.vehicleCapacity = null;
            if (message.vehicleCapacity != null && message.hasOwnProperty("vehicleCapacity"))
                object.vehicleCapacity = $root.delivery.VehicleCapacity.toObject(message.vehicleCapacity, options);
            if (message.boxItems && message.boxItems.length) {
                object.boxItems = [];
                for (let j = 0; j < message.boxItems.length; ++j)
                    object.boxItems[j] = $root.delivery.BoxItem.toObject(message.boxItems[j], options);
            }
            return object;
        };

        /**
         * Converts this VehicleState to JSON.
         * @function toJSON
         * @memberof delivery.VehicleState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VehicleState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VehicleState;
    })();

    /**
     * RotationType enum.
     * @name delivery.RotationType
     * @enum {number}
     * @property {number} Rotation_Type_WLH=0 Rotation_Type_WLH value
     * @property {number} Rotation_Type_LWH=1 Rotation_Type_LWH value
     * @property {number} Rotation_Type_LHW=2 Rotation_Type_LHW value
     * @property {number} Rotation_Type_HLW=3 Rotation_Type_HLW value
     * @property {number} Rotation_Type_HWL=4 Rotation_Type_HWL value
     * @property {number} Rotation_Type_WHL=5 Rotation_Type_WHL value
     */
    delivery.RotationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Rotation_Type_WLH"] = 0;
        values[valuesById[1] = "Rotation_Type_LWH"] = 1;
        values[valuesById[2] = "Rotation_Type_LHW"] = 2;
        values[valuesById[3] = "Rotation_Type_HLW"] = 3;
        values[valuesById[4] = "Rotation_Type_HWL"] = 4;
        values[valuesById[5] = "Rotation_Type_WHL"] = 5;
        return values;
    })();

    delivery.BoxItem = (function() {

        /**
         * Properties of a BoxItem.
         * @memberof delivery
         * @interface IBoxItem
         * @property {number|null} [weight] BoxItem weight
         * @property {number|null} [width] BoxItem width
         * @property {number|null} [length] BoxItem length
         * @property {number|null} [height] BoxItem height
         * @property {delivery.RotationType|null} [rotationType] BoxItem rotationType
         * @property {Array.<number>|null} [pos] BoxItem pos
         */

        /**
         * Constructs a new BoxItem.
         * @memberof delivery
         * @classdesc Represents a BoxItem.
         * @implements IBoxItem
         * @constructor
         * @param {delivery.IBoxItem=} [properties] Properties to set
         */
        function BoxItem(properties) {
            this.pos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoxItem weight.
         * @member {number} weight
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.weight = 0;

        /**
         * BoxItem width.
         * @member {number} width
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.width = 0;

        /**
         * BoxItem length.
         * @member {number} length
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.length = 0;

        /**
         * BoxItem height.
         * @member {number} height
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.height = 0;

        /**
         * BoxItem rotationType.
         * @member {delivery.RotationType} rotationType
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.rotationType = 0;

        /**
         * BoxItem pos.
         * @member {Array.<number>} pos
         * @memberof delivery.BoxItem
         * @instance
         */
        BoxItem.prototype.pos = $util.emptyArray;

        /**
         * Creates a new BoxItem instance using the specified properties.
         * @function create
         * @memberof delivery.BoxItem
         * @static
         * @param {delivery.IBoxItem=} [properties] Properties to set
         * @returns {delivery.BoxItem} BoxItem instance
         */
        BoxItem.create = function create(properties) {
            return new BoxItem(properties);
        };

        /**
         * Encodes the specified BoxItem message. Does not implicitly {@link delivery.BoxItem.verify|verify} messages.
         * @function encode
         * @memberof delivery.BoxItem
         * @static
         * @param {delivery.IBoxItem} message BoxItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.weight);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.width);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.length);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.height);
            if (message.rotationType != null && Object.hasOwnProperty.call(message, "rotationType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.rotationType);
            if (message.pos != null && message.pos.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.pos.length; ++i)
                    writer.int32(message.pos[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified BoxItem message, length delimited. Does not implicitly {@link delivery.BoxItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof delivery.BoxItem
         * @static
         * @param {delivery.IBoxItem} message BoxItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoxItem message from the specified reader or buffer.
         * @function decode
         * @memberof delivery.BoxItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {delivery.BoxItem} BoxItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.BoxItem();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.weight = reader.int32();
                    break;
                case 2:
                    message.width = reader.int32();
                    break;
                case 3:
                    message.length = reader.int32();
                    break;
                case 4:
                    message.height = reader.int32();
                    break;
                case 5:
                    message.rotationType = reader.int32();
                    break;
                case 6:
                    if (!(message.pos && message.pos.length))
                        message.pos = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.pos.push(reader.int32());
                    } else
                        message.pos.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoxItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof delivery.BoxItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {delivery.BoxItem} BoxItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoxItem message.
         * @function verify
         * @memberof delivery.BoxItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoxItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight))
                    return "weight: integer expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.length != null && message.hasOwnProperty("length"))
                if (!$util.isInteger(message.length))
                    return "length: integer expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            if (message.rotationType != null && message.hasOwnProperty("rotationType"))
                switch (message.rotationType) {
                default:
                    return "rotationType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.pos != null && message.hasOwnProperty("pos")) {
                if (!Array.isArray(message.pos))
                    return "pos: array expected";
                for (let i = 0; i < message.pos.length; ++i)
                    if (!$util.isInteger(message.pos[i]))
                        return "pos: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a BoxItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof delivery.BoxItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {delivery.BoxItem} BoxItem
         */
        BoxItem.fromObject = function fromObject(object) {
            if (object instanceof $root.delivery.BoxItem)
                return object;
            let message = new $root.delivery.BoxItem();
            if (object.weight != null)
                message.weight = object.weight | 0;
            if (object.width != null)
                message.width = object.width | 0;
            if (object.length != null)
                message.length = object.length | 0;
            if (object.height != null)
                message.height = object.height | 0;
            switch (object.rotationType) {
            case "Rotation_Type_WLH":
            case 0:
                message.rotationType = 0;
                break;
            case "Rotation_Type_LWH":
            case 1:
                message.rotationType = 1;
                break;
            case "Rotation_Type_LHW":
            case 2:
                message.rotationType = 2;
                break;
            case "Rotation_Type_HLW":
            case 3:
                message.rotationType = 3;
                break;
            case "Rotation_Type_HWL":
            case 4:
                message.rotationType = 4;
                break;
            case "Rotation_Type_WHL":
            case 5:
                message.rotationType = 5;
                break;
            }
            if (object.pos) {
                if (!Array.isArray(object.pos))
                    throw TypeError(".delivery.BoxItem.pos: array expected");
                message.pos = [];
                for (let i = 0; i < object.pos.length; ++i)
                    message.pos[i] = object.pos[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a BoxItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof delivery.BoxItem
         * @static
         * @param {delivery.BoxItem} message BoxItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoxItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.pos = [];
            if (options.defaults) {
                object.weight = 0;
                object.width = 0;
                object.length = 0;
                object.height = 0;
                object.rotationType = options.enums === String ? "Rotation_Type_WLH" : 0;
            }
            if (message.weight != null && message.hasOwnProperty("weight"))
                object.weight = message.weight;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = message.length;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            if (message.rotationType != null && message.hasOwnProperty("rotationType"))
                object.rotationType = options.enums === String ? $root.delivery.RotationType[message.rotationType] : message.rotationType;
            if (message.pos && message.pos.length) {
                object.pos = [];
                for (let j = 0; j < message.pos.length; ++j)
                    object.pos[j] = message.pos[j];
            }
            return object;
        };

        /**
         * Converts this BoxItem to JSON.
         * @function toJSON
         * @memberof delivery.BoxItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoxItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoxItem;
    })();

    delivery.simulation = (function() {

        /**
         * Namespace simulation.
         * @memberof delivery
         * @namespace
         */
        const simulation = {};

        simulation.SimulationRequest = (function() {

            /**
             * Properties of a SimulationRequest.
             * @memberof delivery.simulation
             * @interface ISimulationRequest
             * @property {Array.<delivery.simulation.IDeliveryRequest>|null} [deliveryRequests] SimulationRequest deliveryRequests
             * @property {Array.<delivery.simulation.IDriverRequest>|null} [driverRequests] SimulationRequest driverRequests
             * @property {google.protobuf.ITimestamp|null} [createdAt] SimulationRequest createdAt
             * @property {boolean|null} [supportRetracement] SimulationRequest supportRetracement
             */

            /**
             * Constructs a new SimulationRequest.
             * @memberof delivery.simulation
             * @classdesc Represents a SimulationRequest.
             * @implements ISimulationRequest
             * @constructor
             * @param {delivery.simulation.ISimulationRequest=} [properties] Properties to set
             */
            function SimulationRequest(properties) {
                this.deliveryRequests = [];
                this.driverRequests = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SimulationRequest deliveryRequests.
             * @member {Array.<delivery.simulation.IDeliveryRequest>} deliveryRequests
             * @memberof delivery.simulation.SimulationRequest
             * @instance
             */
            SimulationRequest.prototype.deliveryRequests = $util.emptyArray;

            /**
             * SimulationRequest driverRequests.
             * @member {Array.<delivery.simulation.IDriverRequest>} driverRequests
             * @memberof delivery.simulation.SimulationRequest
             * @instance
             */
            SimulationRequest.prototype.driverRequests = $util.emptyArray;

            /**
             * SimulationRequest createdAt.
             * @member {google.protobuf.ITimestamp|null|undefined} createdAt
             * @memberof delivery.simulation.SimulationRequest
             * @instance
             */
            SimulationRequest.prototype.createdAt = null;

            /**
             * SimulationRequest supportRetracement.
             * @member {boolean} supportRetracement
             * @memberof delivery.simulation.SimulationRequest
             * @instance
             */
            SimulationRequest.prototype.supportRetracement = false;

            /**
             * Creates a new SimulationRequest instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {delivery.simulation.ISimulationRequest=} [properties] Properties to set
             * @returns {delivery.simulation.SimulationRequest} SimulationRequest instance
             */
            SimulationRequest.create = function create(properties) {
                return new SimulationRequest(properties);
            };

            /**
             * Encodes the specified SimulationRequest message. Does not implicitly {@link delivery.simulation.SimulationRequest.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {delivery.simulation.ISimulationRequest} message SimulationRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimulationRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deliveryRequests != null && message.deliveryRequests.length)
                    for (let i = 0; i < message.deliveryRequests.length; ++i)
                        $root.delivery.simulation.DeliveryRequest.encode(message.deliveryRequests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.driverRequests != null && message.driverRequests.length)
                    for (let i = 0; i < message.driverRequests.length; ++i)
                        $root.delivery.simulation.DriverRequest.encode(message.driverRequests[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.supportRetracement != null && Object.hasOwnProperty.call(message, "supportRetracement"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.supportRetracement);
                return writer;
            };

            /**
             * Encodes the specified SimulationRequest message, length delimited. Does not implicitly {@link delivery.simulation.SimulationRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {delivery.simulation.ISimulationRequest} message SimulationRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimulationRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SimulationRequest message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.SimulationRequest} SimulationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimulationRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.SimulationRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.deliveryRequests && message.deliveryRequests.length))
                            message.deliveryRequests = [];
                        message.deliveryRequests.push($root.delivery.simulation.DeliveryRequest.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        if (!(message.driverRequests && message.driverRequests.length))
                            message.driverRequests = [];
                        message.driverRequests.push($root.delivery.simulation.DriverRequest.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.supportRetracement = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SimulationRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.SimulationRequest} SimulationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimulationRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SimulationRequest message.
             * @function verify
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SimulationRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deliveryRequests != null && message.hasOwnProperty("deliveryRequests")) {
                    if (!Array.isArray(message.deliveryRequests))
                        return "deliveryRequests: array expected";
                    for (let i = 0; i < message.deliveryRequests.length; ++i) {
                        let error = $root.delivery.simulation.DeliveryRequest.verify(message.deliveryRequests[i]);
                        if (error)
                            return "deliveryRequests." + error;
                    }
                }
                if (message.driverRequests != null && message.hasOwnProperty("driverRequests")) {
                    if (!Array.isArray(message.driverRequests))
                        return "driverRequests: array expected";
                    for (let i = 0; i < message.driverRequests.length; ++i) {
                        let error = $root.delivery.simulation.DriverRequest.verify(message.driverRequests[i]);
                        if (error)
                            return "driverRequests." + error;
                    }
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                    if (error)
                        return "createdAt." + error;
                }
                if (message.supportRetracement != null && message.hasOwnProperty("supportRetracement"))
                    if (typeof message.supportRetracement !== "boolean")
                        return "supportRetracement: boolean expected";
                return null;
            };

            /**
             * Creates a SimulationRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.SimulationRequest} SimulationRequest
             */
            SimulationRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.SimulationRequest)
                    return object;
                let message = new $root.delivery.simulation.SimulationRequest();
                if (object.deliveryRequests) {
                    if (!Array.isArray(object.deliveryRequests))
                        throw TypeError(".delivery.simulation.SimulationRequest.deliveryRequests: array expected");
                    message.deliveryRequests = [];
                    for (let i = 0; i < object.deliveryRequests.length; ++i) {
                        if (typeof object.deliveryRequests[i] !== "object")
                            throw TypeError(".delivery.simulation.SimulationRequest.deliveryRequests: object expected");
                        message.deliveryRequests[i] = $root.delivery.simulation.DeliveryRequest.fromObject(object.deliveryRequests[i]);
                    }
                }
                if (object.driverRequests) {
                    if (!Array.isArray(object.driverRequests))
                        throw TypeError(".delivery.simulation.SimulationRequest.driverRequests: array expected");
                    message.driverRequests = [];
                    for (let i = 0; i < object.driverRequests.length; ++i) {
                        if (typeof object.driverRequests[i] !== "object")
                            throw TypeError(".delivery.simulation.SimulationRequest.driverRequests: object expected");
                        message.driverRequests[i] = $root.delivery.simulation.DriverRequest.fromObject(object.driverRequests[i]);
                    }
                }
                if (object.createdAt != null) {
                    if (typeof object.createdAt !== "object")
                        throw TypeError(".delivery.simulation.SimulationRequest.createdAt: object expected");
                    message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
                }
                if (object.supportRetracement != null)
                    message.supportRetracement = Boolean(object.supportRetracement);
                return message;
            };

            /**
             * Creates a plain object from a SimulationRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.SimulationRequest
             * @static
             * @param {delivery.simulation.SimulationRequest} message SimulationRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SimulationRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.deliveryRequests = [];
                    object.driverRequests = [];
                }
                if (options.defaults) {
                    object.createdAt = null;
                    object.supportRetracement = false;
                }
                if (message.deliveryRequests && message.deliveryRequests.length) {
                    object.deliveryRequests = [];
                    for (let j = 0; j < message.deliveryRequests.length; ++j)
                        object.deliveryRequests[j] = $root.delivery.simulation.DeliveryRequest.toObject(message.deliveryRequests[j], options);
                }
                if (message.driverRequests && message.driverRequests.length) {
                    object.driverRequests = [];
                    for (let j = 0; j < message.driverRequests.length; ++j)
                        object.driverRequests[j] = $root.delivery.simulation.DriverRequest.toObject(message.driverRequests[j], options);
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
                if (message.supportRetracement != null && message.hasOwnProperty("supportRetracement"))
                    object.supportRetracement = message.supportRetracement;
                return object;
            };

            /**
             * Converts this SimulationRequest to JSON.
             * @function toJSON
             * @memberof delivery.simulation.SimulationRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SimulationRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SimulationRequest;
        })();

        simulation.SimulationResponse = (function() {

            /**
             * Properties of a SimulationResponse.
             * @memberof delivery.simulation
             * @interface ISimulationResponse
             * @property {Object.<string,delivery.simulation.IDriverRoutingDetails>|null} [driverRoutingDetailsByUuid] SimulationResponse driverRoutingDetailsByUuid
             * @property {number|null} [runningTime] SimulationResponse runningTime
             */

            /**
             * Constructs a new SimulationResponse.
             * @memberof delivery.simulation
             * @classdesc Represents a SimulationResponse.
             * @implements ISimulationResponse
             * @constructor
             * @param {delivery.simulation.ISimulationResponse=} [properties] Properties to set
             */
            function SimulationResponse(properties) {
                this.driverRoutingDetailsByUuid = {};
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SimulationResponse driverRoutingDetailsByUuid.
             * @member {Object.<string,delivery.simulation.IDriverRoutingDetails>} driverRoutingDetailsByUuid
             * @memberof delivery.simulation.SimulationResponse
             * @instance
             */
            SimulationResponse.prototype.driverRoutingDetailsByUuid = $util.emptyObject;

            /**
             * SimulationResponse runningTime.
             * @member {number} runningTime
             * @memberof delivery.simulation.SimulationResponse
             * @instance
             */
            SimulationResponse.prototype.runningTime = 0;

            /**
             * Creates a new SimulationResponse instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {delivery.simulation.ISimulationResponse=} [properties] Properties to set
             * @returns {delivery.simulation.SimulationResponse} SimulationResponse instance
             */
            SimulationResponse.create = function create(properties) {
                return new SimulationResponse(properties);
            };

            /**
             * Encodes the specified SimulationResponse message. Does not implicitly {@link delivery.simulation.SimulationResponse.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {delivery.simulation.ISimulationResponse} message SimulationResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimulationResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.driverRoutingDetailsByUuid != null && Object.hasOwnProperty.call(message, "driverRoutingDetailsByUuid"))
                    for (let keys = Object.keys(message.driverRoutingDetailsByUuid), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.delivery.simulation.DriverRoutingDetails.encode(message.driverRoutingDetailsByUuid[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.runningTime != null && Object.hasOwnProperty.call(message, "runningTime"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.runningTime);
                return writer;
            };

            /**
             * Encodes the specified SimulationResponse message, length delimited. Does not implicitly {@link delivery.simulation.SimulationResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {delivery.simulation.ISimulationResponse} message SimulationResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimulationResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.SimulationResponse} SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimulationResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.SimulationResponse(), key, value;
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (message.driverRoutingDetailsByUuid === $util.emptyObject)
                            message.driverRoutingDetailsByUuid = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.delivery.simulation.DriverRoutingDetails.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.driverRoutingDetailsByUuid[key] = value;
                        break;
                    case 2:
                        message.runningTime = reader.double();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.SimulationResponse} SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimulationResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SimulationResponse message.
             * @function verify
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SimulationResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.driverRoutingDetailsByUuid != null && message.hasOwnProperty("driverRoutingDetailsByUuid")) {
                    if (!$util.isObject(message.driverRoutingDetailsByUuid))
                        return "driverRoutingDetailsByUuid: object expected";
                    let key = Object.keys(message.driverRoutingDetailsByUuid);
                    for (let i = 0; i < key.length; ++i) {
                        let error = $root.delivery.simulation.DriverRoutingDetails.verify(message.driverRoutingDetailsByUuid[key[i]]);
                        if (error)
                            return "driverRoutingDetailsByUuid." + error;
                    }
                }
                if (message.runningTime != null && message.hasOwnProperty("runningTime"))
                    if (typeof message.runningTime !== "number")
                        return "runningTime: number expected";
                return null;
            };

            /**
             * Creates a SimulationResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.SimulationResponse} SimulationResponse
             */
            SimulationResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.SimulationResponse)
                    return object;
                let message = new $root.delivery.simulation.SimulationResponse();
                if (object.driverRoutingDetailsByUuid) {
                    if (typeof object.driverRoutingDetailsByUuid !== "object")
                        throw TypeError(".delivery.simulation.SimulationResponse.driverRoutingDetailsByUuid: object expected");
                    message.driverRoutingDetailsByUuid = {};
                    for (let keys = Object.keys(object.driverRoutingDetailsByUuid), i = 0; i < keys.length; ++i) {
                        if (typeof object.driverRoutingDetailsByUuid[keys[i]] !== "object")
                            throw TypeError(".delivery.simulation.SimulationResponse.driverRoutingDetailsByUuid: object expected");
                        message.driverRoutingDetailsByUuid[keys[i]] = $root.delivery.simulation.DriverRoutingDetails.fromObject(object.driverRoutingDetailsByUuid[keys[i]]);
                    }
                }
                if (object.runningTime != null)
                    message.runningTime = Number(object.runningTime);
                return message;
            };

            /**
             * Creates a plain object from a SimulationResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.SimulationResponse
             * @static
             * @param {delivery.simulation.SimulationResponse} message SimulationResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SimulationResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.objects || options.defaults)
                    object.driverRoutingDetailsByUuid = {};
                if (options.defaults)
                    object.runningTime = 0;
                let keys2;
                if (message.driverRoutingDetailsByUuid && (keys2 = Object.keys(message.driverRoutingDetailsByUuid)).length) {
                    object.driverRoutingDetailsByUuid = {};
                    for (let j = 0; j < keys2.length; ++j)
                        object.driverRoutingDetailsByUuid[keys2[j]] = $root.delivery.simulation.DriverRoutingDetails.toObject(message.driverRoutingDetailsByUuid[keys2[j]], options);
                }
                if (message.runningTime != null && message.hasOwnProperty("runningTime"))
                    object.runningTime = options.json && !isFinite(message.runningTime) ? String(message.runningTime) : message.runningTime;
                return object;
            };

            /**
             * Converts this SimulationResponse to JSON.
             * @function toJSON
             * @memberof delivery.simulation.SimulationResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SimulationResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SimulationResponse;
        })();

        simulation.DriverRoutingDetails = (function() {

            /**
             * Properties of a DriverRoutingDetails.
             * @memberof delivery.simulation
             * @interface IDriverRoutingDetails
             * @property {string|null} [name] DriverRoutingDetails name
             * @property {Array.<delivery.simulation.IRoute>|null} [routes] DriverRoutingDetails routes
             */

            /**
             * Constructs a new DriverRoutingDetails.
             * @memberof delivery.simulation
             * @classdesc Represents a DriverRoutingDetails.
             * @implements IDriverRoutingDetails
             * @constructor
             * @param {delivery.simulation.IDriverRoutingDetails=} [properties] Properties to set
             */
            function DriverRoutingDetails(properties) {
                this.routes = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DriverRoutingDetails name.
             * @member {string} name
             * @memberof delivery.simulation.DriverRoutingDetails
             * @instance
             */
            DriverRoutingDetails.prototype.name = "";

            /**
             * DriverRoutingDetails routes.
             * @member {Array.<delivery.simulation.IRoute>} routes
             * @memberof delivery.simulation.DriverRoutingDetails
             * @instance
             */
            DriverRoutingDetails.prototype.routes = $util.emptyArray;

            /**
             * Creates a new DriverRoutingDetails instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {delivery.simulation.IDriverRoutingDetails=} [properties] Properties to set
             * @returns {delivery.simulation.DriverRoutingDetails} DriverRoutingDetails instance
             */
            DriverRoutingDetails.create = function create(properties) {
                return new DriverRoutingDetails(properties);
            };

            /**
             * Encodes the specified DriverRoutingDetails message. Does not implicitly {@link delivery.simulation.DriverRoutingDetails.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {delivery.simulation.IDriverRoutingDetails} message DriverRoutingDetails message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DriverRoutingDetails.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.routes != null && message.routes.length)
                    for (let i = 0; i < message.routes.length; ++i)
                        $root.delivery.simulation.Route.encode(message.routes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DriverRoutingDetails message, length delimited. Does not implicitly {@link delivery.simulation.DriverRoutingDetails.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {delivery.simulation.IDriverRoutingDetails} message DriverRoutingDetails message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DriverRoutingDetails.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DriverRoutingDetails message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.DriverRoutingDetails} DriverRoutingDetails
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DriverRoutingDetails.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.DriverRoutingDetails();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        if (!(message.routes && message.routes.length))
                            message.routes = [];
                        message.routes.push($root.delivery.simulation.Route.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DriverRoutingDetails message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.DriverRoutingDetails} DriverRoutingDetails
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DriverRoutingDetails.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DriverRoutingDetails message.
             * @function verify
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DriverRoutingDetails.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.routes != null && message.hasOwnProperty("routes")) {
                    if (!Array.isArray(message.routes))
                        return "routes: array expected";
                    for (let i = 0; i < message.routes.length; ++i) {
                        let error = $root.delivery.simulation.Route.verify(message.routes[i]);
                        if (error)
                            return "routes." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DriverRoutingDetails message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.DriverRoutingDetails} DriverRoutingDetails
             */
            DriverRoutingDetails.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.DriverRoutingDetails)
                    return object;
                let message = new $root.delivery.simulation.DriverRoutingDetails();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.routes) {
                    if (!Array.isArray(object.routes))
                        throw TypeError(".delivery.simulation.DriverRoutingDetails.routes: array expected");
                    message.routes = [];
                    for (let i = 0; i < object.routes.length; ++i) {
                        if (typeof object.routes[i] !== "object")
                            throw TypeError(".delivery.simulation.DriverRoutingDetails.routes: object expected");
                        message.routes[i] = $root.delivery.simulation.Route.fromObject(object.routes[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a DriverRoutingDetails message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.DriverRoutingDetails
             * @static
             * @param {delivery.simulation.DriverRoutingDetails} message DriverRoutingDetails
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DriverRoutingDetails.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.routes = [];
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.routes && message.routes.length) {
                    object.routes = [];
                    for (let j = 0; j < message.routes.length; ++j)
                        object.routes[j] = $root.delivery.simulation.Route.toObject(message.routes[j], options);
                }
                return object;
            };

            /**
             * Converts this DriverRoutingDetails to JSON.
             * @function toJSON
             * @memberof delivery.simulation.DriverRoutingDetails
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DriverRoutingDetails.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DriverRoutingDetails;
        })();

        simulation.DriverRequest = (function() {

            /**
             * Properties of a DriverRequest.
             * @memberof delivery.simulation
             * @interface IDriverRequest
             * @property {string|null} [uuid] DriverRequest uuid
             * @property {string|null} [name] DriverRequest name
             * @property {delivery.IVehicleCapacity|null} [vehicleCapacity] DriverRequest vehicleCapacity
             * @property {number|null} [maxSpeedKmPerHour] DriverRequest maxSpeedKmPerHour
             * @property {delivery.ILatLng|null} [loc] DriverRequest loc
             * @property {google.protobuf.ITimestamp|null} [createdAt] DriverRequest createdAt
             */

            /**
             * Constructs a new DriverRequest.
             * @memberof delivery.simulation
             * @classdesc Represents a DriverRequest.
             * @implements IDriverRequest
             * @constructor
             * @param {delivery.simulation.IDriverRequest=} [properties] Properties to set
             */
            function DriverRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DriverRequest uuid.
             * @member {string} uuid
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.uuid = "";

            /**
             * DriverRequest name.
             * @member {string} name
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.name = "";

            /**
             * DriverRequest vehicleCapacity.
             * @member {delivery.IVehicleCapacity|null|undefined} vehicleCapacity
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.vehicleCapacity = null;

            /**
             * DriverRequest maxSpeedKmPerHour.
             * @member {number} maxSpeedKmPerHour
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.maxSpeedKmPerHour = 0;

            /**
             * DriverRequest loc.
             * @member {delivery.ILatLng|null|undefined} loc
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.loc = null;

            /**
             * DriverRequest createdAt.
             * @member {google.protobuf.ITimestamp|null|undefined} createdAt
             * @memberof delivery.simulation.DriverRequest
             * @instance
             */
            DriverRequest.prototype.createdAt = null;

            /**
             * Creates a new DriverRequest instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {delivery.simulation.IDriverRequest=} [properties] Properties to set
             * @returns {delivery.simulation.DriverRequest} DriverRequest instance
             */
            DriverRequest.create = function create(properties) {
                return new DriverRequest(properties);
            };

            /**
             * Encodes the specified DriverRequest message. Does not implicitly {@link delivery.simulation.DriverRequest.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {delivery.simulation.IDriverRequest} message DriverRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DriverRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.vehicleCapacity != null && Object.hasOwnProperty.call(message, "vehicleCapacity"))
                    $root.delivery.VehicleCapacity.encode(message.vehicleCapacity, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.maxSpeedKmPerHour != null && Object.hasOwnProperty.call(message, "maxSpeedKmPerHour"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.maxSpeedKmPerHour);
                if (message.loc != null && Object.hasOwnProperty.call(message, "loc"))
                    $root.delivery.LatLng.encode(message.loc, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DriverRequest message, length delimited. Does not implicitly {@link delivery.simulation.DriverRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {delivery.simulation.IDriverRequest} message DriverRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DriverRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DriverRequest message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.DriverRequest} DriverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DriverRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.DriverRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uuid = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.vehicleCapacity = $root.delivery.VehicleCapacity.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.maxSpeedKmPerHour = reader.double();
                        break;
                    case 5:
                        message.loc = $root.delivery.LatLng.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DriverRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.DriverRequest} DriverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DriverRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DriverRequest message.
             * @function verify
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DriverRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.vehicleCapacity != null && message.hasOwnProperty("vehicleCapacity")) {
                    let error = $root.delivery.VehicleCapacity.verify(message.vehicleCapacity);
                    if (error)
                        return "vehicleCapacity." + error;
                }
                if (message.maxSpeedKmPerHour != null && message.hasOwnProperty("maxSpeedKmPerHour"))
                    if (typeof message.maxSpeedKmPerHour !== "number")
                        return "maxSpeedKmPerHour: number expected";
                if (message.loc != null && message.hasOwnProperty("loc")) {
                    let error = $root.delivery.LatLng.verify(message.loc);
                    if (error)
                        return "loc." + error;
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                    if (error)
                        return "createdAt." + error;
                }
                return null;
            };

            /**
             * Creates a DriverRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.DriverRequest} DriverRequest
             */
            DriverRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.DriverRequest)
                    return object;
                let message = new $root.delivery.simulation.DriverRequest();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.vehicleCapacity != null) {
                    if (typeof object.vehicleCapacity !== "object")
                        throw TypeError(".delivery.simulation.DriverRequest.vehicleCapacity: object expected");
                    message.vehicleCapacity = $root.delivery.VehicleCapacity.fromObject(object.vehicleCapacity);
                }
                if (object.maxSpeedKmPerHour != null)
                    message.maxSpeedKmPerHour = Number(object.maxSpeedKmPerHour);
                if (object.loc != null) {
                    if (typeof object.loc !== "object")
                        throw TypeError(".delivery.simulation.DriverRequest.loc: object expected");
                    message.loc = $root.delivery.LatLng.fromObject(object.loc);
                }
                if (object.createdAt != null) {
                    if (typeof object.createdAt !== "object")
                        throw TypeError(".delivery.simulation.DriverRequest.createdAt: object expected");
                    message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
                }
                return message;
            };

            /**
             * Creates a plain object from a DriverRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.DriverRequest
             * @static
             * @param {delivery.simulation.DriverRequest} message DriverRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DriverRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.uuid = "";
                    object.name = "";
                    object.vehicleCapacity = null;
                    object.maxSpeedKmPerHour = 0;
                    object.loc = null;
                    object.createdAt = null;
                }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.vehicleCapacity != null && message.hasOwnProperty("vehicleCapacity"))
                    object.vehicleCapacity = $root.delivery.VehicleCapacity.toObject(message.vehicleCapacity, options);
                if (message.maxSpeedKmPerHour != null && message.hasOwnProperty("maxSpeedKmPerHour"))
                    object.maxSpeedKmPerHour = options.json && !isFinite(message.maxSpeedKmPerHour) ? String(message.maxSpeedKmPerHour) : message.maxSpeedKmPerHour;
                if (message.loc != null && message.hasOwnProperty("loc"))
                    object.loc = $root.delivery.LatLng.toObject(message.loc, options);
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
                return object;
            };

            /**
             * Converts this DriverRequest to JSON.
             * @function toJSON
             * @memberof delivery.simulation.DriverRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DriverRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DriverRequest;
        })();

        simulation.DeliveryRequest = (function() {

            /**
             * Properties of a DeliveryRequest.
             * @memberof delivery.simulation
             * @interface IDeliveryRequest
             * @property {string|null} [uuid] DeliveryRequest uuid
             * @property {string|null} [name] DeliveryRequest name
             * @property {delivery.IGoodsMetadata|null} [goodsMetadata] DeliveryRequest goodsMetadata
             * @property {delivery.ILatLng|null} [srcLoc] DeliveryRequest srcLoc
             * @property {delivery.ILatLng|null} [dstLoc] DeliveryRequest dstLoc
             * @property {delivery.ITimeWindow|null} [srcTimeWindow] DeliveryRequest srcTimeWindow
             * @property {delivery.ITimeWindow|null} [dstTimeWindow] DeliveryRequest dstTimeWindow
             * @property {google.protobuf.ITimestamp|null} [createdAt] DeliveryRequest createdAt
             */

            /**
             * Constructs a new DeliveryRequest.
             * @memberof delivery.simulation
             * @classdesc Represents a DeliveryRequest.
             * @implements IDeliveryRequest
             * @constructor
             * @param {delivery.simulation.IDeliveryRequest=} [properties] Properties to set
             */
            function DeliveryRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeliveryRequest uuid.
             * @member {string} uuid
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.uuid = "";

            /**
             * DeliveryRequest name.
             * @member {string} name
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.name = "";

            /**
             * DeliveryRequest goodsMetadata.
             * @member {delivery.IGoodsMetadata|null|undefined} goodsMetadata
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.goodsMetadata = null;

            /**
             * DeliveryRequest srcLoc.
             * @member {delivery.ILatLng|null|undefined} srcLoc
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.srcLoc = null;

            /**
             * DeliveryRequest dstLoc.
             * @member {delivery.ILatLng|null|undefined} dstLoc
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.dstLoc = null;

            /**
             * DeliveryRequest srcTimeWindow.
             * @member {delivery.ITimeWindow|null|undefined} srcTimeWindow
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.srcTimeWindow = null;

            /**
             * DeliveryRequest dstTimeWindow.
             * @member {delivery.ITimeWindow|null|undefined} dstTimeWindow
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.dstTimeWindow = null;

            /**
             * DeliveryRequest createdAt.
             * @member {google.protobuf.ITimestamp|null|undefined} createdAt
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             */
            DeliveryRequest.prototype.createdAt = null;

            /**
             * Creates a new DeliveryRequest instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {delivery.simulation.IDeliveryRequest=} [properties] Properties to set
             * @returns {delivery.simulation.DeliveryRequest} DeliveryRequest instance
             */
            DeliveryRequest.create = function create(properties) {
                return new DeliveryRequest(properties);
            };

            /**
             * Encodes the specified DeliveryRequest message. Does not implicitly {@link delivery.simulation.DeliveryRequest.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {delivery.simulation.IDeliveryRequest} message DeliveryRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeliveryRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.goodsMetadata != null && Object.hasOwnProperty.call(message, "goodsMetadata"))
                    $root.delivery.GoodsMetadata.encode(message.goodsMetadata, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.srcLoc != null && Object.hasOwnProperty.call(message, "srcLoc"))
                    $root.delivery.LatLng.encode(message.srcLoc, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.dstLoc != null && Object.hasOwnProperty.call(message, "dstLoc"))
                    $root.delivery.LatLng.encode(message.dstLoc, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.srcTimeWindow != null && Object.hasOwnProperty.call(message, "srcTimeWindow"))
                    $root.delivery.TimeWindow.encode(message.srcTimeWindow, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.dstTimeWindow != null && Object.hasOwnProperty.call(message, "dstTimeWindow"))
                    $root.delivery.TimeWindow.encode(message.dstTimeWindow, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DeliveryRequest message, length delimited. Does not implicitly {@link delivery.simulation.DeliveryRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {delivery.simulation.IDeliveryRequest} message DeliveryRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeliveryRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DeliveryRequest message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.DeliveryRequest} DeliveryRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeliveryRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.DeliveryRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uuid = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.goodsMetadata = $root.delivery.GoodsMetadata.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.srcLoc = $root.delivery.LatLng.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.dstLoc = $root.delivery.LatLng.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.srcTimeWindow = $root.delivery.TimeWindow.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.dstTimeWindow = $root.delivery.TimeWindow.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DeliveryRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.DeliveryRequest} DeliveryRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeliveryRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DeliveryRequest message.
             * @function verify
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DeliveryRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.goodsMetadata != null && message.hasOwnProperty("goodsMetadata")) {
                    let error = $root.delivery.GoodsMetadata.verify(message.goodsMetadata);
                    if (error)
                        return "goodsMetadata." + error;
                }
                if (message.srcLoc != null && message.hasOwnProperty("srcLoc")) {
                    let error = $root.delivery.LatLng.verify(message.srcLoc);
                    if (error)
                        return "srcLoc." + error;
                }
                if (message.dstLoc != null && message.hasOwnProperty("dstLoc")) {
                    let error = $root.delivery.LatLng.verify(message.dstLoc);
                    if (error)
                        return "dstLoc." + error;
                }
                if (message.srcTimeWindow != null && message.hasOwnProperty("srcTimeWindow")) {
                    let error = $root.delivery.TimeWindow.verify(message.srcTimeWindow);
                    if (error)
                        return "srcTimeWindow." + error;
                }
                if (message.dstTimeWindow != null && message.hasOwnProperty("dstTimeWindow")) {
                    let error = $root.delivery.TimeWindow.verify(message.dstTimeWindow);
                    if (error)
                        return "dstTimeWindow." + error;
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                    if (error)
                        return "createdAt." + error;
                }
                return null;
            };

            /**
             * Creates a DeliveryRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.DeliveryRequest} DeliveryRequest
             */
            DeliveryRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.DeliveryRequest)
                    return object;
                let message = new $root.delivery.simulation.DeliveryRequest();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.goodsMetadata != null) {
                    if (typeof object.goodsMetadata !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.goodsMetadata: object expected");
                    message.goodsMetadata = $root.delivery.GoodsMetadata.fromObject(object.goodsMetadata);
                }
                if (object.srcLoc != null) {
                    if (typeof object.srcLoc !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.srcLoc: object expected");
                    message.srcLoc = $root.delivery.LatLng.fromObject(object.srcLoc);
                }
                if (object.dstLoc != null) {
                    if (typeof object.dstLoc !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.dstLoc: object expected");
                    message.dstLoc = $root.delivery.LatLng.fromObject(object.dstLoc);
                }
                if (object.srcTimeWindow != null) {
                    if (typeof object.srcTimeWindow !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.srcTimeWindow: object expected");
                    message.srcTimeWindow = $root.delivery.TimeWindow.fromObject(object.srcTimeWindow);
                }
                if (object.dstTimeWindow != null) {
                    if (typeof object.dstTimeWindow !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.dstTimeWindow: object expected");
                    message.dstTimeWindow = $root.delivery.TimeWindow.fromObject(object.dstTimeWindow);
                }
                if (object.createdAt != null) {
                    if (typeof object.createdAt !== "object")
                        throw TypeError(".delivery.simulation.DeliveryRequest.createdAt: object expected");
                    message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
                }
                return message;
            };

            /**
             * Creates a plain object from a DeliveryRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.DeliveryRequest
             * @static
             * @param {delivery.simulation.DeliveryRequest} message DeliveryRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DeliveryRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.uuid = "";
                    object.name = "";
                    object.goodsMetadata = null;
                    object.srcLoc = null;
                    object.dstLoc = null;
                    object.srcTimeWindow = null;
                    object.dstTimeWindow = null;
                    object.createdAt = null;
                }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.goodsMetadata != null && message.hasOwnProperty("goodsMetadata"))
                    object.goodsMetadata = $root.delivery.GoodsMetadata.toObject(message.goodsMetadata, options);
                if (message.srcLoc != null && message.hasOwnProperty("srcLoc"))
                    object.srcLoc = $root.delivery.LatLng.toObject(message.srcLoc, options);
                if (message.dstLoc != null && message.hasOwnProperty("dstLoc"))
                    object.dstLoc = $root.delivery.LatLng.toObject(message.dstLoc, options);
                if (message.srcTimeWindow != null && message.hasOwnProperty("srcTimeWindow"))
                    object.srcTimeWindow = $root.delivery.TimeWindow.toObject(message.srcTimeWindow, options);
                if (message.dstTimeWindow != null && message.hasOwnProperty("dstTimeWindow"))
                    object.dstTimeWindow = $root.delivery.TimeWindow.toObject(message.dstTimeWindow, options);
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
                return object;
            };

            /**
             * Converts this DeliveryRequest to JSON.
             * @function toJSON
             * @memberof delivery.simulation.DeliveryRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DeliveryRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DeliveryRequest;
        })();

        simulation.Route = (function() {

            /**
             * Properties of a Route.
             * @memberof delivery.simulation
             * @interface IRoute
             * @property {string|null} [deliveryRequestUuid] Route deliveryRequestUuid
             * @property {delivery.ILatLng|null} [srcLoc] Route srcLoc
             * @property {delivery.ILatLng|null} [dstLoc] Route dstLoc
             * @property {delivery.ITimeWindow|null} [timeWindow] Route timeWindow
             * @property {delivery.IVehicleState|null} [vehicleState] Route vehicleState
             * @property {number|null} [speedKmPerHour] Route speedKmPerHour
             * @property {boolean|null} [isReqSrc] Route isReqSrc
             * @property {boolean|null} [isReqDst] Route isReqDst
             */

            /**
             * Constructs a new Route.
             * @memberof delivery.simulation
             * @classdesc Represents a Route.
             * @implements IRoute
             * @constructor
             * @param {delivery.simulation.IRoute=} [properties] Properties to set
             */
            function Route(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Route deliveryRequestUuid.
             * @member {string} deliveryRequestUuid
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.deliveryRequestUuid = "";

            /**
             * Route srcLoc.
             * @member {delivery.ILatLng|null|undefined} srcLoc
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.srcLoc = null;

            /**
             * Route dstLoc.
             * @member {delivery.ILatLng|null|undefined} dstLoc
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.dstLoc = null;

            /**
             * Route timeWindow.
             * @member {delivery.ITimeWindow|null|undefined} timeWindow
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.timeWindow = null;

            /**
             * Route vehicleState.
             * @member {delivery.IVehicleState|null|undefined} vehicleState
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.vehicleState = null;

            /**
             * Route speedKmPerHour.
             * @member {number} speedKmPerHour
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.speedKmPerHour = 0;

            /**
             * Route isReqSrc.
             * @member {boolean} isReqSrc
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.isReqSrc = false;

            /**
             * Route isReqDst.
             * @member {boolean} isReqDst
             * @memberof delivery.simulation.Route
             * @instance
             */
            Route.prototype.isReqDst = false;

            /**
             * Creates a new Route instance using the specified properties.
             * @function create
             * @memberof delivery.simulation.Route
             * @static
             * @param {delivery.simulation.IRoute=} [properties] Properties to set
             * @returns {delivery.simulation.Route} Route instance
             */
            Route.create = function create(properties) {
                return new Route(properties);
            };

            /**
             * Encodes the specified Route message. Does not implicitly {@link delivery.simulation.Route.verify|verify} messages.
             * @function encode
             * @memberof delivery.simulation.Route
             * @static
             * @param {delivery.simulation.IRoute} message Route message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Route.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deliveryRequestUuid != null && Object.hasOwnProperty.call(message, "deliveryRequestUuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deliveryRequestUuid);
                if (message.srcLoc != null && Object.hasOwnProperty.call(message, "srcLoc"))
                    $root.delivery.LatLng.encode(message.srcLoc, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.dstLoc != null && Object.hasOwnProperty.call(message, "dstLoc"))
                    $root.delivery.LatLng.encode(message.dstLoc, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.timeWindow != null && Object.hasOwnProperty.call(message, "timeWindow"))
                    $root.delivery.TimeWindow.encode(message.timeWindow, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.vehicleState != null && Object.hasOwnProperty.call(message, "vehicleState"))
                    $root.delivery.VehicleState.encode(message.vehicleState, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.speedKmPerHour != null && Object.hasOwnProperty.call(message, "speedKmPerHour"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.speedKmPerHour);
                if (message.isReqSrc != null && Object.hasOwnProperty.call(message, "isReqSrc"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isReqSrc);
                if (message.isReqDst != null && Object.hasOwnProperty.call(message, "isReqDst"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isReqDst);
                return writer;
            };

            /**
             * Encodes the specified Route message, length delimited. Does not implicitly {@link delivery.simulation.Route.verify|verify} messages.
             * @function encodeDelimited
             * @memberof delivery.simulation.Route
             * @static
             * @param {delivery.simulation.IRoute} message Route message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Route.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Route message from the specified reader or buffer.
             * @function decode
             * @memberof delivery.simulation.Route
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {delivery.simulation.Route} Route
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Route.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.delivery.simulation.Route();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.deliveryRequestUuid = reader.string();
                        break;
                    case 2:
                        message.srcLoc = $root.delivery.LatLng.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.dstLoc = $root.delivery.LatLng.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.timeWindow = $root.delivery.TimeWindow.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.vehicleState = $root.delivery.VehicleState.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.speedKmPerHour = reader.double();
                        break;
                    case 7:
                        message.isReqSrc = reader.bool();
                        break;
                    case 8:
                        message.isReqDst = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Route message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof delivery.simulation.Route
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {delivery.simulation.Route} Route
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Route.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Route message.
             * @function verify
             * @memberof delivery.simulation.Route
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Route.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deliveryRequestUuid != null && message.hasOwnProperty("deliveryRequestUuid"))
                    if (!$util.isString(message.deliveryRequestUuid))
                        return "deliveryRequestUuid: string expected";
                if (message.srcLoc != null && message.hasOwnProperty("srcLoc")) {
                    let error = $root.delivery.LatLng.verify(message.srcLoc);
                    if (error)
                        return "srcLoc." + error;
                }
                if (message.dstLoc != null && message.hasOwnProperty("dstLoc")) {
                    let error = $root.delivery.LatLng.verify(message.dstLoc);
                    if (error)
                        return "dstLoc." + error;
                }
                if (message.timeWindow != null && message.hasOwnProperty("timeWindow")) {
                    let error = $root.delivery.TimeWindow.verify(message.timeWindow);
                    if (error)
                        return "timeWindow." + error;
                }
                if (message.vehicleState != null && message.hasOwnProperty("vehicleState")) {
                    let error = $root.delivery.VehicleState.verify(message.vehicleState);
                    if (error)
                        return "vehicleState." + error;
                }
                if (message.speedKmPerHour != null && message.hasOwnProperty("speedKmPerHour"))
                    if (typeof message.speedKmPerHour !== "number")
                        return "speedKmPerHour: number expected";
                if (message.isReqSrc != null && message.hasOwnProperty("isReqSrc"))
                    if (typeof message.isReqSrc !== "boolean")
                        return "isReqSrc: boolean expected";
                if (message.isReqDst != null && message.hasOwnProperty("isReqDst"))
                    if (typeof message.isReqDst !== "boolean")
                        return "isReqDst: boolean expected";
                return null;
            };

            /**
             * Creates a Route message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof delivery.simulation.Route
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {delivery.simulation.Route} Route
             */
            Route.fromObject = function fromObject(object) {
                if (object instanceof $root.delivery.simulation.Route)
                    return object;
                let message = new $root.delivery.simulation.Route();
                if (object.deliveryRequestUuid != null)
                    message.deliveryRequestUuid = String(object.deliveryRequestUuid);
                if (object.srcLoc != null) {
                    if (typeof object.srcLoc !== "object")
                        throw TypeError(".delivery.simulation.Route.srcLoc: object expected");
                    message.srcLoc = $root.delivery.LatLng.fromObject(object.srcLoc);
                }
                if (object.dstLoc != null) {
                    if (typeof object.dstLoc !== "object")
                        throw TypeError(".delivery.simulation.Route.dstLoc: object expected");
                    message.dstLoc = $root.delivery.LatLng.fromObject(object.dstLoc);
                }
                if (object.timeWindow != null) {
                    if (typeof object.timeWindow !== "object")
                        throw TypeError(".delivery.simulation.Route.timeWindow: object expected");
                    message.timeWindow = $root.delivery.TimeWindow.fromObject(object.timeWindow);
                }
                if (object.vehicleState != null) {
                    if (typeof object.vehicleState !== "object")
                        throw TypeError(".delivery.simulation.Route.vehicleState: object expected");
                    message.vehicleState = $root.delivery.VehicleState.fromObject(object.vehicleState);
                }
                if (object.speedKmPerHour != null)
                    message.speedKmPerHour = Number(object.speedKmPerHour);
                if (object.isReqSrc != null)
                    message.isReqSrc = Boolean(object.isReqSrc);
                if (object.isReqDst != null)
                    message.isReqDst = Boolean(object.isReqDst);
                return message;
            };

            /**
             * Creates a plain object from a Route message. Also converts values to other types if specified.
             * @function toObject
             * @memberof delivery.simulation.Route
             * @static
             * @param {delivery.simulation.Route} message Route
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Route.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.deliveryRequestUuid = "";
                    object.srcLoc = null;
                    object.dstLoc = null;
                    object.timeWindow = null;
                    object.vehicleState = null;
                    object.speedKmPerHour = 0;
                    object.isReqSrc = false;
                    object.isReqDst = false;
                }
                if (message.deliveryRequestUuid != null && message.hasOwnProperty("deliveryRequestUuid"))
                    object.deliveryRequestUuid = message.deliveryRequestUuid;
                if (message.srcLoc != null && message.hasOwnProperty("srcLoc"))
                    object.srcLoc = $root.delivery.LatLng.toObject(message.srcLoc, options);
                if (message.dstLoc != null && message.hasOwnProperty("dstLoc"))
                    object.dstLoc = $root.delivery.LatLng.toObject(message.dstLoc, options);
                if (message.timeWindow != null && message.hasOwnProperty("timeWindow"))
                    object.timeWindow = $root.delivery.TimeWindow.toObject(message.timeWindow, options);
                if (message.vehicleState != null && message.hasOwnProperty("vehicleState"))
                    object.vehicleState = $root.delivery.VehicleState.toObject(message.vehicleState, options);
                if (message.speedKmPerHour != null && message.hasOwnProperty("speedKmPerHour"))
                    object.speedKmPerHour = options.json && !isFinite(message.speedKmPerHour) ? String(message.speedKmPerHour) : message.speedKmPerHour;
                if (message.isReqSrc != null && message.hasOwnProperty("isReqSrc"))
                    object.isReqSrc = message.isReqSrc;
                if (message.isReqDst != null && message.hasOwnProperty("isReqDst"))
                    object.isReqDst = message.isReqDst;
                return object;
            };

            /**
             * Converts this Route to JSON.
             * @function toJSON
             * @memberof delivery.simulation.Route
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Route.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Route;
        })();

        return simulation;
    })();

    return delivery;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
