cat("\014")

filepath ="~/Desktop/BIKES/stations.csv"
station = read_csv(filepath)

filepath2 ="~/Desktop/BIKES/tripdata.csv"

stationST = read_csv(filepath2) %>%
  dplyr::select(-c("starttime","stoptime","gender" ,"usertype", "birth year"  ))

colnames(stationST) <- c("TripDur","St_StatID","St_StatName","Latitude","Longitude","End_StatID",
                         "End_StatName","E_Latitude","E_longitude","bikeID")

Inbound <-
  stationST %>%
  group_by(St_StatID) %>%
  summarise(In_trips = n())%>%
  rename(station_id=`St_StatID`)

Outbound <-
  stationST %>%
  group_by(End_StatID) %>%
  summarise(Out_trips = n())%>%
  rename(station_id=`End_StatID`)

RoundTrips <-subset(stationST, stationST$St_StatID==stationST$End_StatID )%>%
  group_by(End_StatID) %>%
  summarise(Rount_trips = n())%>%
  rename(station_id=`End_StatID`)


stationJoin <-
  station%>%
  join(Inbound, type="left", by="station_id")%>%
  join(Outbound, type="left", by="station_id") %>%
  join(RoundTrips, type="left", by="station_id") %>%
  mutate(In_trips =replace_na(In_trips, 0),
         Out_trips=replace_na(Out_trips, 0),
         Rount_trips = replace_na(Rount_trips,0),
         Total_trips = In_trips+Out_trips-Rount_trips,
         Rount_tripsP = round(Rount_trips*100 /Total_trips,2))

stationJoin[is.na(stationJoin)] <-0
write_csv(stationJoin, "StationJ.csv")

stationJoin <-
  stationJoin %>%
  mutate(InTripP = round(In_trips*100 /Total_trips,2))




#####

path = "~/Desktop/BIKES/Neighborhood/geo_export_7c7076bf-8558-4f70-ac9f-2eac6b802438.shp"
path ="~/Desktop/BIKES/Neighborhood.geojson"

Neigh = geojson_sf(path)%>%
  select(-county_fips, -shape_leng,-shape_area)

stationJoin_geom<- 
  st_as_sf(stationJoin, coords =c("longitude","latitude"), crs= 4326) %>%
  st_as_sf() %>%
  st_transform("+proj=longlat +datum=WGS84 +no_defs")


st_crs(Neigh)==st_crs(stationJoin_geom)



Neigh_Stat1 <- st_intersection(Neigh, stationJoin_geom) %>%
  select(-station_id, -StationName,-AvailableDocks,-StatusValue, -StatusKey, -Rount_trips)

names(Neigh_Stat1)

colnames(Neigh_Stat1 ) <- c("ntacode","N_Name","B_name","B_code","TotalDocks","AvailableBikes",
                         "In_Trips","Out_Trips","Total_trips","geometery")
  

Neigh_Stat1 <- 
  Neigh_Stat1 %>%
  st_drop_geometry()%>%
  group_by(ntacode)%>%
  summarise(InTrip = sum(In_Trips), 
            OutTrip = sum(Out_Trips), 
            TotalTrip = sum(Total_trips),
            Docks = sum(TotalDocks))

Neigh_Joined <- Neigh %>%
  left_join(Neigh_Stat1) %>%
  mutate(InTrip =replace_na(InTrip, 0),
         OutTrip=replace_na(OutTrip, 0),
         TotalTrip =replace_na(TotalTrip, 0),
         Docks = replace_na(Docks, 0))


library(geojsonsf)

geo <- sf_geojson(Neigh_Joined,simplify = FALSE)
geojsonio::geojson_write(geo, file = "Neighborhood.geojson")


local <-stationST%>%
  select(-St_StatName,-End_StatID,-End_StatName,-E_longitude,-E_Latitude,-bikeID,-TripDur)%>%
  group_by(St_StatID) 

colnames(local)<- c("station_id","lat","long")

local <- left_join(local,RoundTrips,by="station_id")

local <- st_as_sf(local, coords = c("long","lat"), crs=4326) %>%
  st_transform("+proj=longlat +datum=WGS84 +no_defs")

st_crs(Neigh)==st_crs(local)

Neigh_local <- st_intersection(Neigh,local)

hist(Neigh_Joined$Docks)

hist(Neigh_Joined$TotalTrip, )
ggplot(data = Neigh_Joined)+geom_histogram(aes(OutTrip), bins = 50)

options(scipen=999)
