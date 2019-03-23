

var slide1text = "CitiBike is a privately owned Bikeshare system serving the city of New York. First proposed in 2008, CitiBike has expanded to 706 docks and around 12,000 bikes.\
Citi Bike riders took an average of 38,491 rides per day in 2016, and the system reached a total of 50 million rides in October 2017.<br><br><br>\
This map shows the location and general stats of each bikestation";

var slide2text = "This map shows the In and out bound trips logged into the station. Here the inbound trips mean, where the where the trip began and \
outbound means where all the trips ended. It can be interpreted that most trips end in lower manhatten vs trips start at or near the central park.\
<br><br> Pershing Sq, West & Chambers St were found to me amonst having maximum inbound trips, while 34th St station was found to be having maximum \
outbound trips. Also, as many bikesharing system studies have proven, it can be assumed, that maximum CitiBike trips are made by tourists and therefore they are more concentrated in manhatten.";

var slide3text = "Over the past, most of the round trips: starting and ending at the same station, has occured Queens and in Brooklyn. One reason behind such a spatial \
distibution can be the network connectivity. These boros are mostly residential and had less expanded network of bikes and Point of intrets. \  ";

var slide4text = `
  <p> "This map shows the aggregated travel behavior at Neighborhood scale. \
  <br><br> You can choose any boro's name from the drop down menu to zoom in at that level and play around with stat pop-ups." <br><br><br> </p>
    <select class="dropDown" id="toPlot">
              <option value="" class="auto" disabled selected>visualize..</option>
              <option value="Total Trips">Total Trips</option>
              <option value="Docks">Docks</option>
              <option value="Inbound">Inbound Trips</option>
              <option value="Outbound">Outbound Trips</option>
    </select>
    <button id="mapbutton">Map</button>
    <button id="mapbutton2">Clear</button>
  `;

var slide5text = `
<p> "text" </p>
<button>this button</button>
<input type="text"/>
`;
