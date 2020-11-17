/*
 * Copyright 2016-2018 Uber Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** @file algos.h
 * @brief   Hexagon grid algorithms
 */

#ifndef ALGOS_H
#define ALGOS_H

#include "h3_bbox.h"
#include "h3_coordijk.h"
#include "h3_h3api.h"
#include "h3_linkedGeo.h"
#include "h3_vertexGraph.h"

// neighbor along the ijk coordinate system of the current face, rotated
H3Index h3NeighborRotations(H3Index origin, Direction dir, int* rotations);

// k-ring implementation
void _kRingInternal(H3Index origin, int k, H3Index* out, int* distances,
                    int maxIdx, int curK);

// Create a vertex graph from a set of hexagons
void h3SetToVertexGraph(const H3Index* h3Set, const int numHexes,
                        VertexGraph* out);

// Create a LinkedGeoPolygon from a vertex graph
void _vertexGraphToLinkedGeo(VertexGraph* graph, LinkedGeoPolygon* out);

#endif
