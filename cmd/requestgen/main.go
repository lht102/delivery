package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/lht102/delivery/pkg/distance"
	"github.com/uber/h3-go/v3"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	numOfRequests := 400
	numOfDrivers := 10
	latLngFilePath := "test/latlng_list.txt"

	latLngB, err := ioutil.ReadFile(latLngFilePath)
	if err != nil {
		log.Fatal(err)
	}
	latLngListStr := strings.Split(string(latLngB), " ")
	var latLngList []*delivery.LatLng
	var selectedLatLng *delivery.LatLng
	for i := 0; i < len(latLngListStr); i += 2 {
		lat, err := strconv.ParseFloat(latLngListStr[i], 64)
		if err != nil {
			log.Fatal(err)
		}
		lng, err := strconv.ParseFloat(latLngListStr[i+1], 64)
		if err != nil {
			log.Fatal(err)
		}
		latLngList = append(latLngList, &delivery.LatLng{
			Lat: lat,
			Lng: lng,
		})
	}
	createdAt := timestamppb.New(time.Date(2020, time.January, 1, 1, 0, 0, 0, time.UTC))
	createdAtSec := createdAt.GetSeconds()
	deliveryRequests := []*simulation.DeliveryRequest{}
	createdAtSecForDeliveryRequest := createdAtSec + 45
	for i := 0; i < numOfRequests; i++ {
		var (
			selectedLatLngSrc *delivery.LatLng
			selectedLatLngDst *delivery.LatLng
		)
		latLngList, selectedLatLngSrc = randomlyChooseLatLng(latLngList)
		latLngList, selectedLatLngDst = randomlyChooseLatLng(latLngList)

		dist := h3.PointDistKm(h3.GeoCoord{
			Latitude:  selectedLatLngSrc.Lat,
			Longitude: selectedLatLngSrc.Lng,
		}, h3.GeoCoord{
			Latitude:  selectedLatLngDst.Lat,
			Longitude: selectedLatLngDst.Lng,
		})
		d, err := distance.CalculateTravelingTime(dist, 27)
		if err != nil {
			log.Fatal(err)
		}
		travelingTimeInSec := d.Seconds()
		startedThreshold := rand.Intn(300) + 300
		tdThreshold := rand.Intn(900) + 600
		request := &simulation.DeliveryRequest{
			Uuid: uuid.NewString(),
			Name: fmt.Sprintf("Delivery Request %d", i),
			GoodsMetadata: &delivery.GoodsMetadata{
				Name:   fmt.Sprintf("Goods %d", i),
				Weight: 1,
				Length: 1,
				Width:  1,
				Height: 1,
			},
			SrcLoc: selectedLatLngSrc,
			DstLoc: selectedLatLngDst,
			SrcTimeWindow: &delivery.TimeWindow{
				StartedAt: &timestamppb.Timestamp{
					Seconds: createdAtSecForDeliveryRequest + int64(startedThreshold),
				},
				EndedAt: &timestamppb.Timestamp{
					Seconds: createdAtSecForDeliveryRequest + int64(startedThreshold) + int64(tdThreshold),
				},
			},
			DstTimeWindow: &delivery.TimeWindow{
				StartedAt: &timestamppb.Timestamp{
					Seconds: createdAtSecForDeliveryRequest + int64(startedThreshold) + int64(travelingTimeInSec),
				},
				EndedAt: &timestamppb.Timestamp{
					Seconds: createdAtSecForDeliveryRequest + int64(startedThreshold) + int64(tdThreshold) + int64(travelingTimeInSec),
				},
			},
			CreatedAt: &timestamppb.Timestamp{
				Seconds: createdAtSecForDeliveryRequest,
			},
		}

		createdAtSecForDeliveryRequest += int64(rand.Intn(120)) + 120
		deliveryRequests = append(deliveryRequests, request)
	}
	driverRequests := []*simulation.DriverRequest{}
	for i := 0; i < numOfDrivers; i++ {
		latLngList, selectedLatLng = randomlyChooseLatLng(latLngList)
		driverRequest := &simulation.DriverRequest{
			Uuid: uuid.NewString(),
			Name: fmt.Sprintf("Driver %d", i),
			VehicleCapacity: &delivery.VehicleCapacity{
				Weight: 30,
				Length: 30,
				Width:  30,
				Height: 30,
			},
			Loc:               selectedLatLng,
			MaxSpeedKmPerHour: 30,
			CreatedAt: &timestamppb.Timestamp{
				Seconds: createdAtSec + 30,
			},
		}
		driverRequests = append(driverRequests, driverRequest)
	}

	b, err := protojson.Marshal(&simulation.SimulationRequest{
		DeliveryRequests:                deliveryRequests,
		DriverRequests:                  driverRequests,
		CreatedAt:                       createdAt,
		SupportRetracement:              false,
		UseAlternativeForDriverMatching: false,
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(b))
}

func randomlyChooseLatLng(s []*delivery.LatLng) ([]*delivery.LatLng, *delivery.LatLng) {
	index := rand.Intn(len(s))
	ele := s[index]
	newS := removeLatLng(s, index)
	return newS, ele
}

func removeLatLng(s []*delivery.LatLng, i int) []*delivery.LatLng {
	s[len(s)-1], s[i] = s[i], s[len(s)-1]
	return s[:len(s)-1]
}
