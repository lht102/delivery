// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0-devel
// 	protoc        v3.14.0
// source: delivery/simulation/simulation.proto

package simulation

import (
	delivery "github.com/lht102/delivery/api/delivery"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type SimulationRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	DeliveryRequests []*DeliveryRequest     `protobuf:"bytes,1,rep,name=delivery_requests,json=deliveryRequests,proto3" json:"delivery_requests,omitempty"`
	DriverRequests   []*DriverRequest       `protobuf:"bytes,2,rep,name=driver_requests,json=driverRequests,proto3" json:"driver_requests,omitempty"`
	CreatedAt        *timestamppb.Timestamp `protobuf:"bytes,3,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
}

func (x *SimulationRequest) Reset() {
	*x = SimulationRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_delivery_simulation_simulation_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SimulationRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SimulationRequest) ProtoMessage() {}

func (x *SimulationRequest) ProtoReflect() protoreflect.Message {
	mi := &file_delivery_simulation_simulation_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SimulationRequest.ProtoReflect.Descriptor instead.
func (*SimulationRequest) Descriptor() ([]byte, []int) {
	return file_delivery_simulation_simulation_proto_rawDescGZIP(), []int{0}
}

func (x *SimulationRequest) GetDeliveryRequests() []*DeliveryRequest {
	if x != nil {
		return x.DeliveryRequests
	}
	return nil
}

func (x *SimulationRequest) GetDriverRequests() []*DriverRequest {
	if x != nil {
		return x.DriverRequests
	}
	return nil
}

func (x *SimulationRequest) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

type DriverRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name            string                    `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	VehicleCapacity *delivery.VehicleCapacity `protobuf:"bytes,2,opt,name=vehicle_capacity,json=vehicleCapacity,proto3" json:"vehicle_capacity,omitempty"`
	Loc             *delivery.LatLng          `protobuf:"bytes,3,opt,name=loc,proto3" json:"loc,omitempty"`
}

func (x *DriverRequest) Reset() {
	*x = DriverRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_delivery_simulation_simulation_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DriverRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DriverRequest) ProtoMessage() {}

func (x *DriverRequest) ProtoReflect() protoreflect.Message {
	mi := &file_delivery_simulation_simulation_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DriverRequest.ProtoReflect.Descriptor instead.
func (*DriverRequest) Descriptor() ([]byte, []int) {
	return file_delivery_simulation_simulation_proto_rawDescGZIP(), []int{1}
}

func (x *DriverRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *DriverRequest) GetVehicleCapacity() *delivery.VehicleCapacity {
	if x != nil {
		return x.VehicleCapacity
	}
	return nil
}

func (x *DriverRequest) GetLoc() *delivery.LatLng {
	if x != nil {
		return x.Loc
	}
	return nil
}

type DeliveryRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name          string                  `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	GoodsMetadata *delivery.GoodsMetadata `protobuf:"bytes,2,opt,name=goods_metadata,json=goodsMetadata,proto3" json:"goods_metadata,omitempty"`
	SrcLoc        *delivery.LatLng        `protobuf:"bytes,3,opt,name=src_loc,json=srcLoc,proto3" json:"src_loc,omitempty"`
	DstLoc        *delivery.LatLng        `protobuf:"bytes,4,opt,name=dst_loc,json=dstLoc,proto3" json:"dst_loc,omitempty"`
	SrcTimeWindow *delivery.TimeWindow    `protobuf:"bytes,5,opt,name=src_time_window,json=srcTimeWindow,proto3" json:"src_time_window,omitempty"`
	DstTimeWindow *delivery.TimeWindow    `protobuf:"bytes,6,opt,name=dst_time_window,json=dstTimeWindow,proto3" json:"dst_time_window,omitempty"`
	ArrivedAt     *timestamppb.Timestamp  `protobuf:"bytes,7,opt,name=arrived_at,json=arrivedAt,proto3" json:"arrived_at,omitempty"`
}

func (x *DeliveryRequest) Reset() {
	*x = DeliveryRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_delivery_simulation_simulation_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeliveryRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeliveryRequest) ProtoMessage() {}

func (x *DeliveryRequest) ProtoReflect() protoreflect.Message {
	mi := &file_delivery_simulation_simulation_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeliveryRequest.ProtoReflect.Descriptor instead.
func (*DeliveryRequest) Descriptor() ([]byte, []int) {
	return file_delivery_simulation_simulation_proto_rawDescGZIP(), []int{2}
}

func (x *DeliveryRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *DeliveryRequest) GetGoodsMetadata() *delivery.GoodsMetadata {
	if x != nil {
		return x.GoodsMetadata
	}
	return nil
}

func (x *DeliveryRequest) GetSrcLoc() *delivery.LatLng {
	if x != nil {
		return x.SrcLoc
	}
	return nil
}

func (x *DeliveryRequest) GetDstLoc() *delivery.LatLng {
	if x != nil {
		return x.DstLoc
	}
	return nil
}

func (x *DeliveryRequest) GetSrcTimeWindow() *delivery.TimeWindow {
	if x != nil {
		return x.SrcTimeWindow
	}
	return nil
}

func (x *DeliveryRequest) GetDstTimeWindow() *delivery.TimeWindow {
	if x != nil {
		return x.DstTimeWindow
	}
	return nil
}

func (x *DeliveryRequest) GetArrivedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.ArrivedAt
	}
	return nil
}

var File_delivery_simulation_simulation_proto protoreflect.FileDescriptor

var file_delivery_simulation_simulation_proto_rawDesc = []byte{
	0x0a, 0x24, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2f, 0x73, 0x69, 0x6d, 0x75, 0x6c,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x73, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x13, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79,
	0x2e, 0x73, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x1a, 0x15, 0x64, 0x65, 0x6c,
	0x69, 0x76, 0x65, 0x72, 0x79, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0xee, 0x01, 0x0a, 0x11, 0x53, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x51, 0x0a, 0x11, 0x64, 0x65, 0x6c,
	0x69, 0x76, 0x65, 0x72, 0x79, 0x5f, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x18, 0x01,
	0x20, 0x03, 0x28, 0x0b, 0x32, 0x24, 0x2e, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e,
	0x73, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x44, 0x65, 0x6c, 0x69, 0x76,
	0x65, 0x72, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x10, 0x64, 0x65, 0x6c, 0x69,
	0x76, 0x65, 0x72, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x12, 0x4b, 0x0a, 0x0f,
	0x64, 0x72, 0x69, 0x76, 0x65, 0x72, 0x5f, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x22, 0x2e, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79,
	0x2e, 0x73, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x44, 0x72, 0x69, 0x76,
	0x65, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x0e, 0x64, 0x72, 0x69, 0x76, 0x65,
	0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x12, 0x39, 0x0a, 0x0a, 0x63, 0x72, 0x65,
	0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x63, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x64, 0x41, 0x74, 0x22, 0x8d, 0x01, 0x0a, 0x0d, 0x44, 0x72, 0x69, 0x76, 0x65, 0x72, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x44, 0x0a, 0x10, 0x76, 0x65,
	0x68, 0x69, 0x63, 0x6c, 0x65, 0x5f, 0x63, 0x61, 0x70, 0x61, 0x63, 0x69, 0x74, 0x79, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e,
	0x56, 0x65, 0x68, 0x69, 0x63, 0x6c, 0x65, 0x43, 0x61, 0x70, 0x61, 0x63, 0x69, 0x74, 0x79, 0x52,
	0x0f, 0x76, 0x65, 0x68, 0x69, 0x63, 0x6c, 0x65, 0x43, 0x61, 0x70, 0x61, 0x63, 0x69, 0x74, 0x79,
	0x12, 0x22, 0x0a, 0x03, 0x6c, 0x6f, 0x63, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e,
	0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e, 0x4c, 0x61, 0x74, 0x4c, 0x6e, 0x67, 0x52,
	0x03, 0x6c, 0x6f, 0x63, 0x22, 0xf2, 0x02, 0x0a, 0x0f, 0x44, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72,
	0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x3e, 0x0a, 0x0e,
	0x67, 0x6f, 0x6f, 0x64, 0x73, 0x5f, 0x6d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e,
	0x47, 0x6f, 0x6f, 0x64, 0x73, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x52, 0x0d, 0x67,
	0x6f, 0x6f, 0x64, 0x73, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x12, 0x29, 0x0a, 0x07,
	0x73, 0x72, 0x63, 0x5f, 0x6c, 0x6f, 0x63, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e,
	0x64, 0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e, 0x4c, 0x61, 0x74, 0x4c, 0x6e, 0x67, 0x52,
	0x06, 0x73, 0x72, 0x63, 0x4c, 0x6f, 0x63, 0x12, 0x29, 0x0a, 0x07, 0x64, 0x73, 0x74, 0x5f, 0x6c,
	0x6f, 0x63, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x64, 0x65, 0x6c, 0x69, 0x76,
	0x65, 0x72, 0x79, 0x2e, 0x4c, 0x61, 0x74, 0x4c, 0x6e, 0x67, 0x52, 0x06, 0x64, 0x73, 0x74, 0x4c,
	0x6f, 0x63, 0x12, 0x3c, 0x0a, 0x0f, 0x73, 0x72, 0x63, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x5f, 0x77,
	0x69, 0x6e, 0x64, 0x6f, 0x77, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x64, 0x65,
	0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x57, 0x69, 0x6e, 0x64, 0x6f,
	0x77, 0x52, 0x0d, 0x73, 0x72, 0x63, 0x54, 0x69, 0x6d, 0x65, 0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77,
	0x12, 0x3c, 0x0a, 0x0f, 0x64, 0x73, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x5f, 0x77, 0x69, 0x6e,
	0x64, 0x6f, 0x77, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x64, 0x65, 0x6c, 0x69,
	0x76, 0x65, 0x72, 0x79, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x52,
	0x0d, 0x64, 0x73, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x12, 0x39,
	0x0a, 0x0a, 0x61, 0x72, 0x72, 0x69, 0x76, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x07, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09,
	0x61, 0x72, 0x72, 0x69, 0x76, 0x65, 0x64, 0x41, 0x74, 0x42, 0x34, 0x5a, 0x32, 0x67, 0x69, 0x74,
	0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6c, 0x68, 0x74, 0x31, 0x30, 0x32, 0x2f, 0x64,
	0x65, 0x6c, 0x69, 0x76, 0x65, 0x72, 0x79, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x64, 0x65, 0x6c, 0x69,
	0x76, 0x65, 0x72, 0x79, 0x2f, 0x73, 0x69, 0x6d, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_delivery_simulation_simulation_proto_rawDescOnce sync.Once
	file_delivery_simulation_simulation_proto_rawDescData = file_delivery_simulation_simulation_proto_rawDesc
)

func file_delivery_simulation_simulation_proto_rawDescGZIP() []byte {
	file_delivery_simulation_simulation_proto_rawDescOnce.Do(func() {
		file_delivery_simulation_simulation_proto_rawDescData = protoimpl.X.CompressGZIP(file_delivery_simulation_simulation_proto_rawDescData)
	})
	return file_delivery_simulation_simulation_proto_rawDescData
}

var file_delivery_simulation_simulation_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_delivery_simulation_simulation_proto_goTypes = []interface{}{
	(*SimulationRequest)(nil),        // 0: delivery.simulation.SimulationRequest
	(*DriverRequest)(nil),            // 1: delivery.simulation.DriverRequest
	(*DeliveryRequest)(nil),          // 2: delivery.simulation.DeliveryRequest
	(*timestamppb.Timestamp)(nil),    // 3: google.protobuf.Timestamp
	(*delivery.VehicleCapacity)(nil), // 4: delivery.VehicleCapacity
	(*delivery.LatLng)(nil),          // 5: delivery.LatLng
	(*delivery.GoodsMetadata)(nil),   // 6: delivery.GoodsMetadata
	(*delivery.TimeWindow)(nil),      // 7: delivery.TimeWindow
}
var file_delivery_simulation_simulation_proto_depIdxs = []int32{
	2,  // 0: delivery.simulation.SimulationRequest.delivery_requests:type_name -> delivery.simulation.DeliveryRequest
	1,  // 1: delivery.simulation.SimulationRequest.driver_requests:type_name -> delivery.simulation.DriverRequest
	3,  // 2: delivery.simulation.SimulationRequest.created_at:type_name -> google.protobuf.Timestamp
	4,  // 3: delivery.simulation.DriverRequest.vehicle_capacity:type_name -> delivery.VehicleCapacity
	5,  // 4: delivery.simulation.DriverRequest.loc:type_name -> delivery.LatLng
	6,  // 5: delivery.simulation.DeliveryRequest.goods_metadata:type_name -> delivery.GoodsMetadata
	5,  // 6: delivery.simulation.DeliveryRequest.src_loc:type_name -> delivery.LatLng
	5,  // 7: delivery.simulation.DeliveryRequest.dst_loc:type_name -> delivery.LatLng
	7,  // 8: delivery.simulation.DeliveryRequest.src_time_window:type_name -> delivery.TimeWindow
	7,  // 9: delivery.simulation.DeliveryRequest.dst_time_window:type_name -> delivery.TimeWindow
	3,  // 10: delivery.simulation.DeliveryRequest.arrived_at:type_name -> google.protobuf.Timestamp
	11, // [11:11] is the sub-list for method output_type
	11, // [11:11] is the sub-list for method input_type
	11, // [11:11] is the sub-list for extension type_name
	11, // [11:11] is the sub-list for extension extendee
	0,  // [0:11] is the sub-list for field type_name
}

func init() { file_delivery_simulation_simulation_proto_init() }
func file_delivery_simulation_simulation_proto_init() {
	if File_delivery_simulation_simulation_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_delivery_simulation_simulation_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SimulationRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_delivery_simulation_simulation_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DriverRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_delivery_simulation_simulation_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeliveryRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_delivery_simulation_simulation_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_delivery_simulation_simulation_proto_goTypes,
		DependencyIndexes: file_delivery_simulation_simulation_proto_depIdxs,
		MessageInfos:      file_delivery_simulation_simulation_proto_msgTypes,
	}.Build()
	File_delivery_simulation_simulation_proto = out.File
	file_delivery_simulation_simulation_proto_rawDesc = nil
	file_delivery_simulation_simulation_proto_goTypes = nil
	file_delivery_simulation_simulation_proto_depIdxs = nil
}
