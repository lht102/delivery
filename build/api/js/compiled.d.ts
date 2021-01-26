import * as $protobuf from "protobufjs";
/** Namespace errmsg. */
export namespace errmsg {

    /** Properties of an Error. */
    interface IError {

        /** Error statusText */
        statusText?: (string|null);

        /** Error message */
        message?: (string|null);
    }

    /** Represents an Error. */
    class Error implements IError {

        /**
         * Constructs a new Error.
         * @param [properties] Properties to set
         */
        constructor(properties?: errmsg.IError);

        /** Error statusText. */
        public statusText: string;

        /** Error message. */
        public message: string;

        /**
         * Creates a new Error instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Error instance
         */
        public static create(properties?: errmsg.IError): errmsg.Error;

        /**
         * Encodes the specified Error message. Does not implicitly {@link errmsg.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errmsg.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link errmsg.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errmsg.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errmsg.Error;

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errmsg.Error;

        /**
         * Verifies an Error message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Error
         */
        public static fromObject(object: { [k: string]: any }): errmsg.Error;

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @param message Error
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errmsg.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Error to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace delivery. */
export namespace delivery {

    /** Properties of a LatLng. */
    interface ILatLng {

        /** LatLng lat */
        lat?: (number|null);

        /** LatLng lng */
        lng?: (number|null);
    }

    /** Represents a LatLng. */
    class LatLng implements ILatLng {

        /**
         * Constructs a new LatLng.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.ILatLng);

        /** LatLng lat. */
        public lat: number;

        /** LatLng lng. */
        public lng: number;

        /**
         * Creates a new LatLng instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LatLng instance
         */
        public static create(properties?: delivery.ILatLng): delivery.LatLng;

        /**
         * Encodes the specified LatLng message. Does not implicitly {@link delivery.LatLng.verify|verify} messages.
         * @param message LatLng message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LatLng message, length delimited. Does not implicitly {@link delivery.LatLng.verify|verify} messages.
         * @param message LatLng message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LatLng message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LatLng
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.LatLng;

        /**
         * Decodes a LatLng message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LatLng
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.LatLng;

        /**
         * Verifies a LatLng message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LatLng
         */
        public static fromObject(object: { [k: string]: any }): delivery.LatLng;

        /**
         * Creates a plain object from a LatLng message. Also converts values to other types if specified.
         * @param message LatLng
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.LatLng, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LatLng to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VehicleCapacity. */
    interface IVehicleCapacity {

        /** VehicleCapacity weight */
        weight?: (number|null);

        /** VehicleCapacity length */
        length?: (number|null);

        /** VehicleCapacity width */
        width?: (number|null);

        /** VehicleCapacity height */
        height?: (number|null);
    }

    /** Represents a VehicleCapacity. */
    class VehicleCapacity implements IVehicleCapacity {

        /**
         * Constructs a new VehicleCapacity.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.IVehicleCapacity);

        /** VehicleCapacity weight. */
        public weight: number;

        /** VehicleCapacity length. */
        public length: number;

        /** VehicleCapacity width. */
        public width: number;

        /** VehicleCapacity height. */
        public height: number;

        /**
         * Creates a new VehicleCapacity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VehicleCapacity instance
         */
        public static create(properties?: delivery.IVehicleCapacity): delivery.VehicleCapacity;

        /**
         * Encodes the specified VehicleCapacity message. Does not implicitly {@link delivery.VehicleCapacity.verify|verify} messages.
         * @param message VehicleCapacity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.IVehicleCapacity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VehicleCapacity message, length delimited. Does not implicitly {@link delivery.VehicleCapacity.verify|verify} messages.
         * @param message VehicleCapacity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.IVehicleCapacity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VehicleCapacity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VehicleCapacity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.VehicleCapacity;

        /**
         * Decodes a VehicleCapacity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VehicleCapacity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.VehicleCapacity;

        /**
         * Verifies a VehicleCapacity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VehicleCapacity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VehicleCapacity
         */
        public static fromObject(object: { [k: string]: any }): delivery.VehicleCapacity;

        /**
         * Creates a plain object from a VehicleCapacity message. Also converts values to other types if specified.
         * @param message VehicleCapacity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.VehicleCapacity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VehicleCapacity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GoodsMetadata. */
    interface IGoodsMetadata {

        /** GoodsMetadata uuid */
        uuid?: (string|null);

        /** GoodsMetadata name */
        name?: (string|null);

        /** GoodsMetadata weight */
        weight?: (number|null);

        /** GoodsMetadata length */
        length?: (number|null);

        /** GoodsMetadata width */
        width?: (number|null);

        /** GoodsMetadata height */
        height?: (number|null);
    }

    /** Represents a GoodsMetadata. */
    class GoodsMetadata implements IGoodsMetadata {

        /**
         * Constructs a new GoodsMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.IGoodsMetadata);

        /** GoodsMetadata uuid. */
        public uuid: string;

        /** GoodsMetadata name. */
        public name: string;

        /** GoodsMetadata weight. */
        public weight: number;

        /** GoodsMetadata length. */
        public length: number;

        /** GoodsMetadata width. */
        public width: number;

        /** GoodsMetadata height. */
        public height: number;

        /**
         * Creates a new GoodsMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GoodsMetadata instance
         */
        public static create(properties?: delivery.IGoodsMetadata): delivery.GoodsMetadata;

        /**
         * Encodes the specified GoodsMetadata message. Does not implicitly {@link delivery.GoodsMetadata.verify|verify} messages.
         * @param message GoodsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.IGoodsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GoodsMetadata message, length delimited. Does not implicitly {@link delivery.GoodsMetadata.verify|verify} messages.
         * @param message GoodsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.IGoodsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GoodsMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GoodsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.GoodsMetadata;

        /**
         * Decodes a GoodsMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GoodsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.GoodsMetadata;

        /**
         * Verifies a GoodsMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GoodsMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GoodsMetadata
         */
        public static fromObject(object: { [k: string]: any }): delivery.GoodsMetadata;

        /**
         * Creates a plain object from a GoodsMetadata message. Also converts values to other types if specified.
         * @param message GoodsMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.GoodsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GoodsMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TimeWindow. */
    interface ITimeWindow {

        /** TimeWindow startedAt */
        startedAt?: (google.protobuf.ITimestamp|null);

        /** TimeWindow endedAt */
        endedAt?: (google.protobuf.ITimestamp|null);
    }

    /** Represents a TimeWindow. */
    class TimeWindow implements ITimeWindow {

        /**
         * Constructs a new TimeWindow.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.ITimeWindow);

        /** TimeWindow startedAt. */
        public startedAt?: (google.protobuf.ITimestamp|null);

        /** TimeWindow endedAt. */
        public endedAt?: (google.protobuf.ITimestamp|null);

        /**
         * Creates a new TimeWindow instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TimeWindow instance
         */
        public static create(properties?: delivery.ITimeWindow): delivery.TimeWindow;

        /**
         * Encodes the specified TimeWindow message. Does not implicitly {@link delivery.TimeWindow.verify|verify} messages.
         * @param message TimeWindow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.ITimeWindow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TimeWindow message, length delimited. Does not implicitly {@link delivery.TimeWindow.verify|verify} messages.
         * @param message TimeWindow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.ITimeWindow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TimeWindow message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TimeWindow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.TimeWindow;

        /**
         * Decodes a TimeWindow message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TimeWindow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.TimeWindow;

        /**
         * Verifies a TimeWindow message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TimeWindow message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TimeWindow
         */
        public static fromObject(object: { [k: string]: any }): delivery.TimeWindow;

        /**
         * Creates a plain object from a TimeWindow message. Also converts values to other types if specified.
         * @param message TimeWindow
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.TimeWindow, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TimeWindow to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** DriverStatus enum. */
    enum DriverStatus {
        DRIVER_STATUS_UNDEFINED = 0,
        DRIVER_STATUS_OFFLINE = 1,
        DRIVER_STATUS_AVAILABLE = 2,
        DRIVER_STATUS_SERVING = 3
    }

    /** Namespace simulation. */
    namespace simulation {

        /** Properties of a SimulationRequest. */
        interface ISimulationRequest {

            /** SimulationRequest deliveryRequests */
            deliveryRequests?: (delivery.simulation.IDeliveryRequest[]|null);

            /** SimulationRequest driverRequests */
            driverRequests?: (delivery.simulation.IDriverRequest[]|null);

            /** SimulationRequest createdAt */
            createdAt?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a SimulationRequest. */
        class SimulationRequest implements ISimulationRequest {

            /**
             * Constructs a new SimulationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.ISimulationRequest);

            /** SimulationRequest deliveryRequests. */
            public deliveryRequests: delivery.simulation.IDeliveryRequest[];

            /** SimulationRequest driverRequests. */
            public driverRequests: delivery.simulation.IDriverRequest[];

            /** SimulationRequest createdAt. */
            public createdAt?: (google.protobuf.ITimestamp|null);

            /**
             * Creates a new SimulationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SimulationRequest instance
             */
            public static create(properties?: delivery.simulation.ISimulationRequest): delivery.simulation.SimulationRequest;

            /**
             * Encodes the specified SimulationRequest message. Does not implicitly {@link delivery.simulation.SimulationRequest.verify|verify} messages.
             * @param message SimulationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.ISimulationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SimulationRequest message, length delimited. Does not implicitly {@link delivery.simulation.SimulationRequest.verify|verify} messages.
             * @param message SimulationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.ISimulationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SimulationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SimulationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.SimulationRequest;

            /**
             * Decodes a SimulationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SimulationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.SimulationRequest;

            /**
             * Verifies a SimulationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SimulationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SimulationRequest
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.SimulationRequest;

            /**
             * Creates a plain object from a SimulationRequest message. Also converts values to other types if specified.
             * @param message SimulationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.SimulationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SimulationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DriverRequest. */
        interface IDriverRequest {

            /** DriverRequest uuid */
            uuid?: (string|null);

            /** DriverRequest name */
            name?: (string|null);

            /** DriverRequest vehicleCapacity */
            vehicleCapacity?: (delivery.IVehicleCapacity|null);

            /** DriverRequest loc */
            loc?: (delivery.ILatLng|null);

            /** DriverRequest createdAt */
            createdAt?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a DriverRequest. */
        class DriverRequest implements IDriverRequest {

            /**
             * Constructs a new DriverRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.IDriverRequest);

            /** DriverRequest uuid. */
            public uuid: string;

            /** DriverRequest name. */
            public name: string;

            /** DriverRequest vehicleCapacity. */
            public vehicleCapacity?: (delivery.IVehicleCapacity|null);

            /** DriverRequest loc. */
            public loc?: (delivery.ILatLng|null);

            /** DriverRequest createdAt. */
            public createdAt?: (google.protobuf.ITimestamp|null);

            /**
             * Creates a new DriverRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DriverRequest instance
             */
            public static create(properties?: delivery.simulation.IDriverRequest): delivery.simulation.DriverRequest;

            /**
             * Encodes the specified DriverRequest message. Does not implicitly {@link delivery.simulation.DriverRequest.verify|verify} messages.
             * @param message DriverRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.IDriverRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DriverRequest message, length delimited. Does not implicitly {@link delivery.simulation.DriverRequest.verify|verify} messages.
             * @param message DriverRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.IDriverRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DriverRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DriverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.DriverRequest;

            /**
             * Decodes a DriverRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DriverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.DriverRequest;

            /**
             * Verifies a DriverRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DriverRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DriverRequest
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.DriverRequest;

            /**
             * Creates a plain object from a DriverRequest message. Also converts values to other types if specified.
             * @param message DriverRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.DriverRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DriverRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeliveryRequest. */
        interface IDeliveryRequest {

            /** DeliveryRequest uuid */
            uuid?: (string|null);

            /** DeliveryRequest name */
            name?: (string|null);

            /** DeliveryRequest goodsMetadata */
            goodsMetadata?: (delivery.IGoodsMetadata|null);

            /** DeliveryRequest srcLoc */
            srcLoc?: (delivery.ILatLng|null);

            /** DeliveryRequest dstLoc */
            dstLoc?: (delivery.ILatLng|null);

            /** DeliveryRequest srcTimeWindow */
            srcTimeWindow?: (delivery.ITimeWindow|null);

            /** DeliveryRequest dstTimeWindow */
            dstTimeWindow?: (delivery.ITimeWindow|null);

            /** DeliveryRequest arrivedAt */
            arrivedAt?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a DeliveryRequest. */
        class DeliveryRequest implements IDeliveryRequest {

            /**
             * Constructs a new DeliveryRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.IDeliveryRequest);

            /** DeliveryRequest uuid. */
            public uuid: string;

            /** DeliveryRequest name. */
            public name: string;

            /** DeliveryRequest goodsMetadata. */
            public goodsMetadata?: (delivery.IGoodsMetadata|null);

            /** DeliveryRequest srcLoc. */
            public srcLoc?: (delivery.ILatLng|null);

            /** DeliveryRequest dstLoc. */
            public dstLoc?: (delivery.ILatLng|null);

            /** DeliveryRequest srcTimeWindow. */
            public srcTimeWindow?: (delivery.ITimeWindow|null);

            /** DeliveryRequest dstTimeWindow. */
            public dstTimeWindow?: (delivery.ITimeWindow|null);

            /** DeliveryRequest arrivedAt. */
            public arrivedAt?: (google.protobuf.ITimestamp|null);

            /**
             * Creates a new DeliveryRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeliveryRequest instance
             */
            public static create(properties?: delivery.simulation.IDeliveryRequest): delivery.simulation.DeliveryRequest;

            /**
             * Encodes the specified DeliveryRequest message. Does not implicitly {@link delivery.simulation.DeliveryRequest.verify|verify} messages.
             * @param message DeliveryRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.IDeliveryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeliveryRequest message, length delimited. Does not implicitly {@link delivery.simulation.DeliveryRequest.verify|verify} messages.
             * @param message DeliveryRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.IDeliveryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeliveryRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeliveryRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.DeliveryRequest;

            /**
             * Decodes a DeliveryRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeliveryRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.DeliveryRequest;

            /**
             * Verifies a DeliveryRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeliveryRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeliveryRequest
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.DeliveryRequest;

            /**
             * Creates a plain object from a DeliveryRequest message. Also converts values to other types if specified.
             * @param message DeliveryRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.DeliveryRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeliveryRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
