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

    /** Properties of a VehicleState. */
    interface IVehicleState {

        /** VehicleState vehicleCapacity */
        vehicleCapacity?: (delivery.IVehicleCapacity|null);

        /** VehicleState boxItems */
        boxItems?: (delivery.IBoxItem[]|null);
    }

    /** Represents a VehicleState. */
    class VehicleState implements IVehicleState {

        /**
         * Constructs a new VehicleState.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.IVehicleState);

        /** VehicleState vehicleCapacity. */
        public vehicleCapacity?: (delivery.IVehicleCapacity|null);

        /** VehicleState boxItems. */
        public boxItems: delivery.IBoxItem[];

        /**
         * Creates a new VehicleState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VehicleState instance
         */
        public static create(properties?: delivery.IVehicleState): delivery.VehicleState;

        /**
         * Encodes the specified VehicleState message. Does not implicitly {@link delivery.VehicleState.verify|verify} messages.
         * @param message VehicleState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.IVehicleState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VehicleState message, length delimited. Does not implicitly {@link delivery.VehicleState.verify|verify} messages.
         * @param message VehicleState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.IVehicleState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VehicleState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VehicleState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.VehicleState;

        /**
         * Decodes a VehicleState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VehicleState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.VehicleState;

        /**
         * Verifies a VehicleState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VehicleState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VehicleState
         */
        public static fromObject(object: { [k: string]: any }): delivery.VehicleState;

        /**
         * Creates a plain object from a VehicleState message. Also converts values to other types if specified.
         * @param message VehicleState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.VehicleState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VehicleState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RotationType enum. */
    enum RotationType {
        Rotation_Type_WLH = 0,
        Rotation_Type_LWH = 1,
        Rotation_Type_LHW = 2,
        Rotation_Type_HLW = 3,
        Rotation_Type_HWL = 4,
        Rotation_Type_WHL = 5
    }

    /** Properties of a BoxItem. */
    interface IBoxItem {

        /** BoxItem weight */
        weight?: (number|null);

        /** BoxItem width */
        width?: (number|null);

        /** BoxItem length */
        length?: (number|null);

        /** BoxItem height */
        height?: (number|null);

        /** BoxItem rotationType */
        rotationType?: (delivery.RotationType|null);

        /** BoxItem pos */
        pos?: (number[]|null);
    }

    /** Represents a BoxItem. */
    class BoxItem implements IBoxItem {

        /**
         * Constructs a new BoxItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: delivery.IBoxItem);

        /** BoxItem weight. */
        public weight: number;

        /** BoxItem width. */
        public width: number;

        /** BoxItem length. */
        public length: number;

        /** BoxItem height. */
        public height: number;

        /** BoxItem rotationType. */
        public rotationType: delivery.RotationType;

        /** BoxItem pos. */
        public pos: number[];

        /**
         * Creates a new BoxItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BoxItem instance
         */
        public static create(properties?: delivery.IBoxItem): delivery.BoxItem;

        /**
         * Encodes the specified BoxItem message. Does not implicitly {@link delivery.BoxItem.verify|verify} messages.
         * @param message BoxItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: delivery.IBoxItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BoxItem message, length delimited. Does not implicitly {@link delivery.BoxItem.verify|verify} messages.
         * @param message BoxItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: delivery.IBoxItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BoxItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BoxItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.BoxItem;

        /**
         * Decodes a BoxItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BoxItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.BoxItem;

        /**
         * Verifies a BoxItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BoxItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BoxItem
         */
        public static fromObject(object: { [k: string]: any }): delivery.BoxItem;

        /**
         * Creates a plain object from a BoxItem message. Also converts values to other types if specified.
         * @param message BoxItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: delivery.BoxItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BoxItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
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

            /** SimulationRequest supportRetracement */
            supportRetracement?: (boolean|null);
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

            /** SimulationRequest supportRetracement. */
            public supportRetracement: boolean;

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

        /** Properties of a SimulationResponse. */
        interface ISimulationResponse {

            /** SimulationResponse driverRoutingDetailsByUuid */
            driverRoutingDetailsByUuid?: ({ [k: string]: delivery.simulation.IDriverRoutingDetails }|null);

            /** SimulationResponse runningTime */
            runningTime?: (number|null);
        }

        /** Represents a SimulationResponse. */
        class SimulationResponse implements ISimulationResponse {

            /**
             * Constructs a new SimulationResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.ISimulationResponse);

            /** SimulationResponse driverRoutingDetailsByUuid. */
            public driverRoutingDetailsByUuid: { [k: string]: delivery.simulation.IDriverRoutingDetails };

            /** SimulationResponse runningTime. */
            public runningTime: number;

            /**
             * Creates a new SimulationResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SimulationResponse instance
             */
            public static create(properties?: delivery.simulation.ISimulationResponse): delivery.simulation.SimulationResponse;

            /**
             * Encodes the specified SimulationResponse message. Does not implicitly {@link delivery.simulation.SimulationResponse.verify|verify} messages.
             * @param message SimulationResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.ISimulationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SimulationResponse message, length delimited. Does not implicitly {@link delivery.simulation.SimulationResponse.verify|verify} messages.
             * @param message SimulationResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.ISimulationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.SimulationResponse;

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.SimulationResponse;

            /**
             * Verifies a SimulationResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SimulationResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SimulationResponse
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.SimulationResponse;

            /**
             * Creates a plain object from a SimulationResponse message. Also converts values to other types if specified.
             * @param message SimulationResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.SimulationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SimulationResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DriverRoutingDetails. */
        interface IDriverRoutingDetails {

            /** DriverRoutingDetails name */
            name?: (string|null);

            /** DriverRoutingDetails routes */
            routes?: (delivery.simulation.IRoute[]|null);
        }

        /** Represents a DriverRoutingDetails. */
        class DriverRoutingDetails implements IDriverRoutingDetails {

            /**
             * Constructs a new DriverRoutingDetails.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.IDriverRoutingDetails);

            /** DriverRoutingDetails name. */
            public name: string;

            /** DriverRoutingDetails routes. */
            public routes: delivery.simulation.IRoute[];

            /**
             * Creates a new DriverRoutingDetails instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DriverRoutingDetails instance
             */
            public static create(properties?: delivery.simulation.IDriverRoutingDetails): delivery.simulation.DriverRoutingDetails;

            /**
             * Encodes the specified DriverRoutingDetails message. Does not implicitly {@link delivery.simulation.DriverRoutingDetails.verify|verify} messages.
             * @param message DriverRoutingDetails message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.IDriverRoutingDetails, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DriverRoutingDetails message, length delimited. Does not implicitly {@link delivery.simulation.DriverRoutingDetails.verify|verify} messages.
             * @param message DriverRoutingDetails message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.IDriverRoutingDetails, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DriverRoutingDetails message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DriverRoutingDetails
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.DriverRoutingDetails;

            /**
             * Decodes a DriverRoutingDetails message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DriverRoutingDetails
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.DriverRoutingDetails;

            /**
             * Verifies a DriverRoutingDetails message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DriverRoutingDetails message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DriverRoutingDetails
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.DriverRoutingDetails;

            /**
             * Creates a plain object from a DriverRoutingDetails message. Also converts values to other types if specified.
             * @param message DriverRoutingDetails
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.DriverRoutingDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DriverRoutingDetails to JSON.
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

            /** DriverRequest maxSpeedKmPerHour */
            maxSpeedKmPerHour?: (number|null);

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

            /** DriverRequest maxSpeedKmPerHour. */
            public maxSpeedKmPerHour: number;

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

            /** DeliveryRequest createdAt */
            createdAt?: (google.protobuf.ITimestamp|null);
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

            /** DeliveryRequest createdAt. */
            public createdAt?: (google.protobuf.ITimestamp|null);

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

        /** Properties of a Route. */
        interface IRoute {

            /** Route deliveryRequestUuid */
            deliveryRequestUuid?: (string|null);

            /** Route srcLoc */
            srcLoc?: (delivery.ILatLng|null);

            /** Route dstLoc */
            dstLoc?: (delivery.ILatLng|null);

            /** Route timeWindow */
            timeWindow?: (delivery.ITimeWindow|null);

            /** Route vehicleState */
            vehicleState?: (delivery.IVehicleState|null);

            /** Route speedKmPerHour */
            speedKmPerHour?: (number|null);

            /** Route isReqSrc */
            isReqSrc?: (boolean|null);

            /** Route isReqDst */
            isReqDst?: (boolean|null);
        }

        /** Represents a Route. */
        class Route implements IRoute {

            /**
             * Constructs a new Route.
             * @param [properties] Properties to set
             */
            constructor(properties?: delivery.simulation.IRoute);

            /** Route deliveryRequestUuid. */
            public deliveryRequestUuid: string;

            /** Route srcLoc. */
            public srcLoc?: (delivery.ILatLng|null);

            /** Route dstLoc. */
            public dstLoc?: (delivery.ILatLng|null);

            /** Route timeWindow. */
            public timeWindow?: (delivery.ITimeWindow|null);

            /** Route vehicleState. */
            public vehicleState?: (delivery.IVehicleState|null);

            /** Route speedKmPerHour. */
            public speedKmPerHour: number;

            /** Route isReqSrc. */
            public isReqSrc: boolean;

            /** Route isReqDst. */
            public isReqDst: boolean;

            /**
             * Creates a new Route instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Route instance
             */
            public static create(properties?: delivery.simulation.IRoute): delivery.simulation.Route;

            /**
             * Encodes the specified Route message. Does not implicitly {@link delivery.simulation.Route.verify|verify} messages.
             * @param message Route message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: delivery.simulation.IRoute, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Route message, length delimited. Does not implicitly {@link delivery.simulation.Route.verify|verify} messages.
             * @param message Route message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: delivery.simulation.IRoute, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Route message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Route
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): delivery.simulation.Route;

            /**
             * Decodes a Route message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Route
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): delivery.simulation.Route;

            /**
             * Verifies a Route message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Route message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Route
             */
            public static fromObject(object: { [k: string]: any }): delivery.simulation.Route;

            /**
             * Creates a plain object from a Route message. Also converts values to other types if specified.
             * @param message Route
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: delivery.simulation.Route, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Route to JSON.
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
